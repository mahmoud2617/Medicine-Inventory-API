import AppError from "./AppError.js";

export default class InvalidRequestDataError extends AppError {
    constructor(message = "Invalid request data.") {
        super(message, 400);
    }
}