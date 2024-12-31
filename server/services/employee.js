import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const hashPassword = (password) => {
  if (!password) throw new Error("Password chưa được truyền vào!");
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

//create employee order
export const createEmployeeService = ({ name, phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const employeeRole = await db.Role.findOne({
        where: { roleName: "Employee" },
      });
      const response = await db.Employee.findOrCreate({
        where: { employeePhone: phone },
        defaults: {
          password: hashPassword(password),
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