import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess, sendCreated } from "../../utils/apiResponse.js";
import * as authService from "./auth.service.js";

// POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const result = await authService.register({ name, email, password });
  sendCreated(res, result, "Registration successful.");
});

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login({ email, password });
  sendSuccess(res, result, "Login successful.");
});

// GET /api/auth/me  (protected)
export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user.id);
  sendSuccess(res, { user }, "User fetched successfully.");
});

// POST /api/auth/logout (protected)
export const logout = asyncHandler(async (req, res) => {
  // If using stateless JWTs, the client handles deleting the token. 
  // We just send a 200 OK.
  sendSuccess(res, null, "Logged out successfully.");
});
