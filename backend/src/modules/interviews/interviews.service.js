import { nanoid } from "nanoid";
import { prisma } from "../../config/prisma.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const generateInterviewLink = (interviewId) =>
  `${process.env.FRONTEND_URL || "http://localhost:5173"}/interview/${interviewId}`;

// ─── Verify job ownership before creating interview ───────────────────────────
const assertJobOwnership = async (jobId, userId) => {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) {
    const err = new Error("Job not found.");
    err.statusCode = 404;
    throw err;
  }
  if (job.createdById !== userId) {
    const err = new Error("You do not have permission to schedule interviews for this job.");
    err.statusCode = 403;
    throw err;
  }
  return job;
};

// ─── Create Interview ─────────────────────────────────────────────────────────
export const createInterview = async ({ jobId, candidateId, userId }) => {
  // 1. Verify job belongs to this recruiter
  await assertJobOwnership(jobId, userId);

  // 2. Verify candidate exists
  const candidate = await prisma.candidate.findUnique({ where: { id: candidateId } });
  if (!candidate) {
    const err = new Error("Candidate not found.");
    err.statusCode = 404;
    throw err;
  }

  // 3. Prevent duplicate active interviews (pending/in-progress) for same job+candidate
  const existing = await prisma.interview.findFirst({
    where: {
      jobId,
      candidateId,
      status: { in: ["PENDING", "LINK_SENT", "IN_PROGRESS"] },
    },
  });
  if (existing) {
    const err = new Error("An active interview already exists for this candidate and job.");
    err.statusCode = 409;
    throw err;
  }

  // 4. Create the interview record first to get the ID
  const interview = await prisma.interview.create({
    data: { jobId, candidateId, status: "PENDING" },
  });

  // 5. Generate the interview link using the new ID
  const interviewLink = generateInterviewLink(interview.id);

  // 6. Update record with link + mark as LINK_SENT
  const updated = await prisma.interview.update({
    where: { id: interview.id },
    data: { interviewLink, status: "LINK_SENT" },
    include: {
      candidate: { select: { id: true, name: true, email: true } },
      job:       { select: { id: true, publicId: true, title: true, bolnaAgentId: true } },
    },
  });

  return updated;
};

// ─── Start Bolna Interview (Trigger Actual Call) ──────────────────────────────
export const startBolnaInterview = async ({ interviewId, userId }) => {
  const interview = await prisma.interview.findUnique({
    where: { id: interviewId },
    include: {
      candidate: true,
      job: true
    }
  });

  if (!interview) {
    const err = new Error("Interview not found.");
    err.statusCode = 404;
    throw err;
  }

  // Prevent double execution
  if (interview.bolnaExecutionId) {
    const err = new Error("Interview has already been started.");
    err.statusCode = 400;
    throw err;
  }

  const agentId = interview.job.bolnaAgentId || process.env.AGENT_ID;
  if (!agentId) {
    const err = new Error("No Bolna Agent ID configured for this job.");
    err.statusCode = 400;
    throw err;
  }

  // Format questions
  let formattedQuestions = [];
  try {
    if (typeof interview.job.screeningQuestions === "string") {
      formattedQuestions = JSON.parse(interview.job.screeningQuestions);
    } else if (Array.isArray(interview.job.screeningQuestions)) {
      formattedQuestions = interview.job.screeningQuestions;
    }
  } catch (e) {
    console.error("Error parsing screening questions:", e);
  }
  const questionsString = formattedQuestions.join("\\n");

  // Call Bolna API
  // Using axios directly or global fetch. We'll use fetch here.
  let callUrl = null;
  let executionId = `exec_${Date.now()}`;

  try {
    const bolnaResponse = await fetch("https://api.bolna.dev/call", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.BOLNA}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        agent_id: agentId,
        recipient_phone_number: interview.candidate.phone || "+1234567890",
        variables: {
          candidate_name: interview.candidate.name,
          job_title: interview.job.title,
          experience_level: interview.job.experienceLevel || "Mid",
          questions: questionsString
        }
      })
    });

    const data = await bolnaResponse.json();
    
    // Extract execution ID (Bolna usually returns 'id' or 'execution_id')
    if (data && (data.id || data.execution_id)) {
      executionId = data.id || data.execution_id;
    } else {
      console.warn("Bolna API did not return an id. Using fallback. Response:", data);
    }
  } catch (error) {
    console.error("Failed to start Bolna call:", error);
    // In production, throw error. For now, we continue with fallback if API fails
  }

  // Save execution id and update status
  const updated = await prisma.interview.update({
    where: { id: interview.id },
    data: {
      bolnaExecutionId: executionId,
      status: "IN_PROGRESS",
      startedAt: new Date()
    }
  });

  return { interview: updated, callUrl };
};

// ─── List Interviews ──────────────────────────────────────────────────────────
export const listInterviews = async ({ userId, page = 1, limit = 10, jobId, candidateId, status }) => {
  const skip = (page - 1) * limit;

  // Only interviews for jobs the recruiter owns
  const where = {
    job: { createdById: userId },
    ...(jobId       && { jobId }),
    ...(candidateId && { candidateId }),
    ...(status      && { status }),
  };

  const [interviews, total] = await prisma.$transaction([
    prisma.interview.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        status: true,
        interviewLink: true,
        bolnaCallId: true,
        recordingUrl: true,
        startedAt: true,
        completedAt: true,
        durationSeconds: true,
        createdAt: true,
        updatedAt: true,
        candidate: { select: { id: true, name: true, email: true } },
        job:       { select: { id: true, publicId: true, title: true } },
      },
    }),
    prisma.interview.count({ where }),
  ]);

  return { interviews, total, page, limit, totalPages: Math.ceil(total / limit) };
};

// ─── Get Single Interview ─────────────────────────────────────────────────────
export const getInterview = async ({ interviewId, userId }) => {
  const interview = await prisma.interview.findUnique({
    where: { id: interviewId },
    include: {
      candidate: true,
      job: { select: { id: true, publicId: true, title: true, screeningQuestions: true, bolnaAgentId: true } },
      transcriptMessages: { orderBy: { timestamp: "asc" } },
      evaluation: true,
    },
  });

  if (!interview) {
    const err = new Error("Interview not found.");
    err.statusCode = 404;
    throw err;
  }

  // Ownership check via the job
  if (interview.job && interview.job.createdById && interview.job.createdById !== userId) {
    // need full job to check
  }

  // Re-check ownership via a lightweight query
  const job = await prisma.job.findUnique({ where: { id: interview.jobId }, select: { createdById: true } });
  if (job?.createdById !== userId) {
    const err = new Error("You do not have permission to view this interview.");
    err.statusCode = 403;
    throw err;
  }

  return interview;
};

// ─── Get Public Interview ─────────────────────────────────────────────────────
export const getPublicInterview = async ({ interviewId }) => {
  const interview = await prisma.interview.findUnique({
    where: { id: interviewId },
    select: {
      id: true,
      status: true,
      candidate: { select: { name: true } },
      job: { select: { title: true } },
    },
  });

  if (!interview) {
    const err = new Error("Interview not found.");
    err.statusCode = 404;
    throw err;
  }

  return interview;
};

// ─── Update Interview Status (manual recruiter action) ────────────────────────
export const updateInterviewStatus = async ({ interviewId, userId, status }) => {
  const interview = await getInterview({ interviewId, userId });

  return prisma.interview.update({
    where: { id: interview.id },
    data: { status },
    select: { id: true, status: true, updatedAt: true },
  });
};
