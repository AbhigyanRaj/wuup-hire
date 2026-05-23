import React from "react";

const logos = [
  "Y Combinator", "OpenAI", "TechStars", "A16z", "Google Cloud", "AWS Startups"
];

export const LogoTicker = () => {
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="w-full bg-white border-b border-dashed border-slate-200 py-8 relative overflow-hidden flex flex-col items-center">
      <div className="text-center mb-6">
        <p className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase">
          Trusted by innovative teams worldwide
        </p>
      </div>

      <div className="relative flex overflow-hidden w-full">
        <div className="flex animate-marquee items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500 w-max">
          {/* First Half */}
          <div className="flex gap-16 px-8">
            {repeatedLogos.map((logo, idx) => (
              <span key={`1-${idx}`} className="text-lg font-bold text-slate-800 tracking-tight whitespace-nowrap">
                {logo}
              </span>
            ))}
          </div>
          {/* Second Half (Exact Duplicate) */}
          <div className="flex gap-16 px-8">
            {repeatedLogos.map((logo, idx) => (
              <span key={`2-${idx}`} className="text-lg font-bold text-slate-800 tracking-tight whitespace-nowrap">
                {logo}
              </span>
            ))}
          </div>
        </div>
        
        {/* Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </div>
  );
};
