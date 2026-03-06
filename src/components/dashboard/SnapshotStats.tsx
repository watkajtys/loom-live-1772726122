import React from 'react';

interface SnapshotStatsProps {
  data: {
    activeAgents: number;
    tokensPerSec: number;
    health: number;
  };
}

export const SnapshotStats: React.FC<SnapshotStatsProps> = ({ data }) => (
  <section className="col-span-12 lg:col-span-4 row-span-1 glass-panel rounded-lg p-4 flex items-center justify-around">
    <div className="text-center">
      <p className="text-[10px] font-mono text-slate-500 uppercase">Active Agents</p>
      <p className="text-xl font-bold font-mono text-accent">{data.activeAgents}</p>
    </div>
    <div className="w-px h-8 bg-primary/20"></div>
    <div className="text-center">
      <p className="text-[10px] font-mono text-slate-500 uppercase">Tokens / Sec</p>
      <p className="text-xl font-bold font-mono text-slate-100">{data.tokensPerSec}</p>
    </div>
    <div className="w-px h-8 bg-primary/20"></div>
    <div className="text-center">
      <p className="text-[10px] font-mono text-slate-500 uppercase">Health</p>
      <p className="text-xl font-bold font-mono text-green-400">{data.health}&#37;</p>
    </div>
  </section>
);
