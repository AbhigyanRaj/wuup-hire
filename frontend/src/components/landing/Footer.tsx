import React from "react";
import { ChevronRight } from "lucide-react";
import { Logo } from "../common/Logo";

export const Footer = () => {
  return (
    <footer className="w-full bg-white relative">
      
      {/* Top Footer area */}
      <div className="flex flex-col md:flex-row justify-between p-8 md:p-12 lg:p-16 border-b border-dashed border-slate-200">
        
        {/* Left Side */}
        <div className="max-w-xs mb-12 md:mb-0">
          <div className="flex items-center gap-1.5 mb-6 hover:opacity-80 transition-opacity cursor-pointer">
            <Logo className="w-5 h-auto text-slate-900" />
            <span className="font-bold tracking-tight text-xl text-slate-900">wuup <span className="font-normal text-slate-500 lowercase italic" style={{ fontFamily: 'cursive' }}>hire</span></span>
          </div>
          <p className="text-[12px] text-slate-500 leading-relaxed mb-4">
            Own your hiring pipeline. We generate the rubrics, conduct the interviews, and ship actionable scorecards as production APIs.
          </p>
          {/* YC Tag */}
          <div className="inline-flex items-center gap-2 mb-6 cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">By Bolna AI</span>
            <div className="w-4 h-4 bg-[#F0652F] rounded-[1px] flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-[9px] leading-none tracking-tighter">Y</span>
            </div>
          </div>
          <div>
            <a href="/auth" className="group inline-flex items-center gap-1 text-[13px] font-semibold text-slate-900 bg-[#78d11d] hover:bg-[#6ec219] hover:-translate-y-0.5 transition-all duration-300 px-4 py-2 rounded-sm shadow-sm hover:shadow-md">
              Start building <ChevronRight className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Side Links & Badges */}
        <div className="flex flex-col md:items-end justify-between">
          <div className="flex gap-6 text-[13px] font-medium text-slate-600 mb-12">
            <a href="#" className="hover:text-slate-900 transition-colors">Pipeline Builder</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Docs</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Research</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-sm flex flex-col justify-center min-w-[120px] hover:-translate-y-0.5 hover:shadow-sm transition-all cursor-pointer">
              <span className="text-[9px] font-medium text-slate-400 uppercase tracking-widest mb-1">AICPA Type II</span>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 text-white flex items-center justify-center rounded-sm">
                  <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <span className="text-[11px] font-semibold text-slate-900 tracking-tight">SOC 2</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal / Status bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between p-4 px-8 text-[11px] text-slate-400">
        <div className="mb-4 lg:mb-0">
          © {new Date().getFullYear()} Wuup Hire. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 border border-dashed border-slate-300 px-2 py-1 rounded-sm hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="w-1.5 h-1.5 bg-[#78d11d] rounded-full animate-pulse"></div>
            <span className="text-slate-500">All systems operational</span>
          </div>

          <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Cookies</a>
          <a href="#" className="hover:text-slate-900 transition-colors">AUP</a>
          <a href="#" className="hover:text-slate-900 transition-colors">DPA</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Security</a>
        </div>
      </div>

    </footer>
  );
};
