import db from "../models";
import { sendNotification } from "./notification";
const { Op } = require("sequelize");
const admin = require("../config/firebaseConfig");

//create order
export const createOrderService = ({ customerID, tableNumber }) =>
  new Promise(async (resolve, reject) => {
    try {
      // Tìm bàn theo số bàn
      const table = await db.Table.findOne({ where: { tableNumber } });
      if (!table) {
        return resolve({ err: 1, msg: "Bàn không tồn tại!" });
      }
      //Bàn đầy thì báo bàn khác
      if (table.status !== "Trống") {
        return resolve({ err: 1, msg: "Bàn đã có khách, mời bạn chọn bàn!" });
      }
      // Kiểm tra khách đã có order chưa
      const existingOrder = await db.Order.findOne({
        where: { customerID, status: "pending" },
      });

      if (existingOrder) {
        return resolve({ err: 1, msg: "Khách hàng đang được phục vụ!" });
      }

      // Tạo order mới nhưng chưa có món ăn
      const order = await db.Order.create({
        customerID,
        tableID: table.id,
        status: "pending",
        total: 0,
      });

      await db.Table.update({ status: "Đầy" }, { where: { id: table.id } });

      resolve({ err: 0, msg: "Tạo order thành công!", data: order });
    } catch (error) {
      reject(error);
    }
  });
//get order
export const getOrderService = (customerID) =>
  new Promise(async (resolve, reject) => {
    try {
      const order = await db.Order.findAll({
        where: { customerID },
        attributes: ["id", "voucherID", "status", "total","updatedAt"],
        include: [
          {
            model: db.Customer,
            as: "customer",
            attributes: ["customerName"],
          },
          {
            model: db.Table,
            as: "table",
            attributes: ["id", "tableNumber"],
            include: [
              {
                model: db.Hall,
                as: "hall",
                attributes: ["name"],
              },
            ],
          },
          {
            model: db.OrderDetail,
            as: "orderDetails",
            attributes: ["quantity", "totalPrice", "status"],
            include: [
              {
                model: db.Food,
                as: "food",
                attributes: ["id", "name", "price", "foodImg"],
              },
            ],
          },
        ],
      });

      if (!order) {
        return resolve({
          err: 1,
          msg: "Không tìm thấy đơn hàng đang chờ!",
        });
      }

      resolve({
        err: 0,
        msg: "Lấy order thành công!",
        data: order,
      });
    } catch (error) {
      reject(error);
    }
  });
//update order dùng để thêm món từ giỏ hàng vào
export const updateOrderService = ({ customerID }) =>
  new Promise(async (resolve, reject) => {
    try {
      const order = await db.Order.findOne({
        where: {
          customerID,
          status: { [Op.ne]: "complete" }, // Nếu đơn đã hoàn tất thì không được gọi nữa
        },
        include: [
          {
            model: db.Table,
            as: "table",
            attributes: ["tableNumber"],
            include: [
              {
                model: db.Hall,
                as: "hall",
                attributes: ["name"],
              },
            ],
          },
        ],
      });

      if (!order) {
        return resolve({ err: 1, msg: "Không tìm thấy đơn hàng!" });
      }

      const cartItems = await db.Cart.findAll({ where: { customerID } });
      if (!cartItems.length) {
        return resolve({ err: 1, msg: "Giỏ hàng đang trống!" });
      }

      let additionalTotalPrice = 0;

      for (const item of cartItems) {
        const { foodID, quantity } = item;
        const food = await db.Food.findOne({ where: { id: foodID } });
        if (!food) continue;

        const totalPrice = food.price * quantity;

        // Tìm món ăn trong OrderDetail
        const existingOrderDetail = await db.OrderDetail.findOne({
          where: { orderID: order.id, foodID },
        });

        if (existingOrderDetail) {
          if (existingOrderDetail.status === "served") {
            // Nếu món đã hoàn thành, tạo một dòng mới với trạng thái "pending"
            await db.OrderDetail.create({
              orderID: order.id,
              foodID,
              quantity,
              totalPrice,
              status: "pending",
            });
            additionalTotalPrice += totalPrice;
          } else {
            // Nếu món chưa hoàn thành, chỉ tăng số lượng và tổng giá
            additionalTotalPrice += quantity * food.price;
            existingOrderDetail.quantity += quantity;
            existingOrderDetail.totalPrice =
              existingOrderDetail.quantity * food.price;
            await existingOrderDetail.save();
          }
        } else {
          // Nếu là món mới hoàn toàn, tạo mới
          await db.OrderDetail.create({
            orderID: order.id,
            foodID,
            quantity,
            totalPrice,
            status: "pending",
          });
          additionalTotalPrice += totalPrice;
        }
      }

      // Cập nhật tổng tiền đơn hàng
      const updatedTotal = parseFloat(order.total) + additionalTotalPrice;
      await order.update({ total: updatedTotal });

      // Xóa giỏ hàng
      await db.Cart.destroy({ where: { customerID } });

      //thông báo
      const tableNumber = order.table?.tableNumber || "Không rõ";
      const hallName = order.table?.hall?.name || "Không rõ";
      await sendNotification(
        "employee",
        "Khách vừa gọi món",
        `Bàn ${tableNumber} - ${hallName} vừa gọi món, vui lòng chuẩn bị.`
      );

      resolve({ err: 0, msg: "Cập nhật đơn hàng thành công!", data: order });
    } catch (error) {
      reject(error);
    }
  });
//update food status
export const updateFoodStatusService = ({ orderDetailID, status }) =>
  new Promise(async (resolve, reject) => {
    try {
      const orderDetail = await db.OrderDetail.findByPk(orderDetailID, {
        include: [
          {
            model: db.Order,
            as: "order",
            include: [
              {
                model: db.Table,
                as: "table",
                include: [{ model: db.Hall, as: "hall" }],
              },
            ],
          },
          {
            model: db.Food,
            as: "food",
            attributes: ["name"],
          },
        ],
      });

      if (!orderDetail) {
        return resolve({ err: 1, msg: "Món ăn không tồn tại!" });
      }

      // Cập nhật trạng thái món ăn
      orderDetail.status = status;
      await orderDetail.save();

      // Lấy thông tin bàn và sảnh từ Order
      const tableNumber = orderDetail.order?.table?.tableNumber || "N/A";
      const hallName = orderDetail.order?.table?.hall?.name || "N/A";
      const foodName = orderDetail.food?.name || "N/A";

      // Gửi thông báo khi món ăn hoàn thành
      switch (status) {
        case "complete":
          await sendNotification(
            "employee",
            "Cập nhật món!",
            `Món ${foodName} của bàn ${tableNumber} - ${hallName} đã chế biến xong`
          );
          break;

        case "served":
          await sendNotification(
            "chef",
            "Cập nhật món!",
            `Món ${foodName} của bàn ${tableNumber} - ${hallName} đã phục vụ`
          );
          break;
        default:
          break;
      }

      resolve({
        err: 0,
        msg: "Cập nhật trạng thái món ăn thành công!",
        data: orderDetail,
      });
    } catch (error) {
      reject(error);
    }
  });

// Update order status
export const updateOrderStatusService = ({ orderID, status, employeeID }) =>
  new Promise(async (resolve, reject) => {
    try {
      const order = await db.Order.findByPk(orderID, {
        include: [
          {
            model: db.Table,
            as: "table",
            attributes: ["tableNumber"],
            include: [
              {
                model: db.Hall,
                as: "hall",
                attributes: ["name"],
              },
            ],
          },
        ],
      });
      if (!order) return resolve({ err: 1, msg: "Đơn hàng không tồn tại!" });

      order.status = status;
      if (status === "paid" && employeeID) {
        order.employeeID = employeeID;
      }

      await order.save();

      //xử lý thông báo nhân viên gửi đơn cho bếp
      const tableNumber = order.table?.tableNumber || "N/A";
      const hallName = order.table?.hall?.name || "N/A";

      switch (status) {
        case "preparing":
          await sendNotification(
            "chef",
            "Nhân viên gửi đơn",
            `Bàn ${tableNumber} - ${hallName} vừa gọi món, vui lòng chuẩn bị.`
          );
          break;
        case "paying":
          await sendNotification(
            "employee",
            "Nhân viên gửi đơn",
            `Bàn ${tableNumber} - ${hallName} đang gọi thanh toán!`
          );
        default:
          break;
      }

      resolve({
        err: 0,
        msg: "Cập nhật trạng thái đơn hàng thành công!",
        data: order,
      });
    } catch (error) {
      reject(error);
    }
  });
//get all
export const getAllOrderService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Order.findAll({
        attributes: ["id", "voucherID", "status", "total", "createdAt"],
        include: [
          {
            model: db.Customer,
            as: "customer",
            attributes: ["id", "customerName"],
          },
          {
            model: db.Table,
            as: "table",
            attributes: ["id", "tableNumber"],
            include: [
              {
                model: db.Hall,
                as: "hall",
                attributes: ["name"],
              },
            ],
          },
          {
            model: db.OrderDetail,
            as: "orderDetails",
            attributes: ["id", "quantity", "totalPrice", "status"],
            include: [
              {
                model: db.Food,
                as: "food",
                attributes: ["id", "name", "price", "foodImg"],
              },
            ],
          },
        ],
      });

      resolve({
        err: 0,
        msg: "Lấy danh sách order thành công!",
        data: response,
        count: response.length,
      });
    } catch (error) {
      reject(error);
    }
  });
