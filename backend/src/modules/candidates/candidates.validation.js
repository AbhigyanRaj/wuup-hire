import { z } from "zod";

export const createCandidateSchema = z.object({
  body: z.object({
    name:        z.string({ required_error: "Name is required." }).min(2, "Name must be at least 2 characters.").trim(),
    email:       z.string({ required_error: "Email is required." }).email("Invalid email address.").toLowerCase().trim(),
    phone:       z.string().optional(),
    resumeUrl:   z.string().url("Invalid resume URL.").optional(),
    linkedinUrl: z.string().url("Invalid LinkedIn URL.").optional(),
  }),
});

export const getCandidateSchema = z.object({
  params: z.object({
    candidateId: z.string({ required_error: "Candidate ID is required." }),
  }),
});

export const listCandidatesSchema = z.object({
  query: z.object({
    page:   z.coerce.number().int().min(1).default(1),
    limit:  z.coerce.number().int().min(1).max(100).default(10),
    search: z.string().optional(), // filter by name or email
  }),
});
