import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, Plus, Loader2, Trash2 } from "lucide-react";
import { api } from "../../lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const CreateJobPage = ({ navigate, editId }: { navigate: (p: string) => void, editId?: string }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Entry Level (0-2 yrs)");
  const [techStack, setTechStack] = useState("");
  const [questions, setQuestions] = useState([
    "Tell me about a challenging technical problem you solved.",
    "How do you handle disagreements within a team?"
  ]);
  const [duration, setDuration] = useState("15 Minutes");
  const [strictness, setStrictness] = useState(50);
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data: jobData, isLoading: isFetching } = useQuery({
    queryKey: ['job', editId],
    queryFn: async () => {
      const res = await api.get(`/jobs/${editId}`);
      return res.data.data.job;
    },
    enabled: !!editId
  });

  useEffect(() => {
    if (jobData) {
      setTitle(jobData.title || "");
      setDescription(jobData.description || "");
      setExperienceLevel(jobData.experienceLevel || "Entry Level (0-2 yrs)");
      setTechStack(jobData.techStack || "");
      setDuration(jobData.interviewDuration || "15 Minutes");
      setStrictness(jobData.strictnessLevel ? parseInt(jobData.strictnessLevel) : 50);
      if (jobData.screeningQuestions && jobData.screeningQuestions.length > 0) {
        setQuestions(jobData.screeningQuestions.map((q: any) => q.question));
      }
    }
  }, [jobData]);

  const saveMutation = useMutation({
    mutationFn: async (payload: any) => {
      if (editId) {
        return api.patch(`/jobs/${editId}`, payload);
      } else {
        return api.post("/jobs", payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      navigate("/dashboard/jobs");
    },
    onError: (err: any) => {
      console.error("Failed to save job", err);
      setError("An error occurred while saving the job.");
    }
  });

  const handleSave = () => {
    setError(null);

    const validQuestions = questions.filter(q => q.trim().length >= 5);
    if (validQuestions.length === 0) {
      setError("Please add at least one valid screening question.");
      return;
    }

    if (!title || !description) {
      setError("Title and Description are required.");
      return;
    }

    const payload = {
      title,
      description: description.trim(),
      screeningQuestions: validQuestions.map(q => ({ question: q, type: "open" })),
      experienceLevel,
      techStack,
      interviewDuration: duration,
      strictnessLevel: strictness.toString()
    };

    saveMutation.mutate(payload);
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#78d11d]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-10">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/dashboard/jobs")}
            className="w-10 h-10 rounded-sm border border-dashed border-slate-300 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Create New Role</h1>
            <p className="text-sm text-slate-500 mt-1">Configure the job and AI interviewer agent.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/dashboard/jobs")} className="h-10 px-5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="h-10 px-5 bg-[#78d11d] hover:bg-[#6ec219] text-slate-900 text-[13px] font-semibold rounded-sm shadow-sm transition-all flex items-center gap-2 disabled:opacity-70"
          >
            {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 opacity-70" />}
            {saveMutation.isPending ? "Saving..." : "Save & Publish"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Form Area */}
        <div className="md:col-span-2 space-y-6">
          
          <div className="bg-white rounded-sm border border-dashed border-slate-300 shadow-sm p-6 md:p-8 space-y-6">
            <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest mb-4">Job Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Job Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer" 
                  className="w-full h-11 px-4 bg-slate-50 border border-dashed border-slate-300 rounded-sm text-[13px] outline-none focus:border-slate-500 focus:bg-white transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the role, responsibilities, and requirements..." 
                  className="w-full h-32 p-4 bg-slate-50 border border-dashed border-slate-300 rounded-sm text-[13px] outline-none focus:border-slate-500 focus:bg-white transition-all placeholder:text-slate-400 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-sm border border-dashed border-slate-300 shadow-sm p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Screening Questions</h2>
              <button 
                onClick={() => setQuestions([...questions, ""])}
                className="text-[10px] font-bold text-[#78d11d] uppercase tracking-widest flex items-center gap-1 hover:text-[#6ec219] transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Question
              </button>
            </div>
            
            <div className="space-y-3">
              {questions.map((q, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-sm border border-dashed border-slate-300">
                  <span className="w-6 h-6 shrink-0 rounded-sm bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">{i + 1}</span>
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => {
                      const newQ = [...questions];
                      newQ[i] = e.target.value;
                      setQuestions(newQ);
                    }}
                    className="flex-1 bg-transparent text-[13px] text-slate-700 outline-none"
                    placeholder="Enter question..."
                  />
                  <button 
                    onClick={() => setQuestions(questions.filter((_, idx) => idx !== i))}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Config */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-sm border border-dashed border-slate-300 shadow-sm p-6 space-y-6">
            <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Requirements</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Experience Level</label>
                <select 
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-50 border border-dashed border-slate-300 rounded-sm text-[13px] outline-none focus:border-slate-500 transition-all text-slate-700"
                >
                  <option>Entry Level (0-2 yrs)</option>
                  <option>Mid Level (3-5 yrs)</option>
                  <option>Senior (5+ yrs)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Tech Stack</label>
                <input 
                  type="text" 
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  placeholder="React, Node, TypeScript..." 
                  className="w-full h-10 px-3 bg-slate-50 border border-dashed border-slate-300 rounded-sm text-[13px] outline-none focus:border-slate-500 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-sm shadow-md p-6 text-white border border-slate-800">
            <h2 className="text-[11px] font-bold text-[#78d11d] uppercase tracking-widest mb-2">Wuup Hire Agent Config</h2>
            <p className="text-[11px] text-slate-400 mb-6 leading-relaxed">
              The AI interviewer will use these settings to conduct the technical and behavioral screening.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Interview Duration</label>
                <select 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-800 border border-dashed border-slate-700 rounded-sm text-[13px] outline-none focus:border-slate-500 transition-all text-slate-200 [&>option]:text-slate-900"
                >
                  <option>15 Minutes</option>
                  <option>30 Minutes</option>
                  <option>45 Minutes</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Strictness Level</label>
                <input 
                  type="range" 
                  value={strictness}
                  onChange={(e) => setStrictness(e.target.value)}
                  className="w-full accent-[#78d11d]" 
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
                  <span>Lenient</span>
                  <span>Strict</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
