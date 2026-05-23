import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, CheckCircle, Star, TrendingUp, TrendingDown, ExternalLink, Loader2 } from "lucide-react";
import { dummyStats, dummyCandidates, getStatusColor } from "../../lib/dummyData";
import { api } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";

export const DashboardPage = ({ navigate }: { navigate: (p: string) => void }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const res = await api.get("/dashboard");
      return res.data.data;
    }
  });

  const isDemo = localStorage.getItem('isDemoMode') === 'true';

  // Compute final stats
  const baseStats = data?.stats || {
    totalJobs: 0,
    totalCandidates: 0,
    completedInterviews: 0,
    shortlistedCandidates: 0,
  };

  const finalStats = {
    totalJobs: baseStats.totalJobs + (isDemo ? dummyStats.totalJobs : 0),
    totalCandidates: baseStats.totalCandidates + (isDemo ? dummyStats.totalCandidates : 0),
    completedInterviews: baseStats.completedInterviews + (isDemo ? dummyStats.completedInterviews : 0),
    shortlistedCandidates: baseStats.shortlistedCandidates + (isDemo ? dummyStats.shortlistedCandidates : 0),
  };

  const recentActivity = [
    ...(data?.recentActivity || []),
    ...(isDemo ? dummyCandidates : [])
  ].slice(0, 4);

  const statsCards = [
    { label: "Total Jobs", value: finalStats.totalJobs, icon: Briefcase, color: "text-slate-900", bg: "bg-slate-100", trend: "+12%", trendUp: true },
    { label: "Total Candidates", value: finalStats.totalCandidates, icon: Users, color: "text-[#78d11d]", bg: "bg-slate-900", trend: "+24%", trendUp: true },
    { label: "Completed Interviews", value: finalStats.completedInterviews, icon: CheckCircle, color: "text-slate-900", bg: "bg-slate-100", trend: "+8%", trendUp: true },
    { label: "Shortlisted", value: finalStats.shortlistedCandidates, icon: Star, color: "text-[#78d11d]", bg: "bg-slate-900", trend: "-2%", trendUp: false },
  ];

  const getInitials = (name: string) => name ? name.split(" ").map(n => n[0]).join("").substring(0, 2) : "??";

  if (isLoading && !data) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Here is what's happening with your hiring pipeline.</p>
        </div>
        <button 
          onClick={() => navigate("/dashboard/jobs/create")}
          className="h-10 px-5 bg-[#78d11d] hover:bg-[#6ec219] text-slate-900 text-[13px] font-semibold rounded-sm shadow-sm transition-all flex items-center gap-2 w-fit"
        >
          <Briefcase className="w-4 h-4 opacity-70" />
          Create New Job
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((s, idx) => (
          <motion.div 
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white p-5 rounded-sm border border-dashed border-slate-300 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-slate-400 transition-colors"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-slate-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
            
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</span>
              <div className={`w-8 h-8 rounded-sm flex items-center justify-center ${s.bg}`}>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
            </div>
            
            <div className="flex items-end justify-between relative z-10">
              <div className="text-3xl font-medium text-slate-900 tracking-tight">{s.value}</div>
              <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm border ${s.trendUp ? 'bg-white border-[#78d11d] text-[#78d11d]' : 'bg-white border-slate-300 text-slate-500'}`}>
                {s.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {s.trend}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Recent Interviews Table (takes 2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Recent Activity</h2>
            <button onClick={() => navigate("/dashboard/candidates")} className="text-[10px] text-slate-500 font-bold hover:text-slate-900 uppercase tracking-widest transition-colors">View all</button>
          </div>
          
          <div className="bg-white rounded-sm border border-dashed border-slate-300 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-dashed border-slate-200 bg-slate-50">
                    <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Candidate</th>
                    <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Job</th>
                    <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dashed divide-slate-200">
                  {recentActivity.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-5 py-8 text-center text-sm text-slate-500">No recent activity yet.</td>
                    </tr>
                  ) : recentActivity.map((c: any) => (
                    <tr 
                      key={c.id} 
                      onClick={() => navigate(`/dashboard/interviews/${c.id}`)}
                      className="hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-sm bg-slate-900 border border-slate-800 flex items-center justify-center text-white font-semibold text-[10px] shrink-0 tracking-widest">
                            {getInitials(c.name)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[13px] font-semibold text-slate-900 group-hover:text-[#78d11d] transition-colors">{c.name}</span>
                            <span className="text-[11px] text-slate-400">{c.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="text-sm text-slate-700 font-medium">{c.jobTitle}</span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(c.status)}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-right">
                        {c.score ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <span className="text-[13px] font-bold text-slate-900">{typeof c.score === 'number' ? c.score.toFixed(1) : c.score}</span>
                            <span className="text-[10px] font-bold text-slate-300">/ 10</span>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-300 font-medium">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Hiring Funnel */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Hiring Funnel</h2>
          </div>
          
          <div className="bg-white rounded-sm border border-dashed border-slate-300 shadow-sm p-6 flex flex-col gap-6">
            <div className="space-y-6">
              
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-[11px] font-semibold tracking-wide">
                  <span className="text-slate-500">Link Sent</span>
                  <span className="text-slate-900">{finalStats.totalCandidates}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-sm overflow-hidden border border-slate-200">
                  <div className="h-full bg-slate-900 rounded-sm" style={{ width: finalStats.totalCandidates > 0 ? '100%' : '0%' }} />
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-[11px] font-semibold tracking-wide">
                  <span className="text-slate-500">Completed</span>
                  <span className="text-slate-900">{finalStats.completedInterviews}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-sm overflow-hidden border border-slate-200">
                  <div className="h-full bg-slate-700 rounded-sm" style={{ width: finalStats.totalCandidates > 0 ? `${(finalStats.completedInterviews / finalStats.totalCandidates) * 100}%` : '0%' }} />
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-[11px] font-semibold tracking-wide">
                  <span className="text-slate-500">Evaluated</span>
                  <span className="text-slate-900">{Math.max(0, finalStats.completedInterviews)}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-sm overflow-hidden border border-slate-200">
                  <div className="h-full bg-slate-500 rounded-sm" style={{ width: finalStats.totalCandidates > 0 ? `${(Math.max(0, finalStats.completedInterviews) / finalStats.totalCandidates) * 100}%` : '0%' }} />
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-[11px] font-semibold tracking-wide">
                  <span className="text-slate-500">Shortlisted</span>
                  <span className="text-[#78d11d] font-bold">{finalStats.shortlistedCandidates}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-sm overflow-hidden border border-slate-200">
                  <div className="h-full bg-[#78d11d] rounded-sm shadow-sm" style={{ width: finalStats.totalCandidates > 0 ? `${(finalStats.shortlistedCandidates / finalStats.totalCandidates) * 100}%` : '0%' }} />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
