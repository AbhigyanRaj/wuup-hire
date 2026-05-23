import React from "react";
import { motion } from "framer-motion";
import { ListChecks, ShieldCheck, PenTool, Users, FolderOpen, Zap } from "lucide-react";

const features = [
  {
    title: "Interview tracking",
    description: "Monitor every interview's status in real time. Get alerts before renewals, deadlines, and key milestones.",
    icon: ListChecks,
    iconBg: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    title: "Compliance & security",
    description: "Enterprise-grade security with audit trails, role-based permissions, and compliance reporting built in.",
    icon: ShieldCheck,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    title: "AI-driven workflows",
    description: "Send, sign and execute contracts from anywhere. Legally binding signatures with full audit records.",
    icon: PenTool,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600"
  },
  {
    title: "Team collaboration",
    description: "Comment, redline, and negotiate contracts together. Assign tasks and track approvals in one workspace.",
    icon: Users,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600"
  },
  {
    title: "Centralized repository",
    description: "Store all interviews in one searchable, organized location. Find any document in seconds with smart filters.",
    icon: FolderOpen,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600"
  },
  {
    title: "AI-powered insights",
    description: "Automatically extract key clauses, flag risks, and summarize obligations with AI-driven analysis.",
    icon: Zap,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  }
];

export const GridFeatures = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase mb-4 block">
            — Why Wuup Hire —
          </span>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-slate-900 mb-6 max-w-lg mx-auto leading-tight">
            Everything your team needs in one place
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-10 h-10 rounded-xl ${feature.iconBg} ${feature.iconColor} flex items-center justify-center mb-6`}>
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-3">
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
