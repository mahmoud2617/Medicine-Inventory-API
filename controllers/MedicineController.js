import {MedicineService} from "../services/MedicineService.js";

const medicineService = new MedicineService();

export class MedicineController {
    async getMedicines(req, res, next) {
        try {
            const medicines = await medicineService.getMedicines(req);

            return res.status(200).json(medicines);
        } catch (error) {
            next(error);
        }
    }

    async addMedicine(req, res, next) {
        try {
            const medicines = await medicineService.addMedicine(req);

            return res.status(201).json(medicines);
        } catch (error) {
            next(error);
        }
    }

    async updateMedicine(req, res, next) {
        try {
            const medicines = await medicineService.updateMedicine(req);

            if (!medicines) {
                return res.status(404).end();
            }

            return res.status(200).json(medicines);
        } catch (error) {
            next(error);
        }
    }

    async deleteMedicine(req, res, next) {
        try {
            const deleted = await medicineService.deleteMedicine(req);

            if (!deleted) {
                return res.status(404).end();
            }

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}
