import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/database";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/auth";
import roomRoutes from "./routes/rooms";
import bookingRoutes from "./routes/bookings";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hotel Booking API is running!",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK" });
});
app.use("/auth", authRoutes);
app.use("/rooms", roomRoutes);
app.use("/bookings", bookingRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV !== "production") {
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("Database synced!");
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Database sync error:", err);
    });
} else {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
