import express from "express";
import { CategoryController } from "../controllers/CategoryController.js";

const router = express.Router();
const categoryController = new CategoryController();

router.get("/", categoryController.getCategory);

router.post("/", categoryController.addCategory);

router.patch("/:id", categoryController.updateCategory);

router.delete("/:id", categoryController.deleteCategory);

export default router;