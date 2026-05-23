import React from "react";
import { motion } from "framer-motion";
import { Check, Mail, Database, Zap, FileText, Send, Calendar, Clock, Cloud, MessageSquare, Briefcase, Key, Star, Share2 } from "lucide-react";

const icons = [Check, Mail, Database, Zap, FileText, Send, Calendar, Clock, Cloud, MessageSquare, Briefcase, Key, Star, Share2];

export const Integrations = () => {
  return (
    <section className="py-32 px-4 bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        
        <span className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase mb-4 block">
          — Integrations —
        </span>
        
        <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6">
          Don't replace. <br /> Integrate.
        </h2>
        
        <p className="text-white/80 max-w-xl mx-auto text-sm leading-relaxed mb-16">
          We understand the hassle of replacing the long-used tools in your process. 
          That's why we integrate tools you use in your day-to-day work.
        </p>

        {/* Floating Icons Grid */}
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl">
          {icons.map((Icon, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <Icon className="w-6 h-6 text-blue-600" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
