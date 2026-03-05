import React from 'react';
import { useCollection } from '../hooks/useCollection';

export default function CommunityQueue() {
  const { data: mentions, loading, error } = useCollection('social_mentions');

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-100">Community Queue</h1>
          <p className="text-sm font-mono text-slate-400 mt-1 uppercase tracking-wider">Social Mentions & Queries</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded font-mono text-xs">
            {mentions.length} ACTIVE
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 terminal-scroll pr-2">
        {loading && <p className="text-accent font-mono animate-pulse">Loading data streams...</p>}
        {error && <p className="text-red-400 font-mono">ERR: {error.message}</p>}
        
        {!loading && !error && mentions.map((mention: any) => (
          <div key={mention.id} className="glass-panel rounded-lg p-4 transition-colors hover:border-accent/40">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-background-dark border border-slate-700 text-xs font-mono uppercase text-slate-300">
                  {mention.platform}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                  mention.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                  mention.status === 'approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                  'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {mention.status}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500">
                {new Date(mention.created).toLocaleString()}
              </span>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-slate-200">
                <span className="text-accent mr-2 font-bold font-mono">Q:</span>
                {mention.query}
              </p>
            </div>
            
            <div className="bg-background-dark/50 border border-primary/10 rounded p-3">
              <p className="text-sm text-slate-400 font-mono">
                <span className="text-primary mr-2 font-bold">Draft Reply:</span>
                {mention.draft_reply}
              </p>
            </div>
          </div>
        ))}

        {!loading && !error && mentions.length === 0 && (
          <div className="text-center py-10 glass-panel rounded-lg">
            <span className="material-symbols-outlined text-4xl text-slate-600 mb-2">done_all</span>
            <p className="text-slate-400 font-mono">Queue is clear.</p>
          </div>
        )}
      </div>
    </div>
  );
}
