import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

const hashPassword = (password) => {
  if (!password) throw new Error("Password chưa được truyền vào!");
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
//create employee order
export const createEmployeeService = ({ name, phone }) =>
  new Promise(async (resolve, reject) => {
    try {
      const employeeRole = await db.Role.findOne({
        where: { roleName: "Employee" },
      });
      const response = await db.Employee.findOrCreate({
        where: { employeePhone: phone },
        defaults: {
          password: hashPassword(process.env.EMPLOYEE_PASSWORD),
          employeeName: name,
          employeePhone: phone,
          roleID: employeeRole.id,
        },
      });
      const token =
        response[1] &&
        jwt.sign(
          { id: response[0].id, phone: response[0].phone },
          process.env.JWT_SECRET,
          { expiresIn: "2d" }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token ? "Thêm nhân viên thành công!" : "Nhân viên đã tồn tại!",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });
//create chef
export const createChefService = ({ name, phone }) =>
  new Promise(async (resolve, reject) => {
    try {
      const chefRole = await db.Role.findOne({
        where: { roleName: "Chef" },
      });
      const response = await db.Employee.findOrCreate({
        where: { employeePhone: phone },
        defaults: {
          password: hashPassword(process.env.CHEF_PASSWORD),
          employeeName: name,
          employeePhone: phone,
          roleID: chefRole.id,
        },
      });
      const token =
        response[1] &&
        jwt.sign(
          { id: response[0].id, phone: response[0].phone },
          process.env.JWT_SECRET,
          { expiresIn: "2d" }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token ? "Thêm nhân viên thành công!" : "Nhân viên đã tồn tại!",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });
//get all employee
export const getAllEmployeeService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Employee.findAll({
        include: [
          {
            model: db.Role,
            as: "role",
            attributes: ["roleName"],
          },
        ],
        order: [["id", "ASC"]],
      });
      resolve({
        err: 0,
        msg: "Lấy danh sách nhân viên thành công!",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
//get one employee
export const getOneEmployeeService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Employee.findOne({
        where: { id },
        attributes: ["id", "employeeName", "employeePhone", "roleID"],
        include: [
          {
            model: db.Role,
            as: "role",
            attributes: ["roleName"],
          },
        ],
      });
      if (response) {
        resolve({
          err: 0,
          msg: "Lấy thông tin nhân viên thành công!",
          data: response,
        });
      } else {
        resolve({
          err: 1,
          msg: "Nhân viên không tồn tại!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
//update employee
export const updateEmployeeService = (id, { name, phone }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Employee.findOne({
        where: { id },
      });
      if (!response) {
        resolve({
          err: 1,
          msg: "Nhân viên không tồn tại!",
        });
      } else {
        const updatedData = {
          ...(name && { employeeName: name }),
          ...(phone && { employeePhone: phone }),
        };

        await db.Employee.update(updatedData, {
          where: { id },
        });

        resolve({
          err: 0,
          msg: "Cập nhật nhân viên thành công!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
//delete employee
export const deleteEmployeeService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Employee.destroy({ where: { id } });
      resolve({
        err: response ? 0 : 1,
        msg: response
          ? "Xóa nhân viên thành công!"
          : "Nhân viên không tồn tại!",
      });
    } catch (error) {
      reject(error);
    }
  });
