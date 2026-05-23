import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess, sendCreated } from "../../utils/apiResponse.js";
import * as candidatesService from "./candidates.service.js";

// POST /api/candidates
export const createCandidate = asyncHandler(async (req, res) => {
  const { name, email, phone, resumeUrl, linkedinUrl } = req.body;
  const candidate = await candidatesService.createCandidate({
    name,
    email,
    phone,
    resumeUrl,
    linkedinUrl,
  });
  sendCreated(res, { candidate }, "Candidate created successfully.");
});

// GET /api/candidates
export const listCandidates = asyncHandler(async (req, res) => {
  const { page, limit, search } = req.query;
  const result = await candidatesService.listCandidates({
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    search,
  });
  sendSuccess(res, result, "Candidates fetched successfully.");
});

// GET /api/candidates/:candidateId
export const getCandidate = asyncHandler(async (req, res) => {
  const candidate = await candidatesService.getCandidate(req.params.candidateId);
  sendSuccess(res, { candidate }, "Candidate fetched successfully.");
});
