import React from 'react';

export const StreamBatchActions: React.FC = () => {
  return (
    <aside className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-4xl">
      <div className="bg-black/90 backdrop-blur-md border border-accent/30 shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_15px_rgba(0,242,255,0.1)] p-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <input 
                className="rounded-none bg-black border-accent/40 text-accent focus:ring-accent/20 size-4" 
                type="checkbox" 
              />
              <span className="text-[10px] font-mono text-accent uppercase tracking-widest font-bold">Select All</span>
            </div>
            <div className="h-4 w-px bg-white/10 mx-2"></div>
            <span className="text-[10px] font-mono text-slate-400">03_ITEMS_SELECTED</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-[10px] font-mono text-slate-400 hover:text-accent transition-colors uppercase">
              <span className="material-symbols-outlined text-sm">pause_circle</span> Suspend
            </button>
            <button className="flex items-center gap-2 text-[10px] font-mono text-slate-400 hover:text-red-400 transition-colors uppercase">
              <span className="material-symbols-outlined text-sm">delete_forever</span> Drop
            </button>
            <button className="flex items-center gap-2 text-[10px] font-mono text-slate-400 hover:text-accent transition-colors uppercase">
              <span className="material-symbols-outlined text-sm">terminal</span> Re-route
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right mr-4 hidden sm:block">
            <div className="text-[9px] font-mono text-slate-500 uppercase">Estimated Impact</div>
            <div className="text-xs font-mono text-accent">+8.2% Reach</div>
          </div>
          <button className="bg-accent text-obsidian px-8 py-2 text-[11px] font-bold uppercase tracking-[0.2em] hover:brightness-110 shadow-[0_0_15px_rgba(0,242,255,0.3)] transition-all">
            Execute_Batch
          </button>
        </div>
      </div>
    </aside>
  );
};
