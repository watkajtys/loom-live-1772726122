import React from 'react';
import type { Ingest } from '../../hooks/useDashboardData';

interface RecentIngestsPanelProps {
  ingests: Ingest[];
}

export const RecentIngestsPanel: React.FC<RecentIngestsPanelProps> = ({ ingests }) => {
  return (
    <section className="col-span-12 lg:col-span-3 row-span-5 glass-panel rounded-lg flex flex-col overflow-hidden">
      <div className="p-4 border-b border-primary/20 bg-primary/5">
        <h3 className="text-xs font-mono text-slate-300 uppercase font-bold tracking-widest">Recent Ingests</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {ingests.map((ingest, i) => (
          <div key={i} className={`p-3 ${ingest.style || 'bg-primary/10'} rounded-lg border ${ingest.style ? 'border-primary/10' : 'border-primary/20'} hover:border-accent/40 transition-colors group cursor-pointer`}>
            <div className="flex justify-between items-center mb-1">
              <span className={`text-[10px] font-mono ${i===0 ? 'text-accent' : 'text-slate-400'}`}>{ingest.type}</span>
              <span className="text-[10px] text-slate-500">{ingest.time}</span>
            </div>
            <p className="text-xs text-slate-300 line-clamp-1">{ingest.title}</p>
            <div className="mt-2 flex gap-1">
              <span className="px-1 text-[8px] border border-primary/30 text-primary-300 rounded uppercase">{ingest.tag}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="p-3 text-[10px] font-mono text-slate-500 uppercase hover:text-accent border-t border-primary/20">
        View Data Lake
      </button>
    </section>
  );
};
