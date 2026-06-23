import { Request, Response } from "express";
import {
  getAllBookings,
  getBookingById,
  createNewBooking,
  updateBooking,
  deleteBooking,
} from "../services/bookingService";

export const getBookings = async (req: Request, res: Response, next: any) => {
  try {
    const userId = (req as any).userId;
    const bookings = await getAllBookings(userId);
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

export const getBooking = async (req: Request, res: Response, next: any) => {
  try {
    const booking = await getBookingById(Number(req.params.id));
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (req: Request, res: Response, next: any) => {
  try {
    const userId = (req as any).userId;
    const booking = await createNewBooking(userId, req.body);
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

export const updateBookingHandler = async (
  req: Request,
  res: Response,
  next: any,
) => {
  try {
    const booking = await updateBooking(Number(req.params.id), req.body);
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

export const deleteBookingHandler = async (
  req: Request,
  res: Response,
  next: any,
) => {
  try {
    await deleteBooking(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
