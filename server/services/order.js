import db from "../models";
const { Op } = require("sequelize");

//create order
export const createOrderService = ({ customerID, tableNumber }) =>
  new Promise(async (resolve, reject) => {
    try {
      // Tìm bàn theo số bàn
      const table = await db.Table.findOne({ where: { tableNumber } });
      if (!table) {
        return resolve({ err: 1, msg: "Bàn không tồn tại!" });
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
      const order = await db.Order.findOne({
        where: { customerID },
        attributes: ["id", "voucherID", "status", "total"],
        include: [
          {
            model: db.Customer,
            as: "customer",
            attributes: ["customerName"],
          },
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
            existingOrderDetail.totalPrice = existingOrderDetail.quantity * food.price;
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

      resolve({ err: 0, msg: "Cập nhật đơn hàng thành công!", data: order });
    } catch (error) {
      reject(error);
    }
  });


//update food status
export const updateFoodStatusService = ({ orderDetailID, status }) =>
  new Promise(async (resolve, reject) => {
    try {
      const orderDetail = await db.OrderDetail.findByPk(orderDetailID);
      if (!orderDetail)
        return resolve({ err: 1, msg: "Món ăn không tồn tại!" });

      orderDetail.status = status;
      await orderDetail.save();

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
export const updateOrderStatusService = ({ orderID, status }) =>
  new Promise(async (resolve, reject) => {
    try {
      const order = await db.Order.findByPk(orderID);
      if (!order) return resolve({ err: 1, msg: "Đơn hàng không tồn tại!" });

      order.status = status;
      await order.save();

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
            attributes: ["id","customerName"], 
          },
          {
            model: db.Table,
            as: "table",
            attributes: ["id","tableNumber"], 
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
            attributes: ["id","quantity", "totalPrice", "status"],
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
