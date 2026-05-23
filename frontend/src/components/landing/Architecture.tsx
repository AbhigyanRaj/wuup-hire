import React from "react";
import { FileText, Bot, BarChart } from "lucide-react";
import { motion } from "framer-motion";

export const Architecture = () => {
  return (
    <section className="w-full border-b border-dashed border-slate-200 bg-white overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="py-12 text-center px-4 border-b border-dashed border-slate-200"
      >
        <h2 className="text-[28px] tracking-tight font-medium text-slate-900 mb-3">
          We generate the rubric, conduct the interview, ship the scorecard.
        </h2>
        <p className="text-[14px] text-slate-500 max-w-xl mx-auto">
          Transcription, low-latency voice generation, conversational AI, all managed for you.
        </p>
      </motion.div>

      {/* Row 1 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col md:flex-row border-b border-dashed border-slate-200 min-h-[300px]"
      >
        <div className="w-full md:w-1/3 p-10 lg:p-12 flex items-center border-b md:border-b-0 md:border-r border-dashed border-slate-200">
          <h3 className="text-2xl font-medium text-slate-900 leading-[1.2]">
            Upload a <br/> Job Description in plain English.
          </h3>
        </div>
        <div className="w-full md:w-2/3 p-10 lg:p-12 flex items-center justify-center bg-[#fafafa]/50 relative">
          <div className="w-full max-w-lg bg-white border border-dashed border-slate-200 rounded-sm p-5 shadow-sm text-[13px] font-sans text-slate-700 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-4 border-b border-dashed border-slate-100 pb-3">
              <div className="w-5 h-5 bg-blue-600 rounded-sm flex items-center justify-center text-white text-[10px] font-bold">b</div>
              <span className="font-semibold text-slate-900">Wuup Hire Agent</span>
              <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-100 ml-auto">READY</span>
            </div>
            <p className="mb-4">
              I've analyzed the Senior Frontend Developer JD. I've automatically generated an evaluation rubric focusing on:
            </p>
            <ul className="list-disc pl-5 mb-4 text-slate-600 space-y-1.5 marker:text-slate-300">
              <li>React Server Components → <strong className="text-slate-900 font-medium">3 questions</strong></li>
              <li>State Management (Zustand/Redux) → <strong className="text-slate-900 font-medium">2 questions</strong></li>
              <li>System Design (Microfrontends) → <strong className="text-slate-900 font-medium">1 scenario</strong></li>
            </ul>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-dashed border-slate-100">
              <button className="text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2 py-1 rounded-sm hover:bg-slate-100 transition-colors">Approve Rubric</button>
              <button className="text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2 py-1 rounded-sm hover:bg-slate-100 transition-colors">Add custom question</button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Row 2 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col md:flex-row min-h-[300px]"
      >
        <div className="w-full md:w-1/3 p-10 lg:p-12 flex items-center border-b md:border-b-0 md:border-r border-dashed border-slate-200">
          <h3 className="text-2xl font-medium text-slate-900 leading-[1.2]">
            From application to final evaluation in minutes.
          </h3>
        </div>
        <div className="w-full md:w-2/3 p-10 lg:p-12 flex items-center justify-center bg-[#fafafa]/50 overflow-x-auto">
          {/* Node Graph */}
          <div className="flex items-center gap-4 min-w-[500px]">
            {/* Node 1 */}
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white border border-dashed border-slate-200 p-4 rounded-sm shadow-sm flex flex-col items-center min-w-[140px] hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer group">
                <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded-sm mb-2 flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-[12px] font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Candidate Applies</span>
                <span className="text-[10px] text-slate-400 mt-1">Webhook Trigger</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex-1 h-[1px] border-b border-dashed border-slate-300 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-slate-400 rotate-45"></div>
            </div>

            {/* Node 2 */}
            <div className="flex flex-col items-center gap-2 relative">
              <div className="absolute -top-6 text-[9px] font-bold text-[#78d11d] tracking-widest uppercase">Sub-500ms Latency</div>
              <div className="bg-white border border-[#78d11d] p-4 rounded-sm shadow-[0_0_15px_rgba(120,209,29,0.1)] flex flex-col items-center min-w-[160px] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(120,209,29,0.2)] transition-all duration-300 cursor-pointer group">
                <div className="w-8 h-8 bg-[#78d11d]/10 border border-[#78d11d]/20 rounded-sm mb-2 flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                  <Bot className="w-4 h-4 text-[#78d11d]" />
                </div>
                <span className="text-[12px] font-semibold text-slate-900">Wuup Hire Voice Agent</span>
                <span className="text-[10px] text-slate-500 mt-1">Live Interview</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex-1 h-[1px] border-b border-dashed border-slate-300 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-slate-400 rotate-45"></div>
            </div>

            {/* Node 3 */}
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white border border-dashed border-slate-200 p-4 rounded-sm shadow-sm flex flex-col items-center min-w-[140px] hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer group">
                <div className="w-8 h-8 bg-slate-50 border border-slate-200 rounded-sm mb-2 flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                  <BarChart className="w-4 h-4 text-slate-600" />
                </div>
                <span className="text-[12px] font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">AI Scorecard</span>
                <span className="text-[10px] text-slate-400 mt-1">+ Full Transcript</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
