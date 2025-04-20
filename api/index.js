// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// ✅ Gemini Import
import {askGeminiInvestor} from "./utils/gemini.js";

// Backend Setup
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import { test } from "./controllers/user.controller.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';
import startupRouter from "./routes/startup.route.js";
import investorRouter from "./routes/investor.route.js";
import cors from "cors"
dotenv.config();

// MongoDB Connection

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("✅ MongoDB connected!!!");
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());

// Listen on port 3000
app.listen(3000, () => {
  console.log("🚀 Server is running on port 3000!!!");
});
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true // if you're using cookies or auth tokens
}));

// Routes
app.get("/test", test);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/startup", startupRouter);
app.use("/api/investor", investorRouter);

// Centralized Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
