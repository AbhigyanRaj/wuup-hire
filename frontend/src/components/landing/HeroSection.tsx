import React from "react";
import { ChevronRight, ArrowUp, Bot, Code, Zap } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="w-full border-b border-dashed border-slate-200 bg-white relative">
      <div className="flex flex-col lg:flex-row min-h-[500px]">
        
        {/* Left Column */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-dashed border-slate-200 relative">
          {/* Faint horizontal dashed line in background */}
          <div className="absolute top-1/4 left-0 w-full border-t border-dashed border-slate-100 -z-10" />
          <div className="absolute top-3/4 left-0 w-full border-t border-dashed border-slate-100 -z-10" />

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl tracking-tight font-medium text-slate-900 leading-[1.1] mb-6"
          >
            Optimize your hiring for{" "}
            <span className="inline-block bg-[#78d11d] px-2 text-slate-900 leading-[1.1] mt-1 -ml-1">production</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-500 text-[15px] leading-relaxed max-w-md mb-8"
          >
            Pick any job role, and Wuup Hire generates a bespoke AI interviewer, optimizes evaluation rubrics, and deploys a production ready voice agent. You hire faster, pay less.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-6"
          >
            <a href="/auth" className="group flex items-center gap-1 text-[13px] font-semibold text-slate-900 bg-[#78d11d] hover:bg-[#6ec219] hover:-translate-y-0.5 transition-all duration-300 px-4 py-2 rounded-sm shadow-sm hover:shadow-md">
              Start building <ChevronRight className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <div className="hidden sm:flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-pointer border-l border-slate-200 pl-6 py-1">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Bolna AI</span>
              <div className="w-4 h-4 bg-[#F0652F] rounded-[1px] flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-[9px] leading-none tracking-tighter">Y</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column (Abstract UI) */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex items-center justify-center relative bg-[#fafafa]/50">
          {/* Faint horizontal dashed lines */}
          <div className="absolute top-1/4 left-0 w-full border-t border-dashed border-slate-100 -z-10" />
          <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-slate-100 -z-10" />
          <div className="absolute top-3/4 left-0 w-full border-t border-dashed border-slate-100 -z-10" />

          {/* Container for UI and Badge */}
          <div className="w-full max-w-md lg:max-w-lg relative">

            {/* Live Voice API Session UI */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full bg-white border border-dashed border-slate-300 rounded-sm p-6 shadow-2xl relative overflow-hidden group"
            >
            {/* Grid overlay for aesthetic */}
            <div className="absolute inset-0 opacity-[0.5] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-dashed border-slate-200 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#78d11d] animate-pulse shadow-[0_0_8px_rgba(120,209,29,0.5)]"></div>
                <span className="text-[10px] font-mono tracking-widest text-slate-900 font-semibold uppercase">Live Interview Stream</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-sm">latency: 184ms</div>
            </div>

            {/* Audio Waveform visualization */}
            <div className="flex items-center gap-[2px] mb-8 h-12 relative z-10 px-2 justify-center">
              {[...Array(60)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: ["15%", "90%", "20%", "100%", "30%"] }}
                  transition={{ duration: 1.2 + Math.random(), repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: Math.random() }}
                  className="w-[2px] bg-[#78d11d] rounded-full opacity-80"
                />
              ))}
            </div>

            {/* Transcript UI */}
            <div className="space-y-4 relative z-10 font-mono text-[11px] leading-relaxed">
              <div className="flex flex-col">
                <span className="text-slate-400 text-[9px] mb-1 font-bold uppercase tracking-widest">System</span>
                <p className="text-slate-600 bg-slate-50 border border-slate-200 px-3 py-2 rounded-sm inline-block w-fit shadow-sm">
                  Evaluating candidate on <span className="text-slate-900 font-bold">Distributed Systems</span>...
                </p>
              </div>
              <div className="flex flex-col items-end pt-2">
                <span className="text-[#6bb51b] text-[9px] mb-1 font-bold uppercase tracking-widest">Wuup Hire Agent</span>
                <p className="text-slate-900 bg-[#78d11d]/10 border border-[#78d11d]/30 px-3 py-2 rounded-sm text-right max-w-[85%] shadow-sm">
                  "How would you handle Redis cache stampedes during a high-traffic spike?"
                </p>
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="flex flex-col pt-4 border-t border-dashed border-slate-200"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-blue-500 text-[9px] font-bold uppercase tracking-widest">Candidate</span>
                  <span className="text-[9px] text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-sm animate-pulse">Listening...</span>
                </div>
                <p className="text-slate-500 italic bg-white border border-dashed border-slate-300 px-3 py-2 rounded-sm max-w-[85%] shadow-sm">
                  "I would implement a probabilistic early expiration strategy to..."
                </p>
              </motion.div>
            </div>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
