import { Request, Response } from "express";
import { registerUser, loginUser, getUser } from "../services/authService";

export const register = async (req: Request, res: Response, next: any) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: any) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: any) => {
  try {
    const userId = (req as any).userId;
    const user = await getUser(userId);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
