import React from "react";
import { Check } from "lucide-react";

export const Pricing = () => {
  return (
    <section className="w-full border-b border-dashed border-slate-200 bg-white">
      <div className="py-20 text-center px-4 border-b border-dashed border-slate-200">
        <h2 className="text-[28px] tracking-tight font-medium text-slate-900 mb-3">
          Simple, transparent pricing
        </h2>
        <p className="text-[14px] text-slate-500 max-w-xl mx-auto mb-8">
          Start free and scale as you hire. Only pay for the interview minutes you use.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center p-1 bg-slate-50 border border-dashed border-slate-200 rounded-sm mx-auto">
          <button className="px-6 py-1.5 text-[12px] font-semibold bg-[#78d11d] text-slate-900 rounded-sm shadow-sm">Monthly</button>
          <button className="px-6 py-1.5 text-[12px] font-medium text-slate-500 hover:text-slate-900">
            Yearly <span className="text-[9px] font-bold text-[#78d11d] bg-[#78d11d]/10 px-1 py-0.5 ml-1 rounded">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Starter */}
        <div className="p-8 border-b lg:border-b-0 lg:border-r border-dashed border-slate-200 flex flex-col">
          <h3 className="text-[16px] font-medium text-slate-900 mb-2">Starter</h3>
          <p className="text-[12px] text-slate-500 mb-6 h-8">Build and test AI interviewers, no deployment.</p>
          <div className="text-[32px] font-medium text-slate-900 tracking-tight mb-1">
            $0 <span className="text-[12px] text-slate-400 font-normal tracking-normal">/ month</span>
          </div>
          <button className="w-full mt-6 mb-8 py-2 text-[13px] font-medium text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-sm transition-colors">
            Get started free {'>'}
          </button>
          <ul className="space-y-4 text-[12px] text-slate-600">
            <li className="flex items-start gap-3"><Check className="w-3.5 h-3.5 text-slate-300 mt-0.5 shrink-0" /> Chat-driven JD builder</li>
            <li className="flex items-start gap-3"><Check className="w-3.5 h-3.5 text-slate-300 mt-0.5 shrink-0" /> 3 test interviews / month</li>
            <li className="flex items-start gap-3"><Check className="w-3.5 h-3.5 text-slate-300 mt-0.5 shrink-0" /> Basic AI scorecards</li>
          </ul>
        </div>

        {/* Pro */}
        <div className="p-8 border-b lg:border-b-0 lg:border-r border-dashed border-slate-200 flex flex-col bg-[#fafafa]/50 relative">
          <div className="absolute top-0 left-0 w-full border-t-[3px] border-[#78d11d]"></div>
          <h3 className="text-[16px] font-medium text-slate-900 mb-2">Pro</h3>
          <p className="text-[12px] text-slate-500 mb-6 h-8">For solo recruiters running live interviews.</p>
          <div className="text-[32px] font-medium text-slate-900 tracking-tight mb-1">
            $49 <span className="text-[12px] text-slate-400 font-normal tracking-normal">/ month</span>
          </div>
          <button className="w-full mt-6 mb-8 py-2 text-[13px] font-semibold text-slate-900 bg-[#78d11d] hover:bg-[#6ec219] rounded-sm transition-colors shadow-sm">
            Get Pro {'>'}
          </button>
          <ul className="space-y-4 text-[12px] text-slate-600">
            <li className="flex items-start gap-3"><Check className="w-3.5 h-3.5 text-slate-900 mt-0.5 shrink-0" /> 50 hours of interview time</li>
            <li className="flex items-start gap-3"><Check className="w-3.5 h-3.5 text-slate-900 mt-0.5 shrink-0" /> Custom voice personas</li>
            <li className="flex items-start gap-3"><Check className="w-3.5 h-3.5 text-slate-900 mt-0.5 shrink-0" /> Shareable interview links</li>
            <li className="flex items-start gap-3"><Check className="w-3.5 h-3.5 text-slate-900 mt-0.5 shrink-0" /> Slack integration</li>
          </ul>
        </div>

        {/* Scale */}
        <div className="p-8 border-b md:border-b-0 md:border-r border-dashed border-slate-200 flex flex-col">
          <h3 className="text-[16px] font-medium text-slate-900 mb-2">Scale</h3>
          <p className="text-[12px] text-slate-500 mb-6 h-8">For high-volume hiring teams.</p>
          <div className="text-[32px] font-medium text-slate-900 tracking-tight mb-1">
            $249 <span className="text-[12px] text-slate-400 font-normal tracking-normal">/ month</span>
          </div>
          <button className="w-full mt-6 mb-8 py-2 text-[13px] font-medium text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-sm transition-colors">
            Get Scale {'>'}
          </button>
          <ul className="space-y-4 text-[12px] text-slate-600">
            <li className="flex items-start gap-3"><Check className="w-3.5 h-3.5 text-slate-300 mt-0.5 shrink-0" /> 300 hours of interview time</li>
            <li className="flex items-start gap-3"><Check className="w-3.5 h-3.5 text-slate-300 mt-0.5 shrink-0" /> Anti-cheating monitoring</li>
            <li className="flex items-start gap-3"><Check className="w-3.5 h-3.5 text-slate-300 mt-0.5 shrink-0" /> API access</li>
            <li className="flex items-start gap-3"><Check className="w-3.5 h-3.5 text-slate-300 mt-0.5 shrink-0" /> ATS integrations (Greenhouse, Lever)</li>
          </ul>
        </div>

        {/* Enterprise */}
        <div className="p-8 flex flex-col">
          <h3 className="text-[16px] font-medium text-slate-900 mb-2">Enterprise</h3>
          <p className="text-[12px] text-slate-500 mb-6 h-8">Dedicated infrastructure and compliance.</p>
          <div className="text-[32px] font-medium text-slate-900 tracking-tight mb-1">
            Custom
          </div>
          <button className="w-full mt-6 mb-8 py-2 text-[13px] font-medium text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-sm transition-colors">
            Contact sales {'>'}
          </button>
          <ul className="space-y-4 text-[12px] text-slate-600">
            <li className="flex items-start gap-3"><Check className="w-3.5 h-3.5 text-slate-300 mt-0.5 shrink-0" /> Unlimited concurrent interviews</li>
            <li className="flex items-start gap-3"><Check className="w-3.5 h-3.5 text-slate-300 mt-0.5 shrink-0" /> Custom LLM deployments</li>
            <li className="flex items-start gap-3"><Check className="w-3.5 h-3.5 text-slate-300 mt-0.5 shrink-0" /> SOC 2 Type II compliance</li>
            <li className="flex items-start gap-3"><Check className="w-3.5 h-3.5 text-slate-300 mt-0.5 shrink-0" /> Dedicated Account Manager</li>
          </ul>
        </div>

      </div>
    </section>
  );
};
