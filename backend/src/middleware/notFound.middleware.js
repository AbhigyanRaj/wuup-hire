import { sendNotFound } from "../utils/apiResponse.js";

export const notFoundMiddleware = (req, res) => {
  sendNotFound(res, `Route ${req.method} ${req.originalUrl} not found.`);
};
