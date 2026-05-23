import React, { useState, useMemo } from "react";
import { Plus, Search, MapPin, Clock, Users, ArrowRight, Download, Loader2 } from "lucide-react";
import { dummyJobs } from "../../lib/dummyData";
import { Toast } from "../../components/ui/Toast";
import { api } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../../lib/hooks";

export const JobsPage = ({ navigate }: { navigate: (p: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const { data: dbJobs = [], isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await api.get("/jobs");
      return res.data?.data?.jobs || [];
    }
  });

  const filteredJobs = useMemo(() => {
    const isDemoMode = localStorage.getItem('isDemoMode') === 'true';
    const allJobs = [...dbJobs, ...(isDemoMode ? dummyJobs : [])];

    return allJobs.filter((job) => {
      const matchesSearch = job.title?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) || 
                            job.description?.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      
      const status = job.status || "Active";
      const matchesStatus = statusFilter === "All Status" || status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [debouncedSearchQuery, statusFilter, dbJobs]);

  const handleExport = () => {
    setToast({ message: "Exporting jobs data to CSV...", type: "success" });
  };

  return (
    <div className="space-y-8 pb-10">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Job Postings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your active roles and create new ones.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="h-10 px-4 bg-white border border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 text-[13px] font-semibold rounded-sm shadow-sm transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={() => navigate("/dashboard/jobs/create")}
            className="h-10 px-5 bg-[#78d11d] hover:bg-[#6ec219] text-slate-900 text-[13px] font-semibold rounded-sm shadow-sm transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4 opacity-70" />
            Create New Job
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex items-center gap-4 bg-white p-2 rounded-sm border border-dashed border-slate-300 shadow-sm">
        <div className="flex-1 flex items-center gap-3 px-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search roles..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 text-sm outline-none bg-transparent placeholder:text-slate-400"
          />
        </div>
        <div className="w-px h-6 bg-slate-200 hidden sm:block" />
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="hidden sm:block outline-none text-sm text-slate-600 bg-transparent pr-4 cursor-pointer"
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Closed</option>
        </select>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed">
          <p className="text-slate-500">No jobs found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white rounded-sm border border-dashed border-slate-300 shadow-sm hover:border-slate-400 transition-colors p-6 flex flex-col group cursor-pointer"
              onClick={() => navigate(`/dashboard/jobs/${job.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest border ${!job.status || job.status === 'Active' ? 'bg-[#78d11d]/10 text-[#6ec219] border-[#78d11d]/20' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                  {job.status || "Active"}
                </div>
                <button className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#78d11d]">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{job.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-6 flex-1">
                {job.description}
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-dashed border-slate-200">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Candidates</span>
                  <span className="text-sm font-semibold text-slate-900">{job.candidatesCount || 0}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Interviews</span>
                  <span className="text-sm font-semibold text-slate-900">{job._count?.interviews || job.interviewsCount || 0}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shortlisted</span>
                  <span className="text-sm font-semibold text-[#78d11d]">{job.shortlistedCount || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
