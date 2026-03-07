import React from 'react';
import { AX_REPORTS_CONFIG } from '../../constants/config';

export const AXReportsFooter = () => {
  return (
    <footer className="h-8 border-t border-white/10 bg-black/90 px-6 flex items-center justify-between relative z-30 shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_6px_#00f2ff]"></span>
          <span className="text-[9px] font-mono text-accent uppercase tracking-tighter">System Health: {AX_REPORTS_CONFIG.SYSTEM_HEALTH}</span>
        </div>
        <div className="text-[9px] font-mono text-slate-600 uppercase">API_LATENCY: {AX_REPORTS_CONFIG.API_LATENCY}</div>
        <div className="text-[9px] font-mono text-slate-600 uppercase">THREADS: {AX_REPORTS_CONFIG.THREADS_ACTIVE}</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <div className="w-2 h-2 border border-white/20"></div>
          <div className="w-2 h-2 border border-accent/60 bg-accent/20"></div>
          <div className="w-2 h-2 border border-white/20"></div>
        </div>
        <span className="text-[9px] font-mono text-slate-600">{AX_REPORTS_CONFIG.VERSION}</span>
        <span className="text-[9px] font-mono text-slate-600">© ADVOLOOM_SYSTEMS_2024</span>
      </div>
    </footer>
  );
};
