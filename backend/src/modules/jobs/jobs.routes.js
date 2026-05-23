import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  createJobSchema,
  updateJobSchema,
  getJobSchema,
  listJobsSchema,
} from "./jobs.validation.js";
import {
  createJob,
  listJobs,
  getJob,
  updateJob,
  deleteJob,
} from "./jobs.controller.js";

const router = Router();

// All job routes are protected
router.use(authenticate);

router.post("/",          validate(createJobSchema), createJob);
router.get("/",           validate(listJobsSchema),  listJobs);
router.get("/:jobId",     validate(getJobSchema),    getJob);
router.patch("/:jobId",   validate(updateJobSchema), updateJob);
router.delete("/:jobId",  validate(getJobSchema),    deleteJob);

export default router;
