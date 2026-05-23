
import jwt from "jsonwebtoken";
import { sendUnauthorized } from "../utils/apiResponse.js";
import { env } from "../config/env.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendUnauthorized(res, "No token provided.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    next(err); // passes to error middleware (JsonWebTokenError / TokenExpiredError)
  }
};
