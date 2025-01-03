import express from "express";
import * as foodController from "../controller/foodController";

const router = express.Router();

// Route tạo món ăn
router.post("/foods", foodController.createFoodController);

// Route lấy tất cả món ăn
router.get("/foods", foodController.getAllFoodController);

// Route lấy món ăn theo ID
router.get("/foods/:id", foodController.getFoodByIdController);

// Route cập nhật món ăn
router.put("/foods/:id", foodController.updateFoodController);

// Route xóa món ăn
router.delete("/foods/:id", foodController.deleteFoodController);

export default router;
