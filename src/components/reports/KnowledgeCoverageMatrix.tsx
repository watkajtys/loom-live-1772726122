import React from 'react';

export const KnowledgeCoverageMatrix = () => {
  return (
    <div className="terminal-window flex-none h-[45%]">
      <div className="terminal-header">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-accent text-sm">hub</span>
          <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Knowledge_Coverage_Matrix</span>
        </div>
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-white/10"></span>
          <span className="w-2 h-2 rounded-full bg-white/10"></span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-between px-12 py-6 bg-gradient-to-br from-black/40 to-accent/5">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle className="text-white/5" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeWidth="4"></circle>
            <circle className="text-accent drop-shadow-[0_0_8px_rgba(0,242,255,0.6)]" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeDasharray="282.7" strokeDashoffset="56.5" strokeWidth="4"></circle>
            <circle className="text-white/5" cx="50" cy="50" fill="transparent" r="35" stroke="currentColor" strokeWidth="4"></circle>
            <circle className="text-accent/40" cx="50" cy="50" fill="transparent" r="35" stroke="currentColor" strokeDasharray="219.9" strokeDashoffset="87.9" strokeWidth="4"></circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-white cyan-glow-text">82%</span>
            <span className="text-[8px] font-mono text-accent/60 uppercase">Global Sync</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="space-y-1">
            <div className="text-[9px] font-mono text-slate-500 uppercase">Documentation</div>
            <div className="text-lg font-bold text-white">94.2%</div>
            <div className="w-24 h-1 bg-white/10"><div className="h-full bg-accent w-[94%] shadow-[0_0_5px_rgba(0,242,255,0.5)]"></div></div>
          </div>
          <div className="space-y-1">
            <div className="text-[9px] font-mono text-slate-500 uppercase">Community FAQ</div>
            <div className="text-lg font-bold text-white">76.8%</div>
            <div className="w-24 h-1 bg-white/10"><div className="h-full bg-accent/60 w-[76%]"></div></div>
          </div>
          <div className="space-y-1">
            <div className="text-[9px] font-mono text-slate-500 uppercase">Issue Tracker</div>
            <div className="text-lg font-bold text-white">62.1%</div>
            <div className="w-24 h-1 bg-white/10"><div className="h-full bg-accent/40 w-[62%]"></div></div>
          </div>
          <div className="space-y-1">
            <div className="text-[9px] font-mono text-slate-500 uppercase">SDK Source</div>
            <div className="text-lg font-bold text-white">88.5%</div>
            <div className="w-24 h-1 bg-white/10"><div className="h-full bg-accent w-[88%] shadow-[0_0_5px_rgba(0,242,255,0.5)]"></div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
