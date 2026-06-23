import { Router } from "express";
import { register, login, getProfile } from "../controllers/authController";
import { validateRequest } from "../middleware/validateRequest";
import { authMiddleware } from "../middleware/authMiddleware";
import { registerSchema, loginSchema } from "../validators/authValidator";

const router = Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.get("/me", authMiddleware, getProfile);

export default router;
