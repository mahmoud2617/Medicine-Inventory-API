import express from "express";
import connectDb from "./config/DbConfig.js";
import errorHandler from "./middlewares/ErrorHandler.js";
import medicineRouter from "./routers/MedicineRouter.js";
import categoryRouter from "./routers/CategoryRouter.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/medicine", medicineRouter);
app.use("/api/category", categoryRouter);

app.use(errorHandler);

connectDb();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
