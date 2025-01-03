import express from "express";
import * as categoryController from "../controller/categoryController"; // Đảm bảo import đúng path

const router = express.Router();

// Route tạo loại món ăn
router.post("/categories", categoryController.createCategoryController);

// Route lấy tất cả loại món ăn
router.get("/categories", categoryController.getAllCategoriesController);

// Route lấy loại món ăn theo ID
router.get("/categories/:id", categoryController.getCategoryByIdController);

// Route cập nhật loại món ăn
router.put("/categories/:id", categoryController.updateCategoryController);

// Route xóa loại món ăn
router.delete("/categories/:id", categoryController.deleteCategoryController);

export default router;
