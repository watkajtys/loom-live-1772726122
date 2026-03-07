import React from 'react';
import { Icon } from '../../Icon';

export const SplitFooter: React.FC = () => {
  return (
    <footer className="relative z-20 px-6 py-3 border-t border-white/10 bg-black/95 flex justify-between items-center text-[10px] font-mono shrink-0">
      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <span className="uppercase text-slate-500 tracking-wider">LAYOUT_MODE:</span>
          <span className="text-accent font-bold">SPLIT_COMMAND</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="uppercase text-slate-500 tracking-wider">WORKSPACE:</span>
          <span className="text-accent font-bold">FOCUSED_REVIEW</span>
        </div>
      </div>
      <div className="flex items-center gap-4 text-slate-400">
        <div className="flex items-center gap-2 border-r border-white/10 pr-4">
          <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse"></span>
          <span className="uppercase tracking-widest">SYSTEM: NOMINAL</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="database" className="text-[14px]" />
          <span className="uppercase">v4.0.1_RC2</span>
        </div>
      </div>
    </footer>
  );
};
