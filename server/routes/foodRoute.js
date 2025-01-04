import express from "express";
import * as foodController from "../controller/foodController";

const router = express.Router();

// Route tạo món ăn
router.post("/", foodController.createFoodController);

// Route lấy tất cả món ăn
router.get("/", foodController.getAllFoodController);

// Route lấy món ăn theo ID
router.get("/:id", foodController.getFoodByIdController);

// Route cập nhật món ăn
router.put("/:id", foodController.updateFoodController);

// Route xóa món ăn
router.delete("/:id", foodController.deleteFoodController);

export default router;
