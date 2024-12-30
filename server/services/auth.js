import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

const hashPassword = (password) => {
  if (!password) throw new Error("Password is required for hashing");
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const registerService = ({ email, name, phone, password, birthday }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!password) throw new Error("Password is missing in input");
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
// login
export const loginService = ({ phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Customer.findOne({
        where: { customerPhone: phone },
        raw: true,
      });
      const isCorrectPassword =
        response && bcrypt.compareSync(password, response.password);
      const token =
        isCorrectPassword &&
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
      });
    } catch (error) {
      reject(error);
    }
  });
