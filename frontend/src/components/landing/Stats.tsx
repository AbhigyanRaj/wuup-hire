import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

// Helper component to animate numbers
const AnimatedNumber = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, value, count]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [rounded]);

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
};

export const Stats = () => {
  return (
    <section className="py-24 bg-white px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Testimonial */}
        <p className="text-2xl md:text-4xl font-medium text-center text-slate-900 leading-snug mb-12 max-w-3xl tracking-tight">
          Wuup Hire is helping our company to decrease operational expenses and turnaround time, while increasing the compliance, resource allocation and effectiveness of our hiring process.
        </p>

        <div className="flex items-center gap-3 mb-24">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-orange-600">DR</div>
            <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-emerald-600">ML</div>
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-slate-900">Darlene Robertson</p>
            <p className="text-[10px] text-slate-400">Head of Strategy at Mailchimp</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="w-full max-w-3xl border border-slate-100 rounded-[2rem] flex flex-col md:flex-row overflow-hidden shadow-sm">
          <div className="flex-1 p-10 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-100 bg-white">
            <p className="text-5xl md:text-6xl font-medium text-slate-900 mb-2 tracking-tighter">
              <AnimatedNumber value={2021} />
            </p>
            <p className="text-[10px] uppercase font-bold tracking-[0.1em] text-slate-400">Wuup Hire Founded</p>
          </div>
          <div className="flex-1 p-10 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-100 bg-white">
            <p className="text-5xl md:text-6xl font-medium text-slate-900 mb-2 tracking-tighter">
              <AnimatedNumber value={50} suffix="K+" />
            </p>
            <p className="text-[10px] uppercase font-bold tracking-[0.1em] text-slate-400">Active Users</p>
          </div>
          <div className="flex-1 p-10 text-center md:text-left bg-white">
            <p className="text-5xl md:text-6xl font-medium text-slate-900 mb-2 tracking-tighter">
              <AnimatedNumber value={1} suffix="k+" />
            </p>
            <p className="text-[10px] uppercase font-bold tracking-[0.1em] text-slate-400">Company Partners</p>
          </div>
        </div>

      </div>
    </section>
  );
};
