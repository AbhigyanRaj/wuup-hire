import React from "react";
import { Layers, Database, Activity, Code, Server, Smartphone, Cpu, Box } from "lucide-react";
import { motion } from "framer-motion";

const agents = [
  { name: "React Frontend", specs: "UI, State, WebVitals", icon: <Layers className="w-4 h-4 text-slate-500" /> },
  { name: "Node.js Backend", specs: "API, EventLoop", icon: <Database className="w-4 h-4 text-slate-500" /> },
  { name: "Python Data Sci", specs: "Pandas, PyTorch", icon: <Activity className="w-4 h-4 text-slate-500" /> },
  { name: "Go Microservices", specs: "Concurrency, RPC", icon: <Code className="w-4 h-4 text-slate-500" /> },
  { name: "System Design", specs: "Scale, Arch", icon: <Server className="w-4 h-4 text-slate-500" /> },
  { name: "DevOps Engineer", specs: "CI/CD, K8s", icon: <Cpu className="w-4 h-4 text-slate-500" /> },
  { name: "Mobile iOS", specs: "Swift, UIKIt", icon: <Smartphone className="w-4 h-4 text-slate-500" /> },
  { name: "Mobile Android", specs: "Kotlin, Compose", icon: <Box className="w-4 h-4 text-slate-500" /> },
];

export const Features = () => {
  return (
    <section className="w-full border-b border-dashed border-slate-200 bg-[#fafafa]/30 py-12 overflow-hidden relative">
      {/* Horizontal grid lines */}
      <div className="absolute top-10 left-0 w-full border-t border-dashed border-slate-100 -z-10" />
      <div className="absolute bottom-10 left-0 w-full border-t border-dashed border-slate-100 -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-center px-4 mb-10"
      >
        <h2 className="text-[28px] tracking-tight font-medium text-slate-900 mb-3">
          AI Interview Agents, optimized for your pipeline
        </h2>
        <p className="text-[14px] text-slate-500 max-w-xl mx-auto">
          Any technical role across frontend, backend, devops, and system design, evaluated end to end.
        </p>
      </motion.div>

      <div className="relative flex overflow-hidden group">
        <div className="flex space-x-6 whitespace-nowrap animate-marquee px-4">
          {[...agents, ...agents].map((agent, idx) => (
            <div key={idx} className="group flex items-center gap-3 bg-white border border-dashed border-slate-200 px-4 py-2.5 rounded-sm min-w-[200px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:-translate-y-1 hover:shadow-md hover:border-slate-300 transition-all duration-300 cursor-pointer">
              <div className="w-8 h-8 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-sm text-sm group-hover:scale-110 transition-transform duration-300">
                {agent.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{agent.name}</span>
                <span className="text-[10px] text-slate-400 mt-0.5">{agent.specs}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#fafafa] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#fafafa] to-transparent" />
      </div>
    </section>
  );
};
