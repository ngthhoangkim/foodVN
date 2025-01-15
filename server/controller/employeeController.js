import * as employeeServices from "../services/employee.js";

//create employee
export const createEmployee = async (req, res) => {
  const {  name, phone } = req.body
  try {
    if ( !name || !phone ) {
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" })
    }
    const response = await employeeServices.createEmployeeService(req.body)
    return res.status(201).json(response)

  } catch (error) {
    res.status(500).json({ ["Fail at create employee:"]: error.message });
  }
};
//create chef
export const createChef = async (req, res) => {
  const {  name, phone } = req.body
  try {
    if ( !name || !phone ) {
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" })
    }
    const response = await employeeServices.createChefService(req.body)
    return res.status(201).json(response)

  } catch (error) {
    res.status(500).json({ ["Fail at create employee:"]: error.message });
  }
};
//get all employee
export const getAllEmployee = async (req, res) => {
  try {
    const response = await employeeServices.getAllEmployeeService()
    return res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ ["Fail at get all employee:"]: error.message });
  }
};
//get one employee
export const getOneEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await employeeServices.getOneEmployeeService(id)
    return res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ ["Fail at get one employee:"]: error.message });
  }
};
//delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await employeeServices.deleteEmployeeService(id)
    return res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ ["Fail at delete employee:"]: error.message });
  }
};
//update employee
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await employeeServices.updateEmployeeService(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at update employee:"]: error.message });
  }
};