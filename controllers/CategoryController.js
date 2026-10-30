import {CategoryService} from "../services/CategoryService.js"

const categoryService = new CategoryService();

export class CategoryController {
    async getCategory(req, res, next) {
        try {
            const categories = await categoryService.getCategories(req);

            return res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

    async addCategory(req, res, next) {
        try {
            const categories = await categoryService.addCategory(req);

            return res.status(201).json(categories);
        } catch (error) {
            next(error);
        }
    }

    async updateCategory(req, res, next) {
        try {
            const categories = await categoryService.updateCategory(req);

            if (!categories) {
                return res.status(404).end();
            }

            return res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const deleted = await categoryService.deleteCategory(req);

            if (!deleted) {
                return res.status(404).end();
            }

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}