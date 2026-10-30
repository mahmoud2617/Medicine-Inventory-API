import mongoose, {Schema} from "mongoose";

const medicineSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 0
        },

        price: {
            type: Schema.Types.Double,
            required: true,
            min: 0
        },

        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        }
    },
    {
        versionKey: false
    }
);

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;