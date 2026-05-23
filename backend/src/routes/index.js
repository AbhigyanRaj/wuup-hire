import { Router } from "express";
import { sendSuccess } from "../utils/apiResponse.js";
import { prisma } from "../config/prisma.js";
import authRoutes from "../modules/auth/auth.routes.js";
import jobsRoutes from "../modules/jobs/jobs.routes.js";
import candidatesRoutes from "../modules/candidates/candidates.routes.js";
import interviewsRoutes from "../modules/interviews/interviews.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";

const router = Router();

// ─── Health Check ─────────────────────────────────────────────────────────────

router.get("/health", async (req, res, next) => {
  try {
    // Ping the database
    await prisma.$queryRaw`SELECT 1`;
    console.log("health running");
    return sendSuccess(res, { uptime: process.uptime() }, "Server running");
  } catch (err) {
    next(err);
  }
});

// ─── API Routes ───────────────────────────────────────────────────────────────
router.use("/auth", authRoutes);
router.use("/jobs", jobsRoutes);
router.use("/candidates", candidatesRoutes);
router.use("/interviews", interviewsRoutes);
router.use("/dashboard", dashboardRoutes);
import webhookRoutes from "../modules/webhooks/webhook.routes.js";
router.use("/webhooks", webhookRoutes);

export default router;
