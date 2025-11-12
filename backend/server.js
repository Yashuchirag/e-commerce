import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

app.use("/api/auth", authRoutes);
connectDB();

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
