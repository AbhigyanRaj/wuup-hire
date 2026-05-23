import { nanoid } from "nanoid";
import { prisma } from "../../config/prisma.js";

// ─── Generate a short, URL-safe public ID ─────────────────────────────────────
// Format: job_<8 random chars>  e.g. job_8skf93ab
// The internal cuid() DB id is never exposed via the API.
const generatePublicId = () => `job_${nanoid(8)}`;

// ─── Create Job ───────────────────────────────────────────────────────────────
export const createJob = async ({ title, description, screeningQuestions, experienceLevel, techStack, interviewDuration, strictnessLevel, userId }) => {
  const job = await prisma.job.create({
    data: {
      title,
      description,
      screeningQuestions,
      experienceLevel,
      techStack,
      interviewDuration,
      strictnessLevel,
      publicId: generatePublicId(),
      createdById: userId,
    },
  });
  return job;
};

// ─── List Jobs (paginated, current user only) ─────────────────────────────────
export const listJobs = async ({ userId, page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const [jobs, total] = await prisma.$transaction([
    prisma.job.findMany({
      where: { createdById: userId },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        publicId: true,
        title: true,
        description: true,
        screeningQuestions: true,
        experienceLevel: true,
        techStack: true,
        interviewDuration: true,
        strictnessLevel: true,
        bolnaAgentId: true,
        createdById: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { interviews: true } },
      },
    }),
    prisma.job.count({ where: { createdById: userId } }),
  ]);

  return {
    jobs,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

// ─── Get Single Job ───────────────────────────────────────────────────────────
export const getJob = async ({ jobId, userId }) => {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      _count: { select: { interviews: true } },
    },
  });

  if (!job) {
    const err = new Error("Job not found.");
    err.statusCode = 404;
    throw err;
  }

  if (job.createdById !== userId) {
    const err = new Error("You do not have permission to view this job.");
    err.statusCode = 403;
    throw err;
  }

  return job;
};

// ─── Update Job ───────────────────────────────────────────────────────────────
export const updateJob = async ({ jobId, userId, data }) => {
  // Verify ownership first
  await getJob({ jobId, userId });

  const updated = await prisma.job.update({
    where: { id: jobId },
    data,
  });

  return updated;
};

// ─── Delete Job ───────────────────────────────────────────────────────────────
export const deleteJob = async ({ jobId, userId }) => {
  // Verify ownership first
  await getJob({ jobId, userId });

  await prisma.job.delete({ where: { id: jobId } });
};
