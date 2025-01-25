import * as employeeServices from "../services/employee.js";
import upload from "../services/upload.js";

//create employee
export const createEmployee = async (req, res) => {
  try {
    const { name, phone, gender } = req.body;
    const employeeImg = req.file ? req.file.path : null;

    if (!name || !phone || !gender) {
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" });
    }

    const response = await employeeServices.createEmployeeService({
      name,
      phone,
      gender,
      employeeImg,
    });

    return res.status(201).json(response);
  } catch (error) {
    console.error("Error at createEmployee:", error);
    res.status(500).json({ error: error.message });
  }
};

//create chef
export const createChef = async (req, res) => {
  const { name, phone, gender } = req.body;
  const employeeImg = req.file ? req.file.path : null;

  try {
    if (!name || !phone || !gender) {
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" });
    }

    const response = await employeeServices.createChefService({
      name,
      phone,
      gender,
      employeeImg,
    });

    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at create employee:"]: error.message });
  }
};
//get all employee
export const getAllEmployee = async (req, res) => {
  try {
    const response = await employeeServices.getAllEmployeeService();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at get all employee:"]: error.message });
  }
};
//get one employee
export const getOneEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await employeeServices.getOneEmployeeService(id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at get one employee:"]: error.message });
  }
};
//delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await employeeServices.getOneEmployeeService(id);
    if (!employee) {
      return res.status(404).json({ message: "Nhân viên không tồn tại!" });
    }
    //xóa ảnh
    if (employee.employeeImg) {
      const publicId = employee.employeeImg.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`foodvn/${publicId}`);
    }
    //xóa nhân viên
    const response = await employeeServices.deleteEmployeeService(id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at delete employee:"]: error.message });
  }
};
//update employee
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = {
      name: req.body.name,
      phone: req.body.phone,
      gender: req.body.gender,
    };

    // Nếu có ảnh, lấy URL từ Cloudinary
    if (req.file) {
      const imageUrl = req.file.path; 
      updatedData.image = imageUrl;
    }

    // Cập nhật thông tin vào database
    const result = await employeeServices.updateEmployeeService(id, updatedData);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error in updateEmployee:", error);
    res.status(500).json({ success: false, message: "Update failed" });
  }
};
