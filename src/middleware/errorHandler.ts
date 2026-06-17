import { Request, Response, NextFunction } from "express";
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Error:", error.message);
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === "UnauthorizedError") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};
