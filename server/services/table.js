import db from "../models";

// Create table
export const createTableService = ({ tableNumber, maxQuantity, status }) =>
  new Promise(async (resolve, reject) => {
    try {
      const [table, created] = await db.Table.findOrCreate({
        where: { tableNumber: tableNumber },
        defaults: {
          tableNumber: tableNumber,
          maxQuantity: maxQuantity,
          status: status,
        },
      });

      if (created) {
        resolve({
          err: 0,
          msg: "Thêm bàn thành công!",
          data: table,
        });
      } else {
        resolve({
          err: 1,
          msg: "Bàn đã tồn tại!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
// get all table
export const getAllTableService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const tables = await db.Table.findAll();
      resolve({
        err: 0,
        msg: "Lấy danh sách bàn thành công!",
        data: tables,
      });
    } catch (error) {
      reject(error);
    }
  });
// get one table
export const getOneTableService = (tableID) =>
  new Promise(async (resolve, reject) => {
    try {
      const table = await db.Table.findOne({
        where: { id: tableID },
        attributes: ["id", "tableNumber", "maxQuantity", "status"],
      });
      if (!table) {
        resolve({
          err: 1,
          msg: "Bàn không tồn tại!",
        });
      }
      resolve({
        err: 0,
        msg: "Lấy thông tin bàn thành công!",
        data: table,
      });
    } catch (error) {
      reject(error);
    }
  });
// update table
export const updateTableService = (tableID, { tableNumber, maxQuantity, status }) =>
  new Promise(async (resolve, reject) => {
    try {
      const table = await db.Table.findOne({
        where: { id: tableID },
      });
      if (!table) {
        resolve({
          err: 1,
          msg: "Bàn không tồn tại!",
        });
      }
      await table.update({
        tableNumber: tableNumber,
        maxQuantity: maxQuantity,
        status: status,
      });
      resolve({
        err: 0,
        msg: "Cập nhật thông tin bàn thành công!",
      });
    } catch (error) {
      reject(error);
    }
  });
// delete table
export const deleteTableService = (tableID) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Table.destroy({ where: { id: tableID } });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Xóa bàn thành công!" : "Bàn không tồn tại!",
      });
    } catch (error) {
      reject(error);
    }
  });