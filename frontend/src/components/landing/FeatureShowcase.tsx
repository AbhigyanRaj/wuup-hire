import React from "react";
import { motion } from "framer-motion";
import { Bot, LineChart, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    icon: <Bot className="w-5 h-5" />,
    title: "Autonomous AI Interviews",
    description: "Deploy an intelligent agent to call candidates, ask dynamic screening questions, and handle follow-ups automatically."
  },
  {
    icon: <LineChart className="w-5 h-5" />,
    title: "Granular Scoring",
    description: "Every transcript is evaluated by advanced LLMs to generate highly structured scorecards spanning communication, technical depth, and confidence."
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Anti-Cheating Detection",
    description: "Real-time analysis detects pauses, filler words, and tab-switching proxies to assign a probability of cheating."
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Instant Setup",
    description: "No complex pipelines. Add a job, add a candidate, and your AI recruiter starts dialing immediately."
  }
];

export const FeatureShowcase = () => {
  return (
    <section className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
            Everything you need to scale hiring.
          </h2>
          <p className="text-lg text-slate-500">
            A single, powerful platform that replaces your ATS, screening team, and calendar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-slate-700 shadow-sm">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Large visual abstract */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 rounded-[2rem] border border-slate-100 bg-slate-50 overflow-hidden relative shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent" />
          <div className="aspect-[21/9] flex items-center justify-center">
             {/* This could be an image or an abstract code block. Let's use an abstract visual */}
             <div className="w-[80%] max-w-4xl bg-white rounded-xl shadow-lg border border-slate-200/60 p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="w-3/4 h-4 bg-slate-100 rounded-full" />
                <div className="w-1/2 h-4 bg-slate-100 rounded-full" />
                <div className="w-5/6 h-4 bg-slate-100 rounded-full" />
                <div className="w-2/3 h-4 bg-slate-100 rounded-full mt-4" />
                <div className="w-1/3 h-4 bg-blue-100 rounded-full" />
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
