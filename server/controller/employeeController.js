import * as employeeServices from "../services/employee.js";

export const createEmployee = async (req, res) => {
  const { password, name, phone } = req.body
  try {
    if ( !password || !name || !phone ) {
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" })
    }
    const response = await employeeServices.createEmployeeService(req.body)
    return res.status(201).json(response)

  } catch (error) {
    res.status(500).json({ ["Fail at create employee:"]: error.message });
  }
};