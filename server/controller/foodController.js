import * as foodService from "../services/foodService";

// Tạo món ăn
export const createFoodController = async (req, res) => {
  const { name, price, categoryId } = req.body;
  try {
    const result = await foodService.createFoodService({
      name,
      price,
      categoryId,
    });
    if (result.err === 1) {
      return res.status(400).json(result); // Trả về lỗi nếu có
    }
    return res.status(201).json(result); // Trả về kết quả thành công
  } catch (error) {
    return res.status(500).json({ err: 1, msg: "Lỗi hệ thống!" });
  }
};

// Lấy tất cả món ăn
export const getAllFoodController = async (req, res) => {
  try {
    const result = await foodService.getAllFoodService();
    return res.status(200).json(result); // Trả về danh sách món ăn
  } catch (error) {
    return res.status(500).json({ err: 1, msg: "Lỗi hệ thống!" });
  }
};

// Lấy món ăn theo ID
export const getFoodByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await foodService.getFoodByIdService(id);
    if (!result) {
      return res.status(404).json({ err: 1, msg: "Món ăn không tồn tại!" });
    }
    return res
      .status(200)
      .json({ err: 0, msg: "Lấy món ăn thành công!", data: result });
  } catch (error) {
    return res.status(500).json({ err: 1, msg: "Lỗi hệ thống!" });
  }
};

// Cập nhật món ăn
export const updateFoodController = async (req, res) => {
  const { id } = req.params;
  const { name, price, categoryId } = req.body;
  try {
    const result = await foodService.updateFoodService(id, {
      name,
      price,
      categoryId,
    });
    return res.status(200).json(result); // Trả về kết quả cập nhật
  } catch (error) {
    return res.status(500).json({ err: 1, msg: "Lỗi hệ thống!" });
  }
};

// Xóa món ăn
export const deleteFoodController = async (req, res) => {
  const { id } = req.params;
  const { categoryId } = req.body;
  try {
    const result = await foodService.deleteFoodService(id, categoryId);
    return res.status(200).json(result); // Trả về kết quả xóa
  } catch (error) {
    return res.status(500).json({ err: 1, msg: "Lỗi hệ thống!" });
  }
};
