import React, { useState, useEffect } from "react";
import { ChevronRight, ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "../common/Logo";

export const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-dashed border-slate-200">
      <div className="flex items-center justify-between h-14 px-4 sm:px-6">
        
        {/* Left: Logo */}
        <a href="/" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
          <div className="flex flex-col items-center">
            <Logo className="w-5 h-auto text-slate-900" />
          </div>
          <span className="font-bold tracking-tight text-xl text-slate-900">wuup <span className="font-normal text-slate-500 lowercase italic" style={{ fontFamily: 'cursive' }}>hire</span></span>
        </a>

        {/* Middle: Links */}
        <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-slate-500">
          <a href="#" className="hover:text-slate-900 hover:text-[#78d11d] transition-colors">Use cases</a>
          <a href="#" className="hover:text-slate-900 hover:text-[#78d11d] transition-colors">Docs</a>
          <a href="#" className="hover:text-slate-900 hover:text-[#78d11d] transition-colors">Contact</a>
        </div>

        {/* Right: CTA */}
        <div className="flex items-center gap-4">
          <a href="/auth" className="hidden sm:flex items-center gap-1 text-[13px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-1.5 rounded-md transition-all">
            Sign in
          </a>
          <a href="/auth" className="flex items-center gap-1 text-[13px] font-semibold text-slate-900 bg-[#78d11d] hover:bg-[#6ec219] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 px-4 py-1.5 rounded-sm shadow-sm group">
            Get started <ChevronRight className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </nav>
  );
};
