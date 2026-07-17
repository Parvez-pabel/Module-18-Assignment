import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import router from "./src/routes/api.js";
import { requestLogger } from "./src/middlewares/logger.js";
import { notFoundHandler } from "./src/middlewares/pageNotFound.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

dotenv.config();

const app = express();
connectDB();
app.use(express.json());
app.use(requestLogger);

app.use("/api/v1", router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
