import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
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
app.listen(PORT, () => {
  console.log(`Server is run on http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop`);
});
