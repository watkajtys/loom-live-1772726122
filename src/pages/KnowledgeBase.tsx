import React from 'react';
import { useCollection } from '../hooks/useCollection';

export default function KnowledgeBase() {
  const { data: sources, loading, error } = useCollection('knowledge_sources');

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-100">Knowledge Base</h1>
          <p className="text-sm font-mono text-slate-400 mt-1 uppercase tracking-wider">Vector Search Indexing</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 terminal-scroll pr-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading && <p className="text-accent font-mono animate-pulse col-span-2">Initializing Neural Index...</p>}
        {error && <p className="text-red-400 font-mono col-span-2">ERR: {error.message}</p>}
        
        {!loading && !error && sources.map((source: any) => (
          <div key={source.id} className="glass-panel rounded-lg p-5 flex flex-col justify-between h-40 transition-transform hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-mono uppercase text-primary font-bold bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                {source.source_type.replace('_', ' ')}
              </span>
              <span className={`px-2 py-1 rounded text-[10px] font-mono font-bold uppercase ${
                source.vectorization_status === 'vectorized' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                source.vectorization_status === 'processing' ? 'bg-accent/10 text-accent border border-accent/20 animate-pulse' :
                source.vectorization_status === 'failed' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                'bg-slate-500/10 text-slate-400 border border-slate-500/20'
              }`}>
                {source.vectorization_status}
              </span>
            </div>
            
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-300 font-mono truncate hover:text-accent hover:underline mb-4">
              {source.url}
            </a>
            
            <div className="mt-auto border-t border-primary/20 pt-3 flex justify-between items-center text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">sync</span>
                Last Synced
              </span>
              <span>
                {new Date(source.last_synced).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
