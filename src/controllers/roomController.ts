import { Request, Response } from "express";
import {
  getAllRooms,
  getRoomById,
  createNewRoom,
  updateRoom,
  deleteRoom,
} from "../services/roomService";

export const getRooms = async (req: Request, res: Response, next: any) => {
  try {
    const rooms = await getAllRooms();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (req: Request, res: Response, next: any) => {
  try {
    const room = await getRoomById(Number(req.params.id));
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

export const createRoom = async (req: Request, res: Response, next: any) => {
  try {
    const room = await createNewRoom(req.body);
    res.status(201).json(room);
  } catch (error) {
    next(error);
  }
};

export const updateRoomHandler = async (
  req: Request,
  res: Response,
  next: any,
) => {
  try {
    const room = await updateRoom(Number(req.params.id), req.body);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

export const deleteRoomHandler = async (
  req: Request,
  res: Response,
  next: any,
) => {
  try {
    await deleteRoom(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
