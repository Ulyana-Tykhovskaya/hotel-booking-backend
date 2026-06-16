import { Router, Request, Response } from "express";
import { Room } from "../models";
import { validateRequest } from "../middleware/validateRequest";
import {
  createRoomSchema,
  updateRoomSchema,
} from "../validators/roomValidator";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const rooms = await Room.findAll();
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Get rooms error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.status(200).json(room);
  } catch (error) {
    console.error("Get room error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post(
  "/",
  validateRequest(createRoomSchema),
  async (req: Request, res: Response) => {
    try {
      const {
        room_number,
        type_room,
        price,
        capacity,
        description,
        is_available,
      } = req.body;

      if (!room_number || !type_room || !price || !capacity) {
        return res
          .status(400)
          .json({ error: "All required fields must be provided" });
      }

      const room = await Room.create({
        room_number,
        type_room,
        price,
        capacity,
        description,
        is_available: is_available ?? true,
      });

      res.status(201).json(room);
    } catch (error) {
      console.error("Create room error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

router.put(
  "/:id",
  validateRequest(updateRoomSchema),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string, 10);
      const {
        room_number,
        type_room,
        price,
        capacity,
        description,
        is_available,
      } = req.body;

      const room = await Room.findByPk(id);
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      await room.update({
        room_number: room_number ?? room.room_number,
        type_room: type_room ?? room.type_room,
        price: price ?? room.price,
        capacity: capacity ?? room.capacity,
        description: description ?? room.description,
        is_available: is_available ?? room.is_available,
      });

      res.status(200).json(room);
    } catch (error) {
      console.error("Update room error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    await room.destroy();
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Delete room error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
