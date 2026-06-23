import { Router } from "express";
import {
  getRooms,
  getRoom,
  createRoom,
  updateRoomHandler,
  deleteRoomHandler,
} from "../controllers/roomController";
import { validateRequest } from "../middleware/validateRequest";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createRoomSchema,
  updateRoomSchema,
} from "../validators/roomValidator";

const router = Router();

router.get("/", getRooms);
router.get("/:id", getRoom);
router.post("/", authMiddleware, validateRequest(createRoomSchema), createRoom);
router.put(
  "/:id",
  authMiddleware,
  validateRequest(updateRoomSchema),
  updateRoomHandler,
);
router.delete("/:id", authMiddleware, deleteRoomHandler);

export default router;
