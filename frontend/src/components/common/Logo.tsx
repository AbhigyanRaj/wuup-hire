import React from "react";

export const Logo = ({ className = "w-6 h-auto text-slate-900" }: { className?: string }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="4" width="4.5" height="16" rx="1" fill="currentColor" />
      <rect x="9.75" y="4" width="4.5" height="16" rx="1" fill="currentColor" />
      <rect x="16.5" y="4" width="4.5" height="16" rx="1" fill="currentColor" />
    </svg>
  );
};
