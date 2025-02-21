import db from "../models";

//create order
export const createOrderService = ({customerID,tableID,voucherID}) =>
  new Promise(async (resolve, reject) => {
    try {
      const [order, created] = await db.Order.findOrCreate({
        where: { customerID, tableID, status: "pending" },
        defaults: {
          customerID: customerID,
          tableID: tableID,
          voucherID: voucherID,
          status: "pending",
          total: 0,
        },
      });
      if(created){
        resolve({
          err: 0,
          msg: "Tạo order thành công!",
          data: order,
        });
      }else{
        resolve({
          err: 1,
          msg: "Order đã tồn tại!",
        });
      }
    } catch (error) {
      reject(error);
    }
  }); 

//create order detail
export const createOrderDetailService = ({ orderID, foodID, quantity }) =>
  new Promise(async (resolve, reject) => {
    try {
      const order = await db.Order.findOne({ where: { id: orderID } });
      if (!order) {
        return resolve({
          err: 1,
          msg: "Order không tồn tại!",
        });
      }
      // Lấy giá của món ăn
      const food = await db.Food.findOne({ where: { id: foodID } });
      if (!food) {
        return resolve({ err: 1, msg: "Món ăn không tồn tại!" });
      }
      const totalPrice = food.price * quantity;

      const [orderDetail, created] = await db.OrderDetail.findOrCreate({
        where: { orderID, foodID },
        defaults: { orderID, foodID, quantity, totalPrice },
      });
      //tính tổng cho order detaildetail
      if (!created) {
        orderDetail.quantity += quantity;
        orderDetail.totalPrice = food.price * orderDetail.quantity;
        await orderDetail.save();
      }
      //tính tổng cho order
      const totalOrderPrice = await db.OrderDetail.sum("totalPrice", {
        where: { orderID },
      })
      order.total = totalOrderPrice;
      await order.save();
      
      resolve({
        err: 0,
        msg: created
          ? "Thêm món thành công!"
          : "Cập nhật số lượng món thành công!",
        data: orderDetail,
      });
    } catch (error) {
      reject(error);
    }
  });

//get order
export const getOrderService = (orderID) =>
  new Promise(async (resolve, reject) => {
    try {
      const order =  await db.Order.findOne({ 
        where: { id: orderID },
        attributes:["voucherID","status","total"],
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
            attributes: ["quantity","totalPrice"], 
            include: [
              {
                model: db.Food,
                as : "food",
                attributes: ["name","price"],
              },
            ],
          },
        ],
      });
      if (!order) {
        return resolve({
          err: 1,
          msg: "Order không tồn tại!",
        });
      }else{
        resolve({
          err: 0,
          msg: "Lấy order thành công!",
          data: order,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
