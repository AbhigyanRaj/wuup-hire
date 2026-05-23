import { z } from "zod";

const screeningQuestionSchema = z.object({
  question: z.string().min(5, "Each question must be at least 5 characters."),
  type: z.enum(["open", "yesno"]).default("open"),
});

export const createJobSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required." }).min(2, "Title must be at least 2 characters.").trim(),
    description: z.string().optional().default(""),
    experienceLevel: z.string().optional(),
    techStack: z.string().optional(),
    interviewDuration: z.string().optional(),
    strictnessLevel: z.string().optional(),
    screeningQuestions: z
      .array(screeningQuestionSchema)
      .min(1, "At least one screening question is required.")
      .default([]),
  }),
});

export const updateJobSchema = z.object({
  body: z.object({
    title: z.string().min(2).trim().optional(),
    description: z.string().optional(),
    screeningQuestions: z.array(screeningQuestionSchema).optional(),
    bolnaAgentId: z.string().optional(),
  }),
  params: z.object({
    jobId: z.string({ required_error: "Job ID is required." }),
  }),
});

export const getJobSchema = z.object({
  params: z.object({
    jobId: z.string({ required_error: "Job ID is required." }),
  }),
});

export const listJobsSchema = z.object({
  query: z.object({
    page:  z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
  }),
});
