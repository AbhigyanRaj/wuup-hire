import React, { useState, useMemo } from "react";
import { Search, Filter, PlayCircle, ExternalLink, CalendarPlus, Loader2 } from "lucide-react";
import { dummyCandidates, getStatusColor } from "../../lib/dummyData";
import { api } from "../../lib/api";
import { ScheduleInterviewModal } from "../../components/dashboard/ScheduleInterviewModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "../../lib/hooks";

export const InterviewsPage = ({ navigate }: { navigate: (p: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  
  const queryClient = useQueryClient();

  const { data: dbInterviews = [], isLoading } = useQuery({
    queryKey: ['interviews'],
    queryFn: async () => {
      const res = await api.get("/interviews");
      return res.data?.data?.interviews || [];
    }
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['interviews'] });
  };

  const filteredInterviews = useMemo(() => {
    const isDemoMode = localStorage.getItem('isDemoMode') === 'true';
    
    // Convert DB interviews to match table format
    const formattedDbInterviews = dbInterviews.map((i: any) => ({
      id: i.id,
      name: i.candidate?.name || "Unknown",
      email: i.candidate?.email || "",
      jobTitle: i.job?.title || "Unknown Role",
      status: i.status || "PENDING",
      appliedAt: i.createdAt,
      score: i.evaluation?.overallScore || null
    }));

    const allInterviews = [...formattedDbInterviews, ...(isDemoMode ? dummyCandidates : [])];

    return allInterviews.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) || 
                            c.jobTitle.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All Status" || c.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [debouncedSearchQuery, statusFilter, dbInterviews]);

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Interviews</h1>
          <p className="text-sm text-slate-500 mt-1">Review AI-conducted interviews, transcripts, and evaluation metrics.</p>
        </div>
        <button 
          onClick={() => setIsScheduleModalOpen(true)}
          className="h-10 px-5 bg-[#78d11d] hover:bg-[#6ec219] text-slate-900 text-[13px] font-bold rounded-sm shadow-sm transition-all flex items-center gap-2 shrink-0"
        >
          <CalendarPlus className="w-4 h-4 opacity-70" />
          Schedule Interview
        </button>
      </div>

      <ScheduleInterviewModal 
        isOpen={isScheduleModalOpen} 
        onClose={() => setIsScheduleModalOpen(false)} 
        onSuccess={handleSuccess} 
      />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-2 rounded-sm border border-dashed border-slate-300 shadow-sm">
        <div className="flex-1 flex items-center gap-3 px-3 w-full">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by candidate name or job title..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 text-sm outline-none bg-transparent placeholder:text-slate-400"
          />
        </div>
        
        <div className="w-full sm:w-px sm:h-6 bg-slate-200 hidden sm:block" />
        
        <div className="flex items-center gap-2 px-3 w-full sm:w-auto shrink-0">
          <Filter className="w-4 h-4 text-slate-400" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="outline-none text-sm text-slate-600 bg-transparent cursor-pointer w-full sm:w-auto"
          >
            <option>All Status</option>
            <option>Completed</option>
            <option>Evaluated</option>
            <option>Pending</option>
            <option>Link_Sent</option>
            <option>In_Progress</option>
            <option>Shortlisted</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {filteredInterviews.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-sm border border-dashed border-slate-200">
          <p className="text-slate-500">No interviews found matching your criteria.</p>
        </div>
      ) : (
        <div className="bg-white rounded-sm border border-dashed border-slate-300 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-dashed border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Candidate</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Job</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Started At</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed divide-slate-200">
                {filteredInterviews.map((c) => (
                  <tr 
                    key={c.id} 
                    onClick={() => navigate(`/dashboard/interviews/${c.id}`)}
                    className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-slate-900 group-hover:text-[#78d11d] transition-colors">{c.name}</span>
                        <span className="text-[11px] text-slate-500">{c.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[13px] font-medium text-slate-700">{c.jobTitle}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[13px] font-medium text-slate-500">
                      {new Date(c.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {c.score ? (
                        <span className="text-[13px] font-bold text-slate-900">{c.score.toFixed(1)} <span className="text-slate-400 font-normal">/ 10</span></span>
                      ) : (
                        <span className="text-[13px] text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="text-slate-400 group-hover:text-[#78d11d] transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
