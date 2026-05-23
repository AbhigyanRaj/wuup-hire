import React from "react";
import { ChevronRight, Check } from "lucide-react";
import { motion } from "framer-motion";

export const FooterCTA = () => {
  return (
    <section className="w-full border-b border-dashed border-slate-200 bg-white relative overflow-hidden">
      
      {/* Faded Background Pattern (Simulating the server rack dot matrix) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="py-32 flex flex-col items-center justify-center text-center px-4 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-medium text-slate-900 mb-8 max-w-3xl">
          Deploy your first AI Interviewer <br/> in under 5 minutes
        </h2>
        
        <a href="/auth" className="flex items-center gap-1 text-[13px] font-semibold text-slate-900 bg-[#78d11d] hover:bg-[#6ec219] transition-colors px-6 py-3 rounded-sm shadow-sm">
          Start Building for Free <ChevronRight className="w-3 h-3 opacity-70" />
        </a>
      </motion.div>

      {/* Trust badges footer row */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-dashed border-slate-200 bg-white relative z-10">
        <div className="flex items-center justify-center gap-2 py-4 border-b md:border-b-0 border-r border-dashed border-slate-200 text-[11px] font-medium text-slate-500 uppercase tracking-wide">
          <Check className="w-3.5 h-3.5 text-[#78d11d]" /> Bias Mitigation
        </div>
        <div className="flex items-center justify-center gap-2 py-4 border-b md:border-b-0 md:border-r border-dashed border-slate-200 text-[11px] font-medium text-slate-500 uppercase tracking-wide">
          <Check className="w-3.5 h-3.5 text-[#78d11d]" /> Anti-cheat detection
        </div>
        <div className="flex items-center justify-center gap-2 py-4 border-r border-dashed border-slate-200 text-[11px] font-medium text-slate-500 uppercase tracking-wide">
          <Check className="w-3.5 h-3.5 text-[#78d11d]" /> GDPR Compliant
        </div>
        <div className="flex items-center justify-center gap-2 py-4 text-[11px] font-medium text-slate-500 uppercase tracking-wide">
          <Check className="w-3.5 h-3.5 text-[#78d11d]" /> SOC 2 Type II
        </div>
      </div>

    </section>
  );
};
