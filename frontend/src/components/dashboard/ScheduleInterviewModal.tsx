import React, { useState, useEffect } from "react";
import { X, Loader2, Calendar } from "lucide-react";
import { api } from "../../lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const ScheduleInterviewModal = ({ 
  isOpen, 
  onClose, 
  onSuccess 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSuccess: () => void; 
}) => {
  const [selectedJobId, setSelectedJobId] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data: jobs = [], isLoading: isFetchingJobs } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await api.get("/jobs");
      return res.data.data.jobs || [];
    },
    enabled: isOpen
  });

  const { data: candidates = [], isLoading: isFetchingCandidates } = useQuery({
    queryKey: ['candidates'],
    queryFn: async () => {
      const res = await api.get("/candidates");
      return res.data.data.candidates || [];
    },
    enabled: isOpen
  });

  const isFetching = isFetchingJobs || isFetchingCandidates;

  useEffect(() => {
    if (jobs.length > 0 && !selectedJobId) setSelectedJobId(jobs[0].id);
  }, [jobs, selectedJobId]);

  useEffect(() => {
    if (candidates.length > 0 && !selectedCandidateId) setSelectedCandidateId(candidates[0].id);
  }, [candidates, selectedCandidateId]);

  const scheduleMutation = useMutation({
    mutationFn: async () => {
      await api.post("/interviews", {
        jobId: selectedJobId,
        candidateId: selectedCandidateId
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      onSuccess();
      onClose();
    },
    onError: (err: any) => {
      console.error("Failed to schedule interview:", err);
      setError(err.response?.data?.message || "Failed to schedule interview.");
    }
  });

  const handleSchedule = () => {
    if (!selectedJobId || !selectedCandidateId) {
      setError("Please select both a job and a candidate.");
      return;
    }
    setError(null);
    scheduleMutation.mutate();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-sm shadow-xl border border-dashed border-slate-300 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-dashed border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-slate-900 flex items-center justify-center text-[#78d11d]">
              <Calendar className="w-4 h-4 opacity-80" />
            </div>
            <h2 className="text-[13px] font-bold text-slate-900 uppercase tracking-widest">Schedule Interview</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-sm hover:bg-slate-50 flex items-center justify-center text-slate-400 transition-colors border border-transparent hover:border-dashed hover:border-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
              {error}
            </div>
          )}

          {isFetching ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-[#78d11d] animate-spin" />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Select Job Role</label>
                {jobs.length === 0 ? (
                  <div className="text-[13px] text-slate-500 p-3 bg-slate-50 rounded-sm border border-dashed border-slate-300">No active jobs found. Please create one first.</div>
                ) : (
                  <select 
                    value={selectedJobId}
                    onChange={(e) => setSelectedJobId(e.target.value)}
                    className="w-full h-11 px-4 rounded-sm border border-dashed border-slate-300 text-[13px] outline-none focus:border-slate-500 transition-all bg-white"
                  >
                    {jobs.map(j => (
                      <option key={j.id} value={j.id}>{j.title}</option>
                    ))}
                  </select>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Select Candidate</label>
                {candidates.length === 0 ? (
                  <div className="text-[13px] text-slate-500 p-3 bg-slate-50 rounded-sm border border-dashed border-slate-300">No candidates found. Please add one first.</div>
                ) : (
                  <select 
                    value={selectedCandidateId}
                    onChange={(e) => setSelectedCandidateId(e.target.value)}
                    className="w-full h-11 px-4 rounded-sm border border-dashed border-slate-300 text-[13px] outline-none focus:border-slate-500 transition-all bg-white"
                  >
                    {candidates.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                    ))}
                  </select>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-dashed border-slate-200 flex items-center justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2 text-[13px] font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSchedule}
            disabled={scheduleMutation.isPending || isFetching || jobs.length === 0 || candidates.length === 0}
            className="h-10 px-6 bg-[#78d11d] hover:bg-[#6ec219] text-slate-900 text-[13px] font-bold rounded-sm shadow-sm transition-all flex items-center gap-2 disabled:opacity-70"
          >
            {scheduleMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            Schedule
          </button>
        </div>

      </div>
    </div>
  );
};
