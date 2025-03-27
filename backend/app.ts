import "dotenv/config";
import express  from "express";
import type { Express } from 'express'
import cookieParser from "cookie-parser";
import cors from "cors";


import indexRouter from "./routes/index";
import authRouter from "./routes/auth";
import cleanerRouter from "./routes/cleaner";

import { db, client } from "./db/index";


const corsOptions = {
  origin: "http://localhost:8080", // Allowing the frontend URL
};

const PORT = process.env.PORT || 8080;
const app: Express = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/cleaners", cleanerRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});


(async () => {
  try {
    await client`SELECT 1`; // Simple query to check connection
    console.log("✅ PostgreSQL connection established successfully 🎉");
  } catch (error) {
    console.error("❌ Error connecting to PostgreSQL:", error);
  }
})();
