import React from 'react';

export const StreamFooter: React.FC = () => {
  return (
    <footer className="h-8 border-t border-white/10 bg-black/90 px-6 flex items-center justify-between relative z-30 shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_6px_#00f2ff]"></span>
          <span className="text-[9px] font-mono text-accent uppercase tracking-tighter">System Health: 100%</span>
        </div>
        <div className="text-[9px] font-mono text-slate-600 uppercase">Latency: 22ms</div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[9px] font-mono text-slate-600">v4.0.1-STABLE</span>
        <span className="text-[9px] font-mono text-slate-600">© ADVOLOOM_CORE_2024</span>
      </div>
    </footer>
  );
};
