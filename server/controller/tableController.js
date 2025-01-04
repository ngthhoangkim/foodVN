import * as tableService from "../services/table";

//create table
export const createTableController = async (req, res) => {
  const { tableNumber, maxQuantity, status } = req.body;
  try {
    if (!tableNumber || !maxQuantity || !status) {
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" });
    }
    const response = await tableService.createTableService(req.body);
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at create table:"]: error.message });
  }
};
//get all table
export const getAllTableController = async (req, res) => {
  try {
    const response = await tableService.getAllTableService();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at get all table:"]: error.message });
  }
};
//get one table
export const getOneTableController = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await tableService.getOneTableService(id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at get one table:"]: error.message });
  }
};
//update table
export const updateTableController = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await tableService.updateTableService(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at update table:"]: error.message });
  }
};
//delete table
export const deleteTableController = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await tableService.deleteTableService(id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at delete table:"]: error.message });
  }
};