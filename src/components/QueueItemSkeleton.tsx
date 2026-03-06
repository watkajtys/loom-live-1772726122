import React from 'react';

export const QueueItemSkeleton: React.FC = () => {
  return (
    <div className="queue-row group animate-pulse">
      <div className="flex items-center gap-4 min-w-[60px]">
        <div className="relative">
          <div className="size-10 rounded-sm bg-slate-800/80 flex items-center justify-center border border-slate-700/50">
          </div>
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 font-mono text-[11px] mb-2">
          <div className="h-3 w-16 bg-slate-800 rounded"></div>
          <span className="text-slate-700">|</span>
          <div className="h-3 w-24 bg-slate-800 rounded"></div>
          <span className="text-slate-700">|</span>
          <div className="h-3 w-20 bg-slate-800 rounded"></div>
        </div>
        <div className="h-4 w-3/4 bg-slate-800/80 rounded"></div>
      </div>
      
      <div className="flex items-center gap-10">
        <div className="text-right">
          <p className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter mb-1">Agent_State</p>
          <div className="h-4 w-16 bg-slate-800 rounded ml-auto"></div>
        </div>
        <div className="text-right min-w-[80px]">
          <p className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter mb-1">Priority</p>
          <div className="flex items-center gap-2 justify-end">
            <div className="h-3 w-6 bg-slate-800 rounded"></div>
            <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 ml-4">
        <div className="h-6 w-16 bg-slate-800/80 rounded"></div>
        <div className="h-6 w-12 bg-slate-800/80 rounded"></div>
      </div>
    </div>
  );
};
