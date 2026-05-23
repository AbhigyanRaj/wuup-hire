import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess, sendCreated } from "../../utils/apiResponse.js";
import * as jobsService from "./jobs.service.js";

// POST /api/jobs
export const createJob = asyncHandler(async (req, res) => {
  const { title, description, screeningQuestions, experienceLevel, techStack, interviewDuration, strictnessLevel } = req.body;
  const job = await jobsService.createJob({
    title,
    description,
    screeningQuestions,
    experienceLevel,
    techStack,
    interviewDuration,
    strictnessLevel,
    userId: req.user.id,
  });
  sendCreated(res, { job }, "Job created successfully.");
});

// GET /api/jobs
export const listJobs = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const result = await jobsService.listJobs({
    userId: req.user.id,
    page: Number(page) || 1,
    limit: Number(limit) || 10,
  });
  sendSuccess(res, result, "Jobs fetched successfully.");
});

// GET /api/jobs/:jobId
export const getJob = asyncHandler(async (req, res) => {
  const job = await jobsService.getJob({
    jobId: req.params.jobId,
    userId: req.user.id,
  });
  sendSuccess(res, { job }, "Job fetched successfully.");
});

// PATCH /api/jobs/:jobId
export const updateJob = asyncHandler(async (req, res) => {
  const { title, description, screeningQuestions, bolnaAgentId } = req.body;
  const job = await jobsService.updateJob({
    jobId: req.params.jobId,
    userId: req.user.id,
    data: { title, description, screeningQuestions, bolnaAgentId },
  });
  sendSuccess(res, { job }, "Job updated successfully.");
});

// DELETE /api/jobs/:jobId
export const deleteJob = asyncHandler(async (req, res) => {
  await jobsService.deleteJob({
    jobId: req.params.jobId,
    userId: req.user.id,
  });
  sendSuccess(res, null, "Job deleted successfully.");
});
