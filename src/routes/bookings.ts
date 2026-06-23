import { Router } from "express";
import {
  getBookings,
  getBooking,
  createBooking,
  updateBookingHandler,
  deleteBookingHandler,
} from "../controllers/bookingController";
import { validateRequest } from "../middleware/validateRequest";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createBookingSchema,
  updateBookingSchema,
} from "../validators/bookingValidator";

const router = Router();

router.get("/", authMiddleware, getBookings);
router.get("/:id", authMiddleware, getBooking);
router.post(
  "/",
  authMiddleware,
  validateRequest(createBookingSchema),
  createBooking,
);
router.put(
  "/:id",
  authMiddleware,
  validateRequest(updateBookingSchema),
  updateBookingHandler,
);
router.delete("/:id", authMiddleware, deleteBookingHandler);

export default router;
