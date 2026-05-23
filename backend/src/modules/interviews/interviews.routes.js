import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  createInterviewSchema,
  getInterviewSchema,
  listInterviewsSchema,
  updateStatusSchema,
} from "./interviews.validation.js";
import {
  createInterview,
  listInterviews,
  getInterview,
  getPublicInterview,
  updateInterviewStatus,
  startInterviewSession,
} from "./interviews.controller.js";

const router = Router();

// Public routes (Candidate facing)
router.get("/public/:interviewId", validate(getInterviewSchema), getPublicInterview);
router.post("/public/:interviewId/start", startInterviewSession); // Doesn't need auth

// All recruiter interview routes are protected
router.use(authenticate);

router.post("/",                      validate(createInterviewSchema), createInterview);
router.get("/",                       validate(listInterviewsSchema),  listInterviews);
router.get("/:interviewId",           validate(getInterviewSchema),    getInterview);
router.patch("/:interviewId/status",  validate(updateStatusSchema),    updateInterviewStatus);
router.post("/:interviewId/start",    startInterviewSession);

export default router;
