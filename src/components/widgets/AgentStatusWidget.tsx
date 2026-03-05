import React from 'react';

export function AgentStatusWidget() {
  return (
    <section className="col-span-12 lg:col-span-8 row-span-2 glass-panel rounded-lg p-4 flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xs font-mono text-accent uppercase tracking-widest">Autonomous Activity Visualize</h3>
          <p className="text-2xl font-bold font-mono">142.8 <span className="text-sm font-normal text-slate-400">ops/m</span></p>
        </div>
        <div className="flex gap-2">
          <span className="px-2 py-1 text-[10px] bg-accent/10 text-accent border border-accent/20 rounded font-mono">LIVE_STREAM</span>
        </div>
      </div>
      <div className="flex-1 flex items-end gap-1 px-2 pb-2">
        {/* Kinetic Visualizer Mock */}
        <div className="flex-1 bg-accent/20 rounded-t h-1/2"></div>
        <div className="flex-1 bg-accent/40 rounded-t h-3/4"></div>
        <div className="flex-1 bg-accent/10 rounded-t h-1/4"></div>
        <div className="flex-1 bg-primary/40 rounded-t h-5/6"></div>
        <div className="flex-1 bg-accent/60 rounded-t h-full"></div>
        <div className="flex-1 bg-accent/20 rounded-t h-1/3"></div>
        <div className="flex-1 bg-accent/40 rounded-t h-2/3"></div>
        <div className="flex-1 bg-accent/10 rounded-t h-1/2"></div>
        <div className="flex-1 bg-primary/40 rounded-t h-1/4"></div>
        <div className="flex-1 bg-accent/60 rounded-t h-3/4"></div>
        <div className="flex-1 bg-accent/20 rounded-t h-5/6"></div>
        <div className="flex-1 bg-accent/40 rounded-t h-full"></div>
        <div className="flex-1 bg-accent/10 rounded-t h-1/3"></div>
        <div className="flex-1 bg-primary/40 rounded-t h-2/3"></div>
        <div className="flex-1 bg-accent/60 rounded-t h-1/2"></div>
        <div className="flex-1 bg-accent/20 rounded-t h-1/4"></div>
        <div className="flex-1 bg-accent/40 rounded-t h-3/4"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent pointer-events-none"></div>
    </section>
  );
}
