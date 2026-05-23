const isDemoMode = localStorage.getItem('isDemoMode') === 'true';

export const dummyStats = isDemoMode ? {
  totalJobs: 12,
  totalCandidates: 84,
  completedInterviews: 62,
  shortlistedCandidates: 15,
} : {
  totalJobs: 0,
  totalCandidates: 0,
  completedInterviews: 0,
  shortlistedCandidates: 0,
};

export const dummyJobs = isDemoMode ? [
  {
    id: "job_1",
    title: "Senior Full Stack Engineer",
    description: "Looking for an experienced engineer to lead our product development. Must have deep knowledge of React and Node.js.",
    status: "Active",
    candidatesCount: 24,
    interviewsCount: 18,
    avgScore: 8.2,
    shortlistedCount: 4,
    createdAt: "2026-05-10T10:00:00Z"
  },
  {
    id: "job_2",
    title: "Product Designer",
    description: "Seeking a designer with strong UI/UX skills and a portfolio showcasing clean, minimal, and premium aesthetics.",
    status: "Active",
    candidatesCount: 45,
    interviewsCount: 32,
    avgScore: 7.9,
    shortlistedCount: 8,
    createdAt: "2026-05-12T14:30:00Z"
  },
  {
    id: "job_3",
    title: "Backend Go Developer",
    description: "Build robust, highly concurrent systems using Go and gRPC.",
    status: "Closed",
    candidatesCount: 15,
    interviewsCount: 12,
    avgScore: 8.8,
    shortlistedCount: 3,
    createdAt: "2026-04-20T09:15:00Z"
  }
] : [];

export const dummyCandidates = isDemoMode ? [
  {
    id: "cand_1",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.in",
    jobId: "job_1",
    jobTitle: "Senior Full Stack Engineer",
    status: "EVALUATED",
    score: 9.1,
    recommendation: "STRONG_HIRE",
    appliedAt: "2026-05-20T08:00:00Z"
  },
  {
    id: "cand_2",
    name: "Priya Patel",
    email: "priya.patel@example.in",
    jobId: "job_2",
    jobTitle: "Product Designer",
    status: "SHORTLISTED",
    score: 8.8,
    recommendation: "HIRE",
    appliedAt: "2026-05-21T11:20:00Z"
  },
  {
    id: "cand_3",
    name: "Arjun Reddy",
    email: "arjun.reddy@example.in",
    jobId: "job_1",
    jobTitle: "Senior Full Stack Engineer",
    status: "COMPLETED",
    score: null,
    recommendation: "PENDING",
    appliedAt: "2026-05-22T09:45:00Z"
  },
  {
    id: "cand_4",
    name: "Neha Gupta",
    email: "neha.g@example.in",
    jobId: "job_3",
    jobTitle: "Backend Go Developer",
    status: "REJECTED",
    score: 5.4,
    recommendation: "REJECT",
    appliedAt: "2026-05-15T16:30:00Z"
  }
] : [];

export const getStatusColor = (status: string) => {
  switch (status) {
    case "SHORTLISTED": return "bg-green-100 text-green-700";
    case "EVALUATED": return "bg-blue-100 text-blue-700";
    case "COMPLETED": return "bg-yellow-100 text-yellow-700";
    case "REJECTED": return "bg-red-100 text-red-700";
    case "Active": return "bg-green-100 text-green-700 border-green-200";
    case "Closed": return "bg-slate-100 text-slate-700 border-slate-200";
    default: return "bg-slate-100 text-slate-600";
  }
};
