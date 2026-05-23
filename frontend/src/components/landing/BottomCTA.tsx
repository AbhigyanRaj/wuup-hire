import React from "react";
import { ArrowRight } from "lucide-react";

export const BottomCTA = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center flex flex-col items-center shadow-2xl relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-6 relative z-10">
            Ready to hire at lightspeed?
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mb-10 relative z-10">
            Stop spending hundreds of hours screening candidates. Deploy your AI recruiter today and find the top 1% instantly.
          </p>
          
          <a href="/auth" className="relative z-10">
            <button className="h-12 px-8 rounded-full bg-white text-slate-900 text-sm font-medium hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-xl shadow-black/20">
              Get Started for Free <ArrowRight className="w-4 h-4" />
            </button>
          </a>

        </div>
      </div>
    </section>
  );
};
