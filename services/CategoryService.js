import Category from "../models/Category.js";
import Medicine from "../models/Medicine.js";
import mongoose from "mongoose";
import InvalidRequestDataError from "../errors/InvalidRequestDataError.js";

export class CategoryService {
    async getCategories(req) {
        const search = req.query.search;

        if (!search)
            return await Category.find();

        return await Category.find({
            name: {$regex: search, $options: 'i'}
        });
    }

    async addCategory(req){
        const name = req.body.name;

        if (!name) {
            throw new InvalidRequestDataError();
        }

        const category = new Category({
            name
        });

        await category.save();

        return category;
    }


    async updateCategory(req){
        const id = req.params.id;

        if (!mongoose.isValidObjectId(id)) {
            throw new InvalidRequestDataError("Invalid category ID.")
        }

        const name = req.body;

        if (name === undefined) {
            throw new InvalidRequestDataError();
        }

        return await Category.findByIdAndUpdate(
            id,
            {$set: name},
            {returnDocument: 'after', runValidators: true}
        );
    }

    async deleteCategory(req) {
        const id = req.params.id;

        if (!mongoose.isValidObjectId(id)) {
            throw new InvalidRequestDataError("Invalid category ID.")
        }

        await Medicine.updateMany(
            {category: id},
            {$set: {category: null}}
        );

        const result = await Category.findByIdAndDelete(id);

        return result !== null;
    }
}