import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User";
import Room from "./models/Room";
import Booking from "./models/Booking";

import sequelize from "./config/database";
import authRoutes from "./routes/auth";
import roomRoutes from "./routes/rooms";
dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 3000;
const models = { User, Room, Booking };
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/rooms", roomRoutes);
app.use((req: Request, res: Response, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hotel Booking API is running!",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});
app.get("/health", (req: Request, res: Response, next) => {
  res.json({ status: "OK" });
});
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});
sequelize;
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database synced!");
  })
  .catch((err) => {
    console.error("Database sync error:", err);
  });
app.listen(PORT, () => {
  console.log(`Server is run on http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop`);
});
