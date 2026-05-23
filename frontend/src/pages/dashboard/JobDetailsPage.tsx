import React, { useState } from "react";
import { ArrowLeft, Edit, Trash2, Calendar, Users, Target, Clock, ShieldAlert, Loader2 } from "lucide-react";
import { api } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";

export const JobDetailsPage = ({ navigate, id }: { navigate: (p: string) => void, id: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: job, isLoading } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const res = await api.get(`/jobs/${id}`);
      return res.data.data.job;
    },
    enabled: !!id
  });

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this job? All associated interviews will be lost.")) return;
    try {
      setIsDeleting(true);
      await api.delete(`/jobs/${id}`);
      navigate("/dashboard/jobs");
    } catch (err) {
      console.error("Failed to delete job:", err);
      alert("Failed to delete job.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-[#78d11d] animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-slate-500">Job not found.</p>
        <button onClick={() => navigate("/dashboard/jobs")} className="text-blue-600 hover:underline">Go back</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-10 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/dashboard/jobs")}
            className="w-10 h-10 rounded-sm flex items-center justify-center border border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">{job.title}</h1>
              <span className="px-2.5 py-0.5 rounded-sm bg-[#78d11d]/10 text-[#6ec219] border border-[#78d11d]/20 text-[10px] font-bold uppercase tracking-widest">
                Active
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> 
              Created on {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="h-10 px-4 border border-dashed border-rose-300 text-rose-600 hover:bg-rose-50 hover:border-rose-400 text-[13px] font-bold rounded-sm transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            Delete
          </button>
          <button 
            onClick={() => navigate(`/dashboard/jobs/${id}/edit`)}
            className="h-10 px-5 bg-[#78d11d] hover:bg-[#6ec219] text-slate-900 text-[13px] font-bold rounded-sm shadow-sm transition-all flex items-center gap-2"
          >
            <Edit className="w-4 h-4 opacity-70" />
            Edit Job
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-sm border border-dashed border-slate-300 shadow-sm p-8">
            <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest mb-4">Job Description</h3>
            <p className="text-[13px] text-slate-600 leading-relaxed whitespace-pre-wrap">
              {job.description || "No description provided."}
            </p>
          </div>

          <div className="bg-white rounded-sm border border-dashed border-slate-300 shadow-sm p-8">
            <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest mb-4">Screening Questions</h3>
            <div className="space-y-4">
              {job.screeningQuestions?.map((q: any, i: number) => (
                <div key={i} className="flex gap-4 items-start p-4 bg-slate-50 rounded-sm border border-dashed border-slate-300">
                  <div className="w-6 h-6 rounded-sm bg-white border border-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-bold shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-[13px] text-slate-700 mt-0.5">{q.question}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Config */}
        <div className="space-y-6">
          <div className="bg-white rounded-sm border border-dashed border-slate-300 shadow-sm p-6 space-y-6">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Interviews Conducted</span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#78d11d]" />
                <span className="text-xl font-medium text-slate-900">{job._count?.interviews || 0}</span>
              </div>
            </div>
            
            <div className="w-full h-px border-t border-dashed border-slate-200" />
            
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Experience Level</span>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-slate-400" />
                <span className="text-[13px] font-semibold text-slate-900">{job.experienceLevel || "Not specified"}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Interview Duration</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-[13px] font-semibold text-slate-900">{job.interviewDuration || "Not specified"}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Strictness Level</span>
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-slate-400" />
                <span className="text-[13px] font-semibold text-slate-900">{job.strictnessLevel ? `${job.strictnessLevel}% Strict` : "Not specified"}</span>
              </div>
            </div>
            
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Tech Stack</span>
              <div className="flex flex-wrap gap-2">
                {job.techStack ? job.techStack.split(',').map((tech: string, idx: number) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-50 border border-dashed border-slate-300 text-slate-600 text-[11px] font-bold uppercase tracking-widest rounded-sm">
                    {tech.trim()}
                  </span>
                )) : (
                  <span className="text-[13px] text-slate-500">Not specified</span>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
