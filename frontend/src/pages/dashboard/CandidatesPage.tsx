import React, { useState, useMemo } from "react";
import { Search, Filter, Download, UserPlus, Loader2 } from "lucide-react";
import { dummyCandidates, getStatusColor } from "../../lib/dummyData";
import { Toast } from "../../components/ui/Toast";
import { api } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../../lib/hooks";

export const CandidatesPage = ({ navigate }: { navigate: (p: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  const { data: dbCandidates = [], isLoading } = useQuery({
    queryKey: ['candidates'],
    queryFn: async () => {
      const res = await api.get("/candidates");
      return res.data?.data?.candidates || [];
    }
  });

  const filteredCandidates = useMemo(() => {
    const isDemo = localStorage.getItem('isDemoMode') === 'true';
    const allCandidates = [
      ...dbCandidates.map((c: any) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        jobTitle: c.interviews?.[0]?.job?.title || "No Active Role",
        status: c.interviews?.[0]?.status || "PENDING",
        score: c.interviews?.[0]?.evaluation?.overallScore || null,
        recommendation: c.interviews?.[0]?.evaluation?.recommendation || "PENDING",
      })),
      ...(isDemo ? dummyCandidates : [])
    ];

    return allCandidates.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) || 
                            c.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                            c.jobTitle.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All Status" || c.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [debouncedSearchQuery, statusFilter, dbCandidates]);

  const handleExport = () => {
    setToast({ message: "Exporting candidates data to CSV...", type: "success" });
  };

  return (
    <div className="space-y-8 pb-10">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Candidates</h1>
          <p className="text-sm text-slate-500 mt-1">Track and manage candidate evaluations across all roles.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="h-10 px-5 bg-white border border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 text-[13px] font-semibold rounded-sm shadow-sm transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button 
            onClick={() => navigate("/dashboard/candidates/create")}
            className="h-10 px-5 bg-[#78d11d] hover:bg-[#6ec219] text-slate-900 text-[13px] font-semibold rounded-sm shadow-sm transition-all flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4 opacity-70" />
            Add Candidate
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-2 rounded-sm border border-dashed border-slate-300 shadow-sm">
        <div className="flex-1 flex items-center gap-3 px-3 w-full">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search candidates by name, email or role..." 
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
            <option>Shortlisted</option>
            <option>Evaluated</option>
            <option>Completed</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      {filteredCandidates.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-sm border border-dashed border-slate-200">
          <p className="text-slate-500">No candidates found matching your criteria.</p>
        </div>
      ) : (
        <div className="bg-white rounded-sm border border-dashed border-slate-300 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-dashed border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Candidate</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Applied Role</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Recommendation</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed divide-slate-200">
                {filteredCandidates.map((c) => (
                  <tr 
                    key={c.id} 
                    onClick={() => navigate(`/dashboard/candidates/${c.id}`)}
                    className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-sm bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] border border-slate-800 tracking-widest">
                          {c.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[13px] font-semibold text-slate-900 group-hover:text-[#78d11d] transition-colors">{c.name}</span>
                          <span className="text-[11px] text-slate-500">{c.email}</span>
                        </div>
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      {c.score ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-bold text-slate-900">{typeof c.score === 'number' ? c.score.toFixed(1) : c.score}</span>
                          <div className="w-16 h-1.5 bg-slate-100 rounded-sm overflow-hidden">
                            <div 
                              className={`h-full rounded-sm ${c.score > 8 ? 'bg-[#78d11d]' : c.score > 6 ? 'bg-amber-500' : 'bg-red-500'}`} 
                              style={{ width: `${(c.score / 10) * 100}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-slate-700">{c.recommendation?.replace('_', ' ')}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/candidates/${c.id}`); }}
                        className="text-[10px] font-bold uppercase tracking-widest text-[#78d11d] opacity-0 group-hover:opacity-100 transition-all hover:text-[#6ec219]"
                      >
                        View Profile
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
