import React from "react";
import { ArrowLeft, User, Mail, Phone, Link as LinkIcon, FileText, Calendar, Clock, Loader2, ArrowRight } from "lucide-react";
import { api } from "../../lib/api";
import { getStatusColor } from "../../lib/dummyData";
import { useQuery } from "@tanstack/react-query";

export const CandidateProfilePage = ({ navigate, id }: { navigate: (p: string) => void, id: string }) => {
  const { data: candidate, isLoading } = useQuery({
    queryKey: ['candidate', id],
    queryFn: async () => {
      const res = await api.get(`/candidates/${id}`);
      return res.data.data.candidate;
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-[#78d11d] animate-spin" />
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-slate-500">Candidate not found.</p>
        <button onClick={() => navigate("/dashboard/candidates")} className="text-blue-600 hover:underline">Go back</button>
      </div>
    );
  }

  const getInitials = (name: string) => name ? name.split(" ").map(n => n[0]).join("").substring(0, 2) : "??";

  return (
    <div className="max-w-5xl mx-auto pb-10 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={() => navigate("/dashboard/candidates")}
          className="w-10 h-10 rounded-sm flex items-center justify-center border border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Candidate Profile</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-sm border border-dashed border-slate-300 shadow-sm p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-sm bg-slate-900 text-white flex items-center justify-center font-bold text-3xl border border-slate-800 shadow-md mb-4 tracking-widest">
              {getInitials(candidate.name)}
            </div>
            <h2 className="text-xl font-bold text-slate-900">{candidate.name}</h2>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-1">Candidate</p>
            
            <div className="w-full h-px border-t border-dashed border-slate-200 my-6" />
            
            <div className="w-full flex flex-col gap-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-slate-50 border border-dashed border-slate-300 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-slate-400" />
                </div>
                <span className="text-[13px] font-medium text-slate-700 break-all">{candidate.email}</span>
              </div>
              
              {candidate.phone && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm bg-slate-50 border border-dashed border-slate-300 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-[13px] font-medium text-slate-700">{candidate.phone}</span>
                </div>
              )}
              
              {candidate.linkedinUrl && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm bg-slate-50 border border-dashed border-slate-300 flex items-center justify-center shrink-0">
                    <LinkIcon className="w-4 h-4 text-slate-400" />
                  </div>
                  <a href={candidate.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-[#78d11d] hover:text-[#6ec219] transition-colors truncate">
                    LinkedIn Profile
                  </a>
                </div>
              )}
              
              {candidate.resumeUrl && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm bg-slate-50 border border-dashed border-slate-300 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-slate-400" />
                  </div>
                  <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-[#78d11d] hover:text-[#6ec219] transition-colors truncate">
                    View Resume
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Interviews */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-sm border border-dashed border-slate-300 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-dashed border-slate-200">
              <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Interviews ({candidate.interviews?.length || 0})</h3>
            </div>
            
            {candidate.interviews?.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-[13px]">
                This candidate has no interviews yet.
              </div>
            ) : (
              <div className="divide-y divide-dashed divide-slate-200">
                {candidate.interviews?.map((inv: any) => (
                  <div 
                    key={inv.id} 
                    onClick={() => navigate(`/dashboard/interviews/${inv.id}`)}
                    className="p-6 hover:bg-slate-50 transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-slate-900 group-hover:text-[#78d11d] transition-colors">{inv.job?.title}</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(inv.status)}`}>
                          {inv.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-[11px] font-medium text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(inv.createdAt).toLocaleDateString()}
                        </div>
                        {inv.durationSeconds && (
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {Math.round(inv.durationSeconds / 60)} mins
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <button className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#78d11d] opacity-0 group-hover:opacity-100 transition-all hover:text-[#6ec219]">
                      View Details <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
