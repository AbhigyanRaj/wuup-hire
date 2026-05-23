import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma.js";
import { env } from "../../config/env.js";

const SALT_ROUNDS = 12;

const signToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );

const sanitizeUser = ({ password, ...rest }) => rest;

// ─── Register ────────────────────────────────────────────────────────────────

export const register = async ({ name, email, password }) => {
  // 1. Check for existing user
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const err = new Error("An account with this email already exists.");
    err.statusCode = 409;
    throw err;
  }

  // 2. Hash password
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);

  // 3. Create user
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  // 4. Sign JWT
  const token = signToken(user);

  return { user: sanitizeUser(user), token };
};

// ─── Login ───────────────────────────────────────────────────────────────────

export const login = async ({ email, password }) => {
  // 1. Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const err = new Error("Invalid email or password.");
    err.statusCode = 401;
    throw err;
  }

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("Invalid email or password.");
    err.statusCode = 401;
    throw err;
  }

  // 3. Sign JWT
  const token = signToken(user);

  return { user: sanitizeUser(user), token };
};

// ─── Get Me ──────────────────────────────────────────────────────────────────

export const getMe = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      _count: { select: { jobs: true } },
    },
  });

  if (!user) {
    const err = new Error("User not found.");
    err.statusCode = 404;
    throw err;
  }

  return user;
};
