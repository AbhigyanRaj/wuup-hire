import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { registerSchema, loginSchema } from "./auth.validation.js";
import { register, login, getMe, logout } from "./auth.controller.js";

const router = Router();

// POST /api/auth/register
router.post("/register", validate(registerSchema), register);

// POST /api/auth/login
router.post("/login", validate(loginSchema), login);

// GET /api/auth/me  (protected)
router.get("/me", authenticate, getMe);

// POST /api/auth/logout (protected)
router.post("/logout", authenticate, logout);

export default router;
