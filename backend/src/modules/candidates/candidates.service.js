import { prisma } from "../../config/prisma.js";

// ─── Create Candidate ─────────────────────────────────────────────────────────
export const createCandidate = async ({ name, email, phone, resumeUrl, linkedinUrl }) => {
  const existing = await prisma.candidate.findUnique({ where: { email } });
  if (existing) {
    const err = new Error("A candidate with this email already exists.");
    err.statusCode = 409;
    throw err;
  }

  return prisma.candidate.create({
    data: { name, email, phone, resumeUrl, linkedinUrl },
  });
};

// ─── List Candidates (paginated + search) ─────────────────────────────────────
export const listCandidates = async ({ page = 1, limit = 10, search }) => {
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          { name:  { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const [candidates, total] = await prisma.$transaction([
    prisma.candidate.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        resumeUrl: true,
        linkedinUrl: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { interviews: true } },
      },
    }),
    prisma.candidate.count({ where }),
  ]);

  return { candidates, total, page, limit, totalPages: Math.ceil(total / limit) };
};

// ─── Get Single Candidate ─────────────────────────────────────────────────────
export const getCandidate = async (candidateId) => {
  const candidate = await prisma.candidate.findUnique({
    where: { id: candidateId },
    include: {
      interviews: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          status: true,
          interviewLink: true,
          startedAt: true,
          completedAt: true,
          durationSeconds: true,
          createdAt: true,
          job: { select: { id: true, publicId: true, title: true } },
        },
      },
    },
  });

  if (!candidate) {
    const err = new Error("Candidate not found.");
    err.statusCode = 404;
    throw err;
  }

  return candidate;
};
