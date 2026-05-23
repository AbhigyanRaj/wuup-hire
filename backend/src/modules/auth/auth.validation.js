import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required." }).min(2, "Name must be at least 2 characters.").trim(),
    email: z.string({ required_error: "Email is required." }).email("Invalid email address.").toLowerCase().trim(),
    password: z
      .string({ required_error: "Password is required." })
      .min(8, "Password must be at least 8 characters."),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required." }).email("Invalid email address.").toLowerCase().trim(),
    password: z.string({ required_error: "Password is required." }).min(1, "Password is required."),
  }),
});
