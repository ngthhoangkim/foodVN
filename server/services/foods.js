import db from "../models";

// Tạo món ăn
export const createFoodService = ({ name, price, categoryId }) =>
  new Promise(async (resolve, reject) => {
    try {
      const category = await db.Category.findByPk(categoryId);
      if (!category) {
        resolve({ err: 1, msg: "Loại món ăn không tồn tại!" });
        return;
      }

      const response = await db.Food.create({
        itemName: name,
        itemPrice: price,
        categoryId: category.id, // Liên kết với category
      });
      resolve({ err: 0, msg: "Thêm món ăn thành công!", data: response });
    } catch (error) {
      reject(error);
    }
  });

// Lấy tất cả món ăn
export const getAllFoodService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Food.findAll({
        include: [
          {
            model: db.Category,
            as: "category", // Bao gồm thông tin danh mục
            attributes: ["categoryName"],
          },
        ],
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

// Lấy một món ăn theo ID
export const getFoodByIdService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const food = await db.Food.findByPk(id, {
        include: [
          {
            model: db.Category,
            as: "category", // Bao gồm thông tin danh mục
            attributes: ["categoryName"],
          },
        ],
      });
      if (!food) {
        resolve(null);
        return;
      }
      resolve(food);
    } catch (error) {
      reject(error);
    }
  });

// Cập nhật món ăn
export const updateFoodService = (id, { name, price, categoryId }) =>
  new Promise(async (resolve, reject) => {
    try {
      const food = await db.Food.findByPk(id, {
        include: [
          {
            model: db.Category,
            as: "category",
            attributes: ["categoryName"],
          },
        ],
      });

      // Kiểm tra xem món ăn có tồn tại không
      if (!food) {
        resolve({ err: 1, msg: "Món ăn không tồn tại!" });
        return;
      }

      // Kiểm tra nếu bạn muốn chỉ cho phép cập nhật nếu món ăn thuộc một loại cụ thể (ví dụ, categoryId = 2)
      if (food.categoryId !== categoryId) {
        resolve({
          err: 1,
          msg: "Không thể cập nhật món ăn này vì thuộc loại khác!",
        });
        return;
      }

      // Tiến hành cập nhật món ăn nếu mọi điều kiện đều hợp lệ
      const updatedData = {
        ...(name && { itemName: name }),
        ...(price && { itemPrice: price }),
        ...(categoryId && { categoryId }), // Cập nhật categoryId nếu có
      };

      await db.Food.update(updatedData, { where: { id } });
      resolve({ err: 0, msg: "Cập nhật món ăn thành công!" });
    } catch (error) {
      reject(error);
    }
  });

// Xóa món ăn
export const deleteFoodService = (id, categoryId) =>
  new Promise(async (resolve, reject) => {
    try {
      const food = await db.Food.findByPk(id, {
        include: [
          {
            model: db.Category,
            as: "category",
            attributes: ["categoryName"],
          },
        ],
      });

      // Kiểm tra xem món ăn có tồn tại không
      if (!food) {
        resolve({ err: 1, msg: "Món ăn không tồn tại!" });
        return;
      }

      // Kiểm tra nếu món ăn không thuộc loại muốn xóa (ví dụ, categoryId = 2)
      if (food.categoryId !== categoryId) {
        resolve({
          err: 1,
          msg: "Không thể xóa món ăn này vì thuộc loại khác!",
        });
        return;
      }

      // Tiến hành xóa món ăn nếu mọi điều kiện đều hợp lệ
      await db.Food.destroy({ where: { id } });
      resolve({ err: 0, msg: "Xóa món ăn thành công!" });
    } catch (error) {
      reject(error);
    }
  });
