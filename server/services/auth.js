import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

const hashPassword = (password) => {
  if (!password) throw new Error("Password chưa được truyền vào!");
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
//register for customer
export const registerService = ({ email, name, phone, password, birthday }) =>
  new Promise(async (resolve, reject) => {
    try {
      const customerRole = await db.Role.findOne({
        where: { roleName: "Customer" },
      });
      const response = await db.Customer.findOrCreate({
        where: { customerPhone: phone },
        defaults: {
          customerEmail: email,
          password: hashPassword(password),
          customerName: name,
          customerPhone: phone,
          customerBirthday: birthday,
          roleID: customerRole.id,
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
        msg: token ? "Đăng ký thành công!" : "Tài khoản đã tồn tại!",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });
// login for customer
export const loginService = ({ phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Customer.findOne({
        where: { customerPhone: phone },
        include: [{ model: db.Role, as: "role", attributes: ["roleName"] }],
        nest: true,
        raw: true,
      });
      const isCorrectPassword =
        response && bcrypt.compareSync(password, response.password);
      const token =
        isCorrectPassword &&
        response.role &&
        jwt.sign(
          { id: response.id, phone: response.customerPhone },
          process.env.JWT_SECRET,
          { expiresIn: "2d" }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Đăng nhập thành công!"
          : response
          ? "Mật khẩu sai!"
          : "Tài khoản không tồn tại!",
        token: token || null,
        role: token ? response.role.roleName : null,
      });
    } catch (error) {
      reject(error);
    }
  });
//login for employee
export const loginEmployeeService = ({ phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Employee.findOne({
        where: { employeePhone: phone },
        include: [{ model: db.Role, as: "role", attributes: ["roleName"] }],
        nest: true,
        raw: true,
      });
      const isCorrectPassword =
        response && bcrypt.compareSync(password, response.password);
      const token =
        isCorrectPassword &&
        response.role &&
        jwt.sign(
          {
            id: response.id,
            phone: response.employeePhone,
            role: response.role.roleName,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2d" }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Đăng nhập thành công!"
          : response
          ? "Mật khẩu sai!"
          : "Tài khoản không tồn tại!",
        token: token || null,
        role: token ? response.role.roleName : null,
      });
    } catch (error) {
      reject(error);
    }
  });
