import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export const BentoFeatures = () => {
  return (
    <section id="features" className="py-24 bg-white px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <div className="grid lg:grid-cols-2 gap-6 w-full">
          
          {/* Large Left Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="rounded-[2rem] border border-slate-100 bg-white shadow-sm p-8 md:p-10 flex flex-col justify-between h-[600px] overflow-hidden group"
          >
            <div>
              <h3 className="text-2xl font-medium text-slate-900 mb-3">Dynamic dashboard</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-6">
                Sigma helps legal teams work faster, smarter and more efficiently, delivering the visibility and data-driven insights to mitigate risk and ensure compliance.
              </p>
              <Button className="bg-slate-900 text-white hover:bg-slate-800 text-xs px-6 py-1.5 h-auto">
                Explore all
              </Button>
            </div>
            
            {/* Populated Dashboard Mockup */}
            <div className="mt-12 flex-1 rounded-2xl bg-slate-50 border border-slate-100 relative shadow-inner overflow-hidden flex flex-col">
              <div className="flex-1 p-6 flex items-end justify-between gap-2 opacity-80">
                {[40, 60, 100, 30, 80, 20, 50, 90, 70].map((h, i) => (
                  <div key={i} className="w-full bg-blue-100 rounded-t-sm flex items-end" style={{ height: `${h}%` }}>
                    <div className="w-full bg-blue-600 rounded-t-sm" style={{ height: `${h * 0.7}%` }} />
                  </div>
                ))}
              </div>
              <div className="h-16 border-t border-slate-200/60 flex items-center justify-between px-6 bg-white/50 backdrop-blur-sm">
                <div className="flex flex-col gap-1">
                  <div className="w-8 h-2 bg-slate-200 rounded-full" />
                  <div className="w-12 h-3 bg-slate-300 rounded-full" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-8 h-2 bg-slate-200 rounded-full" />
                  <div className="w-12 h-3 bg-slate-300 rounded-full" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-8 h-2 bg-slate-200 rounded-full" />
                  <div className="w-12 h-3 bg-slate-300 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Stacked Cards */}
          <div className="flex flex-col gap-6">
            
            {/* Top Right Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
              className="rounded-[2rem] border border-slate-100 bg-white shadow-sm p-8 md:p-10 flex-1 flex flex-col justify-center"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-medium text-slate-900 mb-3">Smart notifications</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                  Easily accessible from the notifications center, calendar or email with the relevant activities.
                </p>
              </div>
              
              <div className="space-y-4">
                {["Email notification", "New messages, comment, or replies", "Social emails"].map((item, i) => (
                  <div key={item} className="flex items-center justify-between pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                    <span className="text-sm text-slate-600">{item}</span>
                    <div className={`w-10 h-6 rounded-full flex items-center p-1 ${i < 2 ? 'bg-blue-600 justify-end' : 'bg-slate-200 justify-start'}`}>
                      <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Right Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2 }}
              className="rounded-[2rem] border border-slate-100 bg-white shadow-sm p-8 md:p-10 flex-[0.7] flex flex-col justify-center"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-medium text-slate-900 mb-3">Task management</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                  Discuss contract queries, manage tasks, secure approvals, track progress in the workspace.
                </p>
              </div>
              
              <div className="flex items-start gap-3 mt-auto">
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center text-xs font-semibold shrink-0">AS</div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Ali Sanders</p>
                  <p className="text-xs text-slate-400 mt-1">Hello @Paige Dillon. Could you sign the contract...</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};
