import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { getDashboardStats } from "./dashboard.controller.js";

const router = Router();

router.use(authenticate);

router.get("/", getDashboardStats);

export default router;
