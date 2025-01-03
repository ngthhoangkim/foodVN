import {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
} from "../services/categoryService.js";

// Tạo danh mục
export const createCategory = async (req, res) => {
  try {
    const categoryData = req.body;
    const result = await createCategoryService(categoryData);
    res.status(201).json({ message: "Danh mục đã được tạo!", result });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo danh mục", error });
  }
};

// Lấy tất cả danh mục
export const getAllCategories = async (req, res) => {
  try {
    const categories = await getAllCategoriesService();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách danh mục", error });
  }
};

// Lấy một danh mục theo ID
export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await getCategoryByIdService(id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Danh mục không tồn tại" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh mục", error });
  }
};

// Cập nhật danh mục
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await updateCategoryService(id, req.body);
    res.status(200).json({ message: "Danh mục đã được cập nhật!", result });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật danh mục", error });
  }
};

// Xóa danh mục
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteCategoryService(id);
    res.status(200).json({ message: "Danh mục đã được xóa!", result });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa danh mục", error });
  }
};
