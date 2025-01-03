import db from "../models";
import { Op } from "sequelize";

// Create menu item
export const createMenuItemService = ({ name, price, categoryId }) =>
  new Promise(async (resolve, reject) => {
    try {
      const category = await db.Category.findByPk(categoryId);
      if (!category) {
        resolve({
          err: 1,
          msg: "Loại món ăn không tồn tại!",
        });
        return;
      }

      const response = await db.MenuItem.create({
        itemName: name,
        itemPrice: price,
        categoryId: category.id,
      });
      resolve({
        err: 0,
        msg: "Thêm món ăn thành công!",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });

// Get all menu items by category
export const getMenuItemsByCategoryService = (categoryId) =>
  new Promise(async (resolve, reject) => {
    try {
      const category = await db.Category.findByPk(categoryId);
      if (!category) {
        resolve({
          err: 1,
          msg: "Loại món ăn không tồn tại!",
        });
        return;
      }

      const response = await db.MenuItem.findAll({
        where: { categoryId },
        include: [
          {
            model: db.Category,
            as: "category",
            attributes: ["categoryName"],
          },
        ],
        order: [["id", "ASC"]],
      });
      resolve({
        err: 0,
        msg: "Lấy danh sách món ăn thành công!",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });

// Update menu item
export const updateMenuItemService = (id, { name, price, categoryId }) =>
  new Promise(async (resolve, reject) => {
    try {
      const menuItem = await db.MenuItem.findByPk(id);
      if (!menuItem) {
        resolve({
          err: 1,
          msg: "Món ăn không tồn tại!",
        });
        return;
      }

      const updatedData = {
        ...(name && { itemName: name }),
        ...(price && { itemPrice: price }),
        ...(categoryId && { categoryId }),
      };

      await db.MenuItem.update(updatedData, {
        where: { id },
      });

      resolve({
        err: 0,
        msg: "Cập nhật món ăn thành công!",
      });
    } catch (error) {
      reject(error);
    }
  });

// Delete menu item
export const deleteMenuItemService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.MenuItem.destroy({ where: { id } });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Xóa món ăn thành công!" : "Món ăn không tồn tại!",
      });
    } catch (error) {
      reject(error);
    }
  });
