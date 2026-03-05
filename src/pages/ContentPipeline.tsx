import React from 'react';
import { useCollection } from '../hooks/useCollection';

export default function ContentPipeline() {
  const { data: content, loading, error } = useCollection('content_pipeline');

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-100">Content Pipeline</h1>
          <p className="text-sm font-mono text-slate-400 mt-1 uppercase tracking-wider">Automated Content Generation</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 terminal-scroll pr-2">
        {loading && <p className="text-accent font-mono animate-pulse">Syncing pipeline...</p>}
        {error && <p className="text-red-400 font-mono">ERR: {error.message}</p>}
        
        {!loading && !error && content.map((item: any) => (
          <div key={item.id} className="glass-panel rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <span className={`px-2 py-1 rounded text-xs font-mono font-bold uppercase ${
                item.status === 'published' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                item.status === 'review' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                'bg-slate-500/10 text-slate-400 border border-slate-500/20'
              }`}>
                {item.status}
              </span>
            </div>
            <div className="bg-black/40 rounded p-4 font-mono text-sm text-slate-300 border border-slate-800 h-32 overflow-y-auto terminal-scroll">
              <pre className="whitespace-pre-wrap font-sans">{item.markdown_body}</pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
