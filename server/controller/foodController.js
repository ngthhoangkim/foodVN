import * as foodService from "../services/foods";

// Tạo món ăn
export const createFoodController = async (req, res) => {
  const { name, price, categoryName, description } = req.body;
  try {
    if (!name || !price || !categoryName || !description) {
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" });
    }
    const response = await foodService.createFoodService(req.body);
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at create food:"]: error.message });
  }
};
// Lấy tất cả món ăn
export const getAllFoodController = async (req, res) => {
  try {
    const result = await foodService.getAllFoodService();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ ["Fail at get all food:"]: error.message });
  }
};
// Lấy món ăn theo ID
export const getFoodByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await foodService.getFoodByIdService(id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at get one food:"]: error.message });
  }
};
// Cập nhật món ăn
export const updateFoodController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await foodService.updateFoodService(id, req.body);
    console.log(req.body);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ ["Fail at update food:"]: error.message });
  }
};
// Xóa món ăn
export const deleteFoodController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await foodService.deleteFoodService(id);
    res.status(200).json({ message: "Món ăn đã được xóa!", result });
  } catch (error) {
    res.status(500).json({ ["Fail at delete food:"]: error.message });
  }
};
