import React from 'react';

export const SplitHeader: React.FC = () => {
  return (
    <header className="relative z-30 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/90 backdrop-blur-md shrink-0">
      <div className="flex items-center gap-8">
        <div className="space-y-0.5">
          <span className="text-[8px] font-mono text-accent tracking-[0.2em] font-bold">CORE_PIPELINE::SPLIT_COMMAND_V2</span>
          <h2 className="text-xl font-bold tracking-tight text-white font-display uppercase leading-none">Autonomous Content Pipeline</h2>
        </div>
        <div className="h-8 w-px bg-white/10"></div>
        <div className="flex gap-6">
          <div className="flex flex-col">
            <span className="terminal-label text-slate-500 text-[9px] font-mono uppercase tracking-[0.15em]">Active Stage</span>
            <span className="text-[10px] font-mono text-accent font-bold">REVIEW_SESSION_01</span>
          </div>
          <div className="flex flex-col">
            <span className="terminal-label text-slate-500 text-[9px] font-mono uppercase tracking-[0.15em]">Cluster Load</span>
            <span className="text-[10px] font-mono text-terminal-green">42.8%</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2 mr-4">
          <div className="w-7 h-7 rounded border border-white/10 bg-slate-800 flex items-center justify-center text-[10px] font-mono">A1</div>
          <div className="w-7 h-7 rounded border border-white/10 bg-slate-700 flex items-center justify-center text-[10px] font-mono">A4</div>
        </div>
        <button className="px-4 py-2 bg-white/5 border border-white/10 text-white text-[11px] font-mono uppercase tracking-widest hover:bg-white/10 transition-all">
          Global_Config
        </button>
        <button className="px-4 py-2 bg-accent/10 border border-accent/30 text-accent text-[11px] font-mono uppercase tracking-widest hover:bg-accent/20 transition-all">
          Execute_Batch
        </button>
      </div>
    </header>
  );
};
