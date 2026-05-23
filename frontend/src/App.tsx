import React, { useEffect, useState } from "react";
import { LandingPage } from "./pages/LandingPage"; 
import { AuthPage } from "./pages/AuthPage";
import { DashboardLayout } from "./components/dashboard/DashboardLayout.tsx";
import { DashboardPage } from "./pages/dashboard/DashboardPage.tsx";
import { JobsPage } from "./pages/dashboard/JobsPage.tsx";
import { CandidatesPage } from "./pages/dashboard/CandidatesPage.tsx";
import { CreateCandidatePage } from "./pages/dashboard/CreateCandidatePage.tsx";
import { CandidateProfilePage } from "./pages/dashboard/CandidateProfilePage.tsx";
import { CreateJobPage } from "./pages/dashboard/CreateJobPage.tsx";
import { JobDetailsPage } from "./pages/dashboard/JobDetailsPage.tsx";
import { InterviewsPage } from "./pages/dashboard/InterviewsPage.tsx";
import { InterviewDetailsPage } from "./pages/dashboard/InterviewDetailsPage.tsx";
import { PublicInterviewPage } from "./pages/PublicInterviewPage.tsx";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    
    // Custom event to handle pushState updates seamlessly
    window.addEventListener("pushstate", handleLocationChange);
    
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("pushstate", handleLocationChange);
    };
  }, []);

  // Utility to navigate programmatically
  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    const navEvent = new PopStateEvent('pushstate');
    window.dispatchEvent(navEvent);
  };

  // ─── Public Routes ───────────────────────────────────────────────────────────
  if (currentPath === "/auth" || currentPath === "/login") {
    return <AuthPage />;
  }

  if (currentPath.startsWith("/interview/")) {
    const id = currentPath.split("/").pop();
    if (id) {
      return <PublicInterviewPage id={id} />;
    }
  }

  if (currentPath === "/") {
    return <LandingPage />;
  }

  // ─── Protected Routes (Dashboard) ──────────────────────────────────────────
  if (currentPath.startsWith("/dashboard")) {
    return (
      <ProtectedRoute navigate={navigate}>
        <DashboardLayout currentPath={currentPath} navigate={navigate}>
          {currentPath === "/dashboard" && <DashboardPage navigate={navigate} />}
          {currentPath === "/dashboard/jobs" && <JobsPage navigate={navigate} />}
          {currentPath === "/dashboard/jobs/create" && <CreateJobPage navigate={navigate} />}
          {currentPath.startsWith("/dashboard/jobs/") && currentPath !== "/dashboard/jobs/create" && !currentPath.endsWith("/edit") && <JobDetailsPage navigate={navigate} id={currentPath.split("/")[3]} />}
          {currentPath.startsWith("/dashboard/jobs/") && currentPath.endsWith("/edit") && <CreateJobPage navigate={navigate} editId={currentPath.split("/")[3]} />}
          {currentPath === "/dashboard/interviews" && <InterviewsPage navigate={navigate} />}
          {currentPath.startsWith("/dashboard/interviews/") && <InterviewDetailsPage navigate={navigate} id={currentPath.split("/").pop()!} />}
          {currentPath === "/dashboard/candidates" && <CandidatesPage navigate={navigate} />}
          {currentPath === "/dashboard/candidates/create" && <CreateCandidatePage navigate={navigate} />}
          {currentPath.startsWith("/dashboard/candidates/") && currentPath !== "/dashboard/candidates/create" && <CandidateProfilePage navigate={navigate} id={currentPath.split("/").pop()!} />}
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  // 404 Fallback
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
        <p className="text-slate-500 mb-8">Page not found.</p>
        <button onClick={() => navigate("/")} className="text-blue-600 hover:underline">Go home</button>
      </div>
    </div>
  );
}

export default App;
