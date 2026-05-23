import React, { useState } from "react";
import { ArrowLeft, UserPlus, Loader2 } from "lucide-react";
import { api } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const CreateCandidatePage = ({ navigate }: { navigate: (p: string) => void }) => {
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async (payload: any) => {
      await api.post("/candidates", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      navigate("/dashboard/candidates");
    },
    onError: (err: any) => {
      console.error("Failed to create candidate:", err);
      setError(err.response?.data?.message || "Failed to create candidate.");
    }
  });

  const handleSave = () => {
    if (!name || !email) {
      setError("Name and Email are required.");
      return;
    }

    setError(null);
    
    const payload = {
      name,
      email,
      phone: phone || undefined,
      resumeUrl: resumeUrl || undefined,
      linkedinUrl: linkedinUrl || undefined,
    };

    saveMutation.mutate(payload);
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/dashboard/candidates")}
            className="w-10 h-10 rounded-sm flex items-center justify-center border border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Add New Candidate</h1>
            <p className="text-sm text-slate-500 mt-1">Manually enter candidate details.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/dashboard/candidates")}
            className="px-5 py-2.5 text-[13px] font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="h-10 px-6 bg-[#78d11d] hover:bg-[#6ec219] text-slate-900 text-[13px] font-bold rounded-sm shadow-sm transition-all flex items-center gap-2 disabled:opacity-70"
          >
            {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4 opacity-70" />}
            Save Candidate
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
          {error}
        </div>
      )}

      {/* Main Form */}
      <div className="bg-white rounded-sm border border-dashed border-slate-300 shadow-sm p-8">
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name *</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full h-11 px-4 rounded-sm border border-dashed border-slate-300 text-[13px] outline-none focus:border-slate-500 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address *</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. john@example.com"
                className="w-full h-11 px-4 rounded-sm border border-dashed border-slate-300 text-[13px] outline-none focus:border-slate-500 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +1 234 567 8900"
              className="w-full h-11 px-4 rounded-sm border border-dashed border-slate-300 text-[13px] outline-none focus:border-slate-500 transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">LinkedIn URL</label>
            <input 
              type="url" 
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="e.g. https://linkedin.com/in/johndoe"
              className="w-full h-11 px-4 rounded-sm border border-dashed border-slate-300 text-[13px] outline-none focus:border-slate-500 transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Resume URL</label>
            <input 
              type="url" 
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              placeholder="e.g. https://example.com/resume.pdf"
              className="w-full h-11 px-4 rounded-sm border border-dashed border-slate-300 text-[13px] outline-none focus:border-slate-500 transition-all"
            />
          </div>

        </div>
      </div>
      
    </div>
  );
};
