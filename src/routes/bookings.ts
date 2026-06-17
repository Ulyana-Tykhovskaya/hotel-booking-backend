import { Router, Request, Response } from "express";
import { Booking, User, Room } from "../models";
import { validateRequest } from "../middleware/validateRequest";
import {
  createBookingSchema,
  updateBookingSchema,
} from "../validators/bookingValidator";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        {
          model: Room,
          attributes: ["id", "room_number", "type_room", "price"],
        },
      ],
    });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get bookings error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const booking = await Booking.findByPk(id, {
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        {
          model: Room,
          attributes: ["id", "room_number", "type_room", "price"],
        },
      ],
    });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error("Get booking error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post(
  "/",
  authMiddleware,
  validateRequest(createBookingSchema),
  async (req: Request, res: Response) => {
    try {
      const {
        user_id,
        room_id,
        check_in,
        check_out,
        adults,
        children,
        total_amount,
        status,
      } = req.body as any;
      if (!user_id || !room_id || !check_in || !check_out || !total_amount) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const checkInDate = new Date(check_in);
      const checkOutDate = new Date(check_out);
      if (checkOutDate <= checkInDate) {
        return res
          .status(400)
          .json({ error: "Check-out must be after check-in" });
      }
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const room = await Room.findByPk(room_id);
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }
      const totalPeople = adults + (children || 0);
      if (totalPeople > room.capacity) {
        return res.status(400).json({
          error: `Room capacity is ${room.capacity}, but you requested ${totalPeople} people`,
        });
      }
      const booking = await Booking.create({
        user_id,
        room_id,
        check_in: checkInDate,
        check_out: checkOutDate,
        adults,
        children: children || 0,
        total_amount,
        status: status || "pending",
      });

      res.status(201).json(booking);
    } catch (error) {
      console.error("Booking creation error:", error);
      res.status(500).json({ error: "Failed to create booking" });
    }
  },
);
router.put(
  "/:id",
  authMiddleware,
  validateRequest(updateBookingSchema),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string, 10);
      const {
        user_id,
        room_id,
        check_in,
        check_out,
        adults,
        children,
        total_amount,
        status,
      } = req.body;
      const booking = await Booking.findByPk(id);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      if (check_in || check_out) {
        const newCheckIn = check_in
          ? new Date(check_in)
          : new Date(booking.check_in);
        const newCheckOut = check_out
          ? new Date(check_out)
          : new Date(booking.check_out);
        if (newCheckOut <= newCheckIn) {
          return (
            res.status(400),
            res.json({ error: "Check-out date must be after check-in date" })
          );
        }
      }
      await booking.update({
        user_id: user_id ?? booking.user_id,
        room_id: room_id ?? booking.room_id,
        check_in: check_in ?? booking.check_in,
        check_out: check_out ?? booking.check_out,
        adults: adults ?? booking.adults,
        children: children ?? booking.children,
        total_amount: total_amount ?? booking.total_amount,
        status: status ?? booking.status,
      });
      res.status(200).json(booking);
    } catch (error) {
      console.error("Update booking error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    await booking.destroy();
    res.status(200).json({ message: "Booking deleted successfulle" });
  } catch (error) {
    console.error("Delete booking error:", error);
    res.status(500).json({ error: "internal server error" });
  }
});
export default router;
