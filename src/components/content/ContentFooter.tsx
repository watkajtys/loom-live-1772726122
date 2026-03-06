import React from 'react';

export const ContentFooter: React.FC = () => {
  return (
    <footer className="relative z-20 px-6 py-3 border-t border-white/10 bg-black/95 flex justify-between items-center text-[10px] font-mono">
      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <span className="uppercase text-slate-500 tracking-wider">PIPELINE_THROUGHPUT:</span>
          <span className="text-accent font-bold">124 UNITS/HR</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="uppercase text-slate-500 tracking-wider">CONTENT_HEALTH:</span>
          <span className="text-terminal-green font-bold">OPTIMAL</span>
        </div>
      </div>
      <div className="flex items-center gap-3 text-slate-400">
        <span className="material-symbols-outlined text-[14px]">sensors</span>
        <span className="uppercase tracking-wider">LAST_SYNC:</span>
        <span className="text-accent font-bold uppercase">14:55:02 UTC</span>
      </div>
    </footer>
  );
};
