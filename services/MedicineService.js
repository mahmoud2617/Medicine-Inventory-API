import Medicine from "../models/Medicine.js";
import Category from "../models/Category.js";
import mongoose from "mongoose";
import InvalidRequestDataError from "../errors/InvalidRequestDataError.js";

export class MedicineService {
    async getMedicines(req) {
        const search = req.query.search;

        if (!search)
            return await Medicine.find();

        return await Medicine.find({
            name: {$regex: search, $options: 'i'}
        });
    }

    async addMedicine(req){
        const {name, quantity, price, category} = req.body;

        if (!name || !quantity || !price || !category) {
            throw new InvalidRequestDataError();
        }

        if (!mongoose.isValidObjectId(category)) {
            throw new InvalidRequestDataError("Invalid category ID.")
        }

        const existingCategory = await Category.findById(category);

        if (!existingCategory) {
            throw new InvalidRequestDataError("Category not found.");
        }

        const medicine = new Medicine({
            name,
            quantity,
            price,
            category
        });

        await medicine.save();

        return medicine;
    }


    async updateMedicine(req){
        const id = req.params.id;

        if (!mongoose.isValidObjectId(id)) {
            throw new InvalidRequestDataError("Invalid medicine ID.")
        }

        const {name, quantity, price, category} = req.body;
        const updates = {};

        if (name !== undefined)
            updates.name = name;
        if (quantity !== undefined)
            updates.quantity = quantity;
        if (price !== undefined)
            updates.price = price;
        if (category !== undefined) {
            if (!mongoose.isValidObjectId(category)) {
                throw new InvalidRequestDataError("Invalid category ID.")
            }

            const existingCategory = await Category.findById(category);

            if (!existingCategory) {
                throw new InvalidRequestDataError("Category not found.");
            }

            updates.category = category;
        }

        if (updates.length === 0) {
            throw new InvalidRequestDataError();
        }

        return await Medicine.findByIdAndUpdate(
            id,
            {$set: updates},
            {returnDocument: 'after', runValidators: true}
        );
    }

    async deleteMedicine(req) {
        const id = req.params.id;

        if (!mongoose.isValidObjectId(id)) {
            throw new InvalidRequestDataError("Invalid medicine ID.")
        }

        const result = await Medicine.findByIdAndDelete(id);

        return result !== null;
    }
}