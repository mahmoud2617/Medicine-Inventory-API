import express from "express";
import { MedicineController } from "../controllers/MedicineController.js";

const router = express.Router();
const medicineController = new MedicineController();

router.get("/", medicineController.getMedicines);

router.post("/", medicineController.addMedicine);

router.patch("/:id", medicineController.updateMedicine);

router.delete("/:id", medicineController.deleteMedicine);

export default router;