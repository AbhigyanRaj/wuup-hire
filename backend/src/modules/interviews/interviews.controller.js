import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess, sendCreated } from "../../utils/apiResponse.js";
import * as interviewsService from "./interviews.service.js";

// POST /api/interviews
export const createInterview = asyncHandler(async (req, res) => {
  const { jobId, candidateId } = req.body;
  const interview = await interviewsService.createInterview({
    jobId,
    candidateId,
    userId: req.user.id,
  });
  sendCreated(res, { interview }, "Interview scheduled successfully.");
});

// GET /api/interviews
export const listInterviews = asyncHandler(async (req, res) => {
  const { page, limit, jobId, candidateId, status } = req.query;
  const result = await interviewsService.listInterviews({
    userId: req.user.id,
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    jobId,
    candidateId,
    status,
  });
  sendSuccess(res, result, "Interviews fetched successfully.");
});

// GET /api/interviews/:interviewId
export const getInterview = asyncHandler(async (req, res) => {
  const interview = await interviewsService.getInterview({
    interviewId: req.params.interviewId,
    userId: req.user.id,
  });
  sendSuccess(res, { interview }, "Interview fetched successfully.");
});

// GET /api/interviews/public/:interviewId
export const getPublicInterview = asyncHandler(async (req, res) => {
  const interview = await interviewsService.getPublicInterview({
    interviewId: req.params.interviewId,
  });
  sendSuccess(res, { interview }, "Public interview fetched successfully.");
});

// PATCH /api/interviews/:interviewId/status
export const updateInterviewStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const interview = await interviewsService.updateInterviewStatus({
    interviewId: req.params.interviewId,
    userId: req.user.id,
    status,
  });
  sendSuccess(res, { interview }, "Interview status updated.");
});

// POST /api/interviews/:interviewId/start or /public/:interviewId/start
export const startInterviewSession = asyncHandler(async (req, res) => {
  const result = await interviewsService.startBolnaInterview({
    interviewId: req.params.interviewId,
    userId: req.user?.id, // Optional for public routes
  });
  
  // Return the callUrl for the frontend to redirect
  res.status(200).json({
    success: true,
    data: {
      callUrl: result.callUrl,
      interview: result.interview
    },
    message: "Interview session started successfully."
  });
});
