import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/apiResponse.js";
import { prisma } from "../../config/prisma.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const totalJobs = await prisma.job.count({ where: { createdById: userId } });
  
  // Candidates who have applied to jobs created by this user
  const totalCandidates = await prisma.candidate.count({
    where: {
      interviews: {
        some: {
          job: { createdById: userId }
        }
      }
    }
  });

  const completedInterviews = await prisma.interview.count({
    where: {
      job: { createdById: userId },
      status: { in: ["COMPLETED", "EVALUATED", "SHORTLISTED", "REJECTED"] }
    }
  });

  const shortlistedCandidates = await prisma.interview.count({
    where: {
      job: { createdById: userId },
      status: "SHORTLISTED"
    }
  });

  const recentInterviews = await prisma.interview.findMany({
    where: {
      job: { createdById: userId }
    },
    orderBy: { updatedAt: "desc" },
    take: 4,
    include: {
      candidate: true,
      job: true,
      evaluation: true
    }
  });

  const formattedRecent = recentInterviews.map(inv => ({
    id: inv.id,
    name: inv.candidate.name,
    email: inv.candidate.email,
    jobTitle: inv.job.title,
    status: inv.status,
    score: inv.evaluation?.overallScore || null
  }));

  sendSuccess(res, {
    stats: {
      totalJobs,
      totalCandidates,
      completedInterviews,
      shortlistedCandidates
    },
    recentActivity: formattedRecent
  }, "Dashboard stats fetched successfully.");
});
