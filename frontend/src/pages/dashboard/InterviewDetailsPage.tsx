import React, { useState } from "react";
import { ArrowLeft, Copy, Check, ChevronDown, Bot, User, AlertCircle, FileText, Download, Loader2 } from "lucide-react";
import { api } from "../../lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const InterviewDetailsPage = ({ navigate, id }: { navigate: (p: string) => void, id: string }) => {
  const [copied, setCopied] = useState(false);
  const queryClient = useQueryClient();

  const { data: interview, isLoading } = useQuery({
    queryKey: ['interview', id],
    queryFn: async () => {
      const res = await api.get(`/interviews/${id}`);
      return res.data.data.interview;
    },
    enabled: !!id
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (status: 'SHORTLISTED' | 'REJECTED') => {
      await api.patch(`/interviews/${id}/status`, { status });
      return status;
    },
    onMutate: async (newStatus) => {
      await queryClient.cancelQueries({ queryKey: ['interview', id] });
      const previousInterview = queryClient.getQueryData(['interview', id]);
      
      queryClient.setQueryData(['interview', id], (old: any) => {
        if (!old) return old;
        return { ...old, status: newStatus };
      });
      
      return { previousInterview };
    },
    onError: (err, newStatus, context) => {
      queryClient.setQueryData(['interview', id], context?.previousInterview);
      alert("Failed to update status.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['interview', id] });
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const updateStatus = (status: 'SHORTLISTED' | 'REJECTED') => {
    updateStatusMutation.mutate(status);
  };

  const handleCopyLink = () => {
    if (!interview?.interviewLink) return;
    
    let finalLink = interview.interviewLink;
    try {
      const url = new URL(interview.interviewLink);
      finalLink = `${window.location.origin}${url.pathname}`;
    } catch (e) {
      // Fallback if not a valid URL
    }
    
    navigator.clipboard.writeText(finalLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)] bg-white rounded-sm border border-dashed border-slate-300 shadow-sm">
        <Loader2 className="w-8 h-8 text-[#78d11d] animate-spin" />
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] bg-white rounded-sm border border-dashed border-slate-300 shadow-sm gap-4">
        <p className="text-[13px] font-medium text-slate-500">Interview not found.</p>
        <button onClick={() => navigate("/dashboard/interviews")} className="text-[10px] font-bold uppercase tracking-widest text-[#78d11d] hover:text-[#6ec219]">Go back</button>
      </div>
    );
  }

  const candidate = interview.candidate || { name: "Unknown" };
  const evaluation = interview.evaluation;

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-sm border border-dashed border-slate-300 shadow-sm overflow-hidden">
      
      {/* Top Header */}
      <div className="h-16 shrink-0 border-b border-dashed border-slate-200 bg-white px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/dashboard/interviews")}
            className="w-8 h-8 rounded-sm hover:bg-slate-50 flex items-center justify-center text-slate-500 transition-colors border border-transparent hover:border-dashed hover:border-slate-300"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold text-slate-900">{candidate.name}'s Interview</h1>
              <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-widest ${interview.status === 'SHORTLISTED' ? 'bg-[#78d11d]/10 text-[#6ec219] border border-[#78d11d]/20' : interview.status === 'REJECTED' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}>
                {interview.status}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">{interview.job?.title || "Unknown Role"}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {interview.interviewLink && (
            <button 
              onClick={handleCopyLink}
              className="h-8 px-3 border border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-600 text-[11px] font-bold tracking-widest uppercase rounded-sm shadow-sm transition-all flex items-center gap-2"
            >
              {copied ? <Check className="w-3 h-3 text-[#78d11d]" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy Link"}
            </button>
          )}
          
          <div className="w-px h-4 bg-slate-200" />
          
          <button 
            onClick={() => updateStatus('REJECTED')}
            disabled={updateStatusMutation.isPending}
            className="h-8 px-4 bg-red-50 hover:bg-red-100 border border-dashed border-red-200 text-red-600 text-[11px] font-bold uppercase tracking-widest rounded-sm transition-all disabled:opacity-50"
          >
            Reject
          </button>
          <button 
            onClick={() => updateStatus('SHORTLISTED')}
            disabled={updateStatusMutation.isPending}
            className="h-8 px-4 bg-[#78d11d] hover:bg-[#6ec219] text-slate-900 text-[11px] font-bold uppercase tracking-widest rounded-sm shadow-sm transition-all disabled:opacity-50"
          >
            Shortlist
          </button>
        </div>
      </div>

      {/* Split Pane Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Pane: Transcript Chat UI */}
        <div className="flex-1 flex flex-col bg-white border-r border-dashed border-slate-200 relative">
          <div className="absolute top-0 w-full h-8 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
          
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            {!interview.transcriptMessages || interview.transcriptMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-[13px]">
                <p>No transcript available yet.</p>
              </div>
            ) : (
              interview.transcriptMessages.map((msg: any) => {
                const isAi = msg.speaker === "AI";
                return (
                  <div key={msg.id} className={`flex gap-4 max-w-3xl mx-auto ${isAi ? "" : "flex-row-reverse"}`}>
                    
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-sm flex shrink-0 items-center justify-center ${isAi ? 'bg-[#78d11d] text-slate-900 font-bold' : 'bg-slate-900 text-white border border-slate-800'}`}>
                      {isAi ? <Bot className="w-4 h-4 opacity-80" /> : <User className="w-4 h-4 opacity-80" />}
                    </div>
                    
                    {/* Message Bubble */}
                    <div className={`flex flex-col ${isAi ? "items-start" : "items-end"}`}>
                      <div className="flex items-center gap-2 mb-1 px-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{isAi ? "Wuup Hire AI" : candidate.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      
                      <div className={`px-4 py-3 text-[13px] leading-relaxed ${
                        isAi 
                          ? "bg-white border border-dashed border-slate-300 text-slate-800 rounded-sm shadow-sm" 
                          : "bg-slate-900 text-white rounded-sm border border-slate-800 shadow-sm"
                      }`}>
                        {msg.message}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: AI Evaluation Dashboard */}
        <div className="w-full md:w-[400px] lg:w-[480px] bg-white overflow-y-auto shrink-0 flex flex-col">
          {!evaluation ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 p-8 text-center space-y-4">
              <Bot className="w-12 h-12 text-slate-300" />
              <p>Evaluation is pending or interview has not been completed yet.</p>
            </div>
          ) : (
            <div className="p-6 space-y-8">
              
              {/* Top Stats & Recommendation */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Evaluation Result</h2>
                  <div className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm border ${
                    evaluation.recommendation === 'HIRE' || evaluation.recommendation === 'STRONG_HIRE' ? 'bg-[#78d11d]/10 text-[#6ec219] border-[#78d11d]/20' :
                    evaluation.recommendation === 'NO_HIRE' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-amber-50 text-amber-600 border-amber-200'
                  }`}>
                    {evaluation.recommendation?.replace("_", " ")}
                  </div>
                </div>
                
                <div className="bg-slate-900 rounded-sm border border-slate-800 p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                    <Bot className="w-24 h-24 text-white" />
                  </div>
                  <div className="relative z-10 flex flex-col gap-1">
                    <span className="text-[#78d11d] text-[10px] font-bold uppercase tracking-widest">Overall Score</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold tracking-tight text-white">{evaluation.overallScore ? evaluation.overallScore.toFixed(1) : '-'}</span>
                      <span className="text-[13px] font-bold text-slate-500 uppercase tracking-widest">/ 10</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Performance Metrics</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-sm">
                    <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">Communication</div>
                    <div className="text-xl font-bold text-slate-900">{evaluation.communicationScore ? evaluation.communicationScore.toFixed(1) : '-'}</div>
                  </div>
                  <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-sm">
                    <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">Tech Ability</div>
                    <div className="text-xl font-bold text-slate-900">{evaluation.technicalScore ? evaluation.technicalScore.toFixed(1) : '-'}</div>
                  </div>
                  <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-sm">
                    <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">Confidence</div>
                    <div className="text-xl font-bold text-slate-900">{evaluation.confidenceScore ? evaluation.confidenceScore.toFixed(1) : '-'}</div>
                  </div>
                  <div className="p-4 bg-red-50/50 border border-dashed border-red-200 rounded-sm flex flex-col justify-between">
                    <div className="text-[9px] text-red-600 uppercase font-bold tracking-widest mb-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Cheating Prob.
                    </div>
                    <div className="text-xl font-bold text-red-700">{evaluation.cheatingProbability ? `${(evaluation.cheatingProbability * 100).toFixed(0)}%` : '-'}</div>
                  </div>
                </div>
              </div>

              {/* AI Summary */}
              {evaluation.summary && (
                <div className="space-y-3">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Summary</h3>
                  <div className="p-5 bg-slate-50 border border-dashed border-slate-300 rounded-sm text-[13px] text-slate-700 leading-relaxed">
                    {evaluation.summary}
                  </div>
                </div>
              )}

              {/* Strengths & Weaknesses */}
              <div className="space-y-4">
                {evaluation.strengths && evaluation.strengths.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-[10px] font-bold text-[#6ec219] uppercase tracking-widest">Key Strengths</h3>
                    <ul className="space-y-2">
                      {evaluation.strengths.map((s: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-[13px] font-medium text-slate-700">
                          <div className="w-1 h-4 rounded-sm bg-[#78d11d] shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {evaluation.weaknesses && evaluation.weaknesses.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Areas for Improvement</h3>
                    <ul className="space-y-2">
                      {evaluation.weaknesses.map((s: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-[13px] font-medium text-slate-700">
                          <div className="w-1 h-4 rounded-sm bg-amber-400 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
