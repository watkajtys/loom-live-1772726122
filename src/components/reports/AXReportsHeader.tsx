import React from 'react';
import { AX_REPORTS_CONFIG } from '../../constants/config';
import { Icon } from '../Icon';

export const AXReportsHeader = () => {
  return (
    <header className="relative z-30 h-14 border-b border-white/10 bg-black/80 backdrop-blur-xl flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-accent/10 border border-accent/40 flex items-center justify-center">
            <span className="material-symbols-outlined text-accent text-lg">analytics</span>
          </div>
          <div className="leading-none">
            <h1 className="text-lg font-bold text-white tracking-tight uppercase">AX_REPORTS</h1>
            <span className="text-[9px] font-mono text-accent/60 tracking-[0.3em]">SPLIT_LOG_VIEW_V2</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-slate-500 uppercase">Throughput</span>
            <span className="text-xs font-mono text-accent">{AX_REPORTS_CONFIG.THROUGHPUT}</span>
          </div>
          <div className="flex flex-col border-l border-white/10 pl-6">
            <span className="text-[8px] font-mono text-slate-500 uppercase">Agent Efficiency</span>
            <span className="text-xs font-mono text-green-400">{AX_REPORTS_CONFIG.AGENT_EFFICIENCY}</span>
          </div>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-4 py-1.5 border border-white/10 bg-white/5 text-[10px] font-mono uppercase tracking-widest text-slate-400">
          <span className="text-accent animate-pulse">●</span>
          Live Stream Active
        </div>
        <button className="w-9 h-9 flex items-center justify-center border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white transition-all">
          <span className="material-symbols-outlined text-xl">download</span>
        </button>
      </div>
    </header>
  );
};
