import db from "../models";

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

      resolve({ err: 0, msg: "Tạo order thành công!", data: order });
    } catch (error) {
      reject(error);
    }
  });
//create order detail
// export const createOrderDetailService = ({ orderID, foodID, quantity }) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const order = await db.Order.findOne({
//         where: { id: orderID, status: "pending" },
//       });
//       if (!order) {
//         return resolve({
//           err: 1,
//           msg: "Order không tồn tại!",
//         });
//       }
//       // Lấy giá của món ăn
//       const food = await db.Food.findOne({ where: { id: foodID } });
//       if (!food) {
//         return resolve({ err: 1, msg: "Món ăn không tồn tại!" });
//       }
//       const totalPrice = food.price * quantity;

//       const [orderDetail, created] = await db.OrderDetail.findOrCreate({
//         where: { orderID, foodID },
//         defaults: { orderID, foodID, quantity, totalPrice, status: "pending" },
//       });
//       //tính tổng cho order detail
//       if (!created) {
//         orderDetail.quantity += quantity;
//         orderDetail.totalPrice = food.price * orderDetail.quantity;
//         await orderDetail.save();
//       }
//       //tính tổng cho order
//       const totalOrderPrice = await db.OrderDetail.sum("totalPrice", {
//         where: { orderID },
//       });
//       order.total = totalOrderPrice;
//       await order.save();

//       resolve({
//         err: 0,
//         msg: created
//           ? "Thêm món thành công!"
//           : "Cập nhật số lượng món thành công!",
//         data: orderDetail,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
//get order
export const getOrderService = (customerID) =>
  new Promise(async (resolve, reject) => {
    try {
      const order = await db.Order.findOne({
        where: { customerID, status: "pending" },
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
          },
          {
            model: db.OrderDetail,
            as: "orderDetails",
            attributes: ["quantity", "totalPrice", "status"],
            include: [
              {
                model: db.Food,
                as: "food",
                attributes: ["id","name", "price", "foodImg"],
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
//update order
export const updateOrderService = ({ customerID }) =>
  new Promise(async (resolve, reject) => {
    try {
      const order = await db.Order.findOne({
        where: { customerID, status: "pending" },
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

        const [orderDetail, created] = await db.OrderDetail.findOrCreate({
          where: { orderID: order.id, foodID },
          defaults: {
            orderID: order.id,
            foodID,
            quantity,
            totalPrice,
            status: "pending",
          },
        });

        if (!created) {
          // Chỉ cộng thêm số lượng mới vào tổng đơn hàng
          additionalTotalPrice += quantity * food.price;
          orderDetail.quantity += quantity;
          orderDetail.totalPrice = orderDetail.quantity * food.price;
          await orderDetail.save();
        } else {
          // Nếu là món mới hoàn toàn, cộng toàn bộ giá trị của nó vào đơn hàng
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

//update status
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
