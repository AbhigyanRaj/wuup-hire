import React, { useState } from "react";
import { Bot, Play, CheckCircle, Loader2 } from "lucide-react";
import { api } from "../lib/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Logo } from "../components/common/Logo";

export const PublicInterviewPage = ({ id }: { id: string }) => {
  const [error, setError] = useState<string | null>(null);

  const { data: interview, isLoading } = useQuery({
    queryKey: ['public-interview', id],
    queryFn: async () => {
      const res = await api.get(`/interviews/public/${id}`);
      return res.data.data.interview;
    },
    // We'll retry false if auth fails
    retry: false
  });

  const [isCalling, setIsCalling] = useState(false);

  const startMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post(`/interviews/public/${id}/start`);
      return res.data.data;
    },
    onSuccess: (data) => {
      if (data.callUrl) {
        window.location.href = data.callUrl;
      } else {
        setIsCalling(true);
      }
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Failed to start interview.");
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <Loader2 className="w-8 h-8 text-[#78d11d] animate-spin" />
      </div>
    );
  }

  const jobTitle = interview?.job?.title || "Your Upcoming Interview";
  const candidateName = interview?.candidate?.name || "Candidate";

  return (
    <div className="min-h-screen flex w-full bg-white font-sans text-slate-900 selection:bg-[#85d800] selection:text-white overflow-hidden">
      
      {/* Left Column (Brand & Info) */}
      <div className="hidden lg:flex w-1/2 bg-white relative flex-col justify-between p-12 border-r border-dashed border-slate-200">
        
        {/* Logo */}
        <div className="relative z-10 flex items-center gap-1.5">
          <Logo className="w-6 h-auto text-slate-900" />
          <span className="text-slate-900 font-bold tracking-tight text-xl">wuup <span className="font-normal text-slate-500 lowercase italic" style={{ fontFamily: 'cursive' }}>hire</span></span>
        </div>

        {/* Info */}
        <div className="relative z-10 max-w-md">
          <div className="w-12 h-12 rounded-sm border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center mb-6 shadow-sm">
            <Bot className="w-6 h-6 text-[#78d11d]" />
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-slate-900 mb-4 leading-tight">
            AI-powered <span className="text-[#78d11d]">Technical Interview</span> Environment
          </h1>
          <p className="text-[15px] text-slate-500 leading-relaxed mb-10">
            You are about to start a conversation with the Wuup Hire AI interviewer. Our voice agents are designed to conduct natural, conversational, and technical evaluations.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-sm border border-dashed border-slate-300 bg-slate-50">
              <CheckCircle className="w-5 h-5 text-[#78d11d] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-slate-900 text-[13px] font-semibold mb-1">Quiet Environment</h3>
                <p className="text-[13px] text-slate-500">Ensure you are in a quiet room with a working microphone and stable internet connection.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-sm border border-dashed border-slate-300 bg-slate-50">
              <CheckCircle className="w-5 h-5 text-[#78d11d] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-slate-900 text-[13px] font-semibold mb-1">Speak Naturally</h3>
                <p className="text-[13px] text-slate-500">The AI will ask you questions. Take your time to think, and speak clearly and naturally.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">
            Powered by Wuup Hire Agentic AI
          </p>
        </div>
      </div>

      {/* Right Column (Interview Modal) */}
      <div className="w-full lg:w-1/2 flex flex-col relative overflow-y-auto bg-slate-50 p-6 md:p-16 lg:p-24 justify-center items-center">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.3] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-1.5">
          <Logo className="w-5 h-auto text-slate-900" />
          <span className="text-slate-900 font-bold tracking-tight text-xl">wuup <span className="font-normal text-slate-500 lowercase italic" style={{ fontFamily: 'cursive' }}>hire</span></span>
        </div>

        <div className="w-full max-w-[400px] bg-white rounded-sm border border-dashed border-slate-300 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
          
          <div className="p-8 pb-6 flex flex-col items-center text-center">
            
            {isCalling ? (
              <div className="flex flex-col items-center w-full">
                <div className="w-20 h-20 bg-slate-900 rounded-sm border border-slate-800 flex items-center justify-center mb-6 shadow-sm relative">
                  <div className="absolute inset-0 border-2 border-[#78d11d] rounded-sm animate-ping opacity-20"></div>
                  <Bot className="w-10 h-10 text-[#78d11d] animate-pulse" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Calling you now...</h2>
                <p className="text-[13px] text-slate-500 mb-2 font-medium">
                  Please answer your phone. The AI is dialing your number right now.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full">
                <div className="w-16 h-16 bg-slate-50 rounded-sm border border-dashed border-slate-200 flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-slate-900 uppercase">
                    {candidateName.charAt(0)}
                  </span>
                </div>
                
                <h2 className="text-[22px] font-bold text-slate-900 mb-2 tracking-tight leading-tight">
                  Welcome, <span className="uppercase text-[#78d11d]">{candidateName}</span>
                </h2>
                <p className="text-[13px] text-slate-500 mb-8 font-medium px-4">
                  You are invited to an AI-powered interview for the <strong className="text-slate-900">{jobTitle}</strong> role.
                </p>

                {error && (
                  <div className="w-full mb-6 p-3 bg-red-50 border border-dashed border-red-200 text-red-600 text-[13px] font-bold tracking-wide rounded-sm text-left">
                    {error}
                  </div>
                )}

                <button
                  onClick={() => startMutation.mutate()}
                  disabled={startMutation.isPending}
                  className="w-full h-12 bg-[#78d11d] hover:bg-[#6ec219] text-slate-900 rounded-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 group"
                >
                  {startMutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current opacity-70 group-hover:opacity-100 transition-opacity" />
                      Start Interview Now
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
          
          <div className="px-8 py-4 bg-slate-50 border-t border-dashed border-slate-200 flex items-center justify-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Ready</span>
          </div>
        </div>

      </div>
    </div>
  );
};
