import { z } from "zod";
import { sendBadRequest } from "../utils/apiResponse.js";

/**
 * Zod schema validation middleware factory.
 * Usage: router.post("/", validate(mySchema), handler)
 */
export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    if (err instanceof z.ZodError || err.name === "ZodError") {
      const issues = err.issues || err.errors || [];
      const errors = issues.map((e) => ({
        field: e.path ? e.path.join(".") : "unknown",
        message: e.message,
      }));
      return sendBadRequest(res, "Validation failed.", errors);
    }
    next(err);
  }
};
