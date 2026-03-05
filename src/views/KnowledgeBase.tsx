import React, { useEffect, useState } from 'react';
import { pb } from '../lib/pb';

export function KnowledgeBase() {
  const [sources, setSources] = useState<any[]>([]);

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const records = await pb.collection('knowledge_sources').getFullList();
        setSources(records);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSources();

    pb.collection('knowledge_sources').subscribe('*', function (e) {
      if (e.action === 'create') {
        setSources((prev) => [...prev, e.record]);
      } else if (e.action === 'update') {
        setSources((prev) => prev.map(s => s.id === e.record.id ? e.record : s));
      } else if (e.action === 'delete') {
        setSources((prev) => prev.filter(s => s.id !== e.record.id));
      }
    });

    return () => {
      pb.collection('knowledge_sources').unsubscribe('*');
    };
  }, []);

  return (
    <div className="flex-1 p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold font-mono mb-4 text-accent">Knowledge Base Sources</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-sm border-collapse">
          <thead>
            <tr className="border-b border-primary/20 bg-background-dark/50 text-slate-400 text-xs uppercase tracking-wider">
              <th className="p-4">Source Type</th>
              <th className="p-4">URL</th>
              <th className="p-4">Status</th>
              <th className="p-4">Last Synced</th>
            </tr>
          </thead>
          <tbody>
            {sources.map((source) => (
              <tr key={source.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                <td className="p-4 text-accent">{source.source_type}</td>
                <td className="p-4 text-slate-300">
                  <a href={source.url} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors underline decoration-primary/30">
                    {source.url}
                  </a>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[10px] uppercase border ${
                    source.vectorization_status === 'vectorized' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                    source.vectorization_status === 'failed' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    source.vectorization_status === 'processing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse' :
                    'bg-slate-500/10 text-slate-400 border-slate-500/20'
                  }`}>
                    {source.vectorization_status}
                  </span>
                </td>
                <td className="p-4 text-slate-500 text-xs">
                  {source.last_synced ? new Date(source.last_synced).toLocaleString() : 'Never'}
                </td>
              </tr>
            ))}
            {sources.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">
                  No knowledge sources configured.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
