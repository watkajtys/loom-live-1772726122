import React from 'react';

interface AgentStatusVisualizationProps {
  bars: number[];
  opsPerMinute: number;
}

export const AgentStatusVisualization: React.FC<AgentStatusVisualizationProps> = ({ bars, opsPerMinute }) => {
  return (
    <section className="col-span-12 lg:col-span-8 row-span-2 glass-panel rounded-lg p-4 flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xs font-mono text-accent uppercase tracking-widest">Autonomous Activity Visualize</h3>
          <p className="text-2xl font-bold font-mono">{opsPerMinute.toFixed(1)} <span className="text-sm font-normal text-slate-400">ops/m</span></p>
        </div>
        <div className="flex gap-2">
          <span className="px-2 py-1 text-[10px] bg-accent/10 text-accent border border-accent/20 rounded font-mono">LIVE_STREAM</span>
        </div>
      </div>
      <div className="flex-1 flex items-end gap-1 px-2 pb-2">
        {bars.map((h, i) => {
          const heightClass = h === 40 && i % 2 === 0 ? 'h-1/2' : h === 60 ? 'h-full' : h === 10 ? 'h-1/4' : 'h-3/4';
          const bgOpacity = h === 20 ? 'bg-accent/20' : h === 40 ? 'bg-accent/40' : h === 60 ? 'bg-accent/60' : 'bg-accent/10';
          const bgClass = i % 4 === 3 ? 'bg-primary/40' : bgOpacity;
          return (
            <div key={i} className={`flex-1 rounded-t ${heightClass} ${bgClass}`}></div>
          );
        })}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent pointer-events-none"></div>
    </section>
  );
};
