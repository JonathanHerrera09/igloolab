import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productRoutes from "./routes/ProductRoutes";
import authRoutes from "./routes/AuthRoutes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/products", productRoutes);
app.use("/auth", authRoutes);

export default app;
