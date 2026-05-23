import React from "react";
import { motion } from "framer-motion";
import { Mic, Zap, FileJson } from "lucide-react";

const features = [
  {
    title: "Voice AI Agent",
    description: "Conducts conversational, human-like interviews. Dynamically probes deeper based on candidate responses.",
    icon: Mic,
  },
  {
    title: "Real-time Webhooks",
    description: "Receive exact transcripts and evaluations instantly the moment an interview finishes.",
    icon: Zap,
  },
  {
    title: "Structured JSON Evaluation",
    description: "No more reading dense notes. Get standardized scores for communication, technical depth, and confidence.",
    icon: FileJson,
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
            Everything you need to scale hiring
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            A complete pipeline from generating a job link to receiving the final structured recommendation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center mb-6">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
