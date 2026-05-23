import { z } from "zod";

export const createInterviewSchema = z.object({
  body: z.object({
    jobId:       z.string({ required_error: "Job ID is required." }),
    candidateId: z.string({ required_error: "Candidate ID is required." }),
  }),
});

export const getInterviewSchema = z.object({
  params: z.object({
    interviewId: z.string({ required_error: "Interview ID is required." }),
  }),
});

export const listInterviewsSchema = z.object({
  query: z.object({
    page:        z.coerce.number().int().min(1).default(1),
    limit:       z.coerce.number().int().min(1).max(100).default(10),
    jobId:       z.string().optional(),
    candidateId: z.string().optional(),
    status:      z.enum([
      "PENDING", "LINK_SENT", "IN_PROGRESS",
      "COMPLETED", "EVALUATED", "SHORTLISTED", "REJECTED", "FAILED",
    ]).optional(),
  }),
});

export const updateStatusSchema = z.object({
  params: z.object({
    interviewId: z.string({ required_error: "Interview ID is required." }),
  }),
  body: z.object({
    status: z.enum(["SHORTLISTED", "REJECTED"], {
      required_error: "Status must be SHORTLISTED or REJECTED.",
    }),
  }),
});
