import { logger } from "../utils/logger.js";
import { sendError } from "../utils/apiResponse.js";

/**
 * Global error handler — must be registered LAST in app.js (4 params).
 */
export const errorMiddleware = (err, req, res, next) => {
  // Log all errors
  logger.error(err.message, {
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  // Prisma known errors
  if (err.code === "P2002") {
    return sendError(res, "A record with this value already exists.", 409);
  }
  if (err.code === "P2025") {
    return sendError(res, "Record not found.", 404);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return sendError(res, "Invalid token.", 401);
  }
  if (err.name === "TokenExpiredError") {
    return sendError(res, "Token expired.", 401);
  }

  // Zod validation errors
  if (err.name === "ZodError") {
    return sendError(res, "Validation failed.", 400, err.errors);
  }

  // Generic
  const statusCode = err.statusCode || err.status || 500;
  const message =
    process.env.NODE_ENV === "production" && statusCode === 500
      ? "Internal server error."
      : err.message || "Internal server error.";

  return sendError(res, message, statusCode);
};
