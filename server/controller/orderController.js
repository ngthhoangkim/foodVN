import * as orderService from "../services/order";

//create order
export const createOrderController = async (req, res) => {
  const { customerID, tableID, voucherID, status, total } = req.body;
  try {
    if (!customerID || !tableID || !total) {
      return res
        .status(400)
        .json({ err: 1, msg: "Vui lòng nhập đầy đủ thông tin!" });
    }
    const response = await orderService.createOrderService(req.body);
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at create order:"]: error.message });
  }
};
//create order detail
export const createOrderDetailController = async (req, res) => {
  const { orderID, foodID, quantity } = req.body;
  try {
      if (!orderID || !foodID || !quantity) {
      return res
          .status(400)
          .json({ err: 1, msg: "Vui lòng nhập đầy đủ thông tin!" });
      }
      const response = await orderService.createOrderDetailService(req.body);
      return res.status(201).json(response);
  } catch (error) {
      res.status(500).json({ ["Fail at create order detail:"]: error.message });
  }
}
//get order
export const getOrderController = async (req, res) => {
  const orderID = req.params.id;
  try {
    const response = await orderService.getOrderService(orderID);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at get order:"]: error.message });
  }
};
