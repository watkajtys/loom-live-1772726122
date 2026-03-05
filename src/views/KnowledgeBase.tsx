import React from 'react';
import { DataViewLayout } from '../components/DataViewLayout';
import { usePocketBase } from '../hooks/usePocketBase';
import { KnowledgeSource } from '../types';
import { Badge } from '../components/Badge';

export function KnowledgeBase() {
  const { data: sources, isLoading, error } = usePocketBase<KnowledgeSource>('knowledge_sources');

  return (
    <DataViewLayout title="Knowledge Base">
      {isLoading && <p className="text-slate-400 font-mono text-sm">Loading knowledge sources...</p>}
      {error && <p className="text-red-400 font-mono text-sm">Error: {error.message}</p>}
      {!isLoading && !error && sources.length === 0 && (
        <p className="text-slate-400 font-mono text-sm">No knowledge sources found.</p>
      )}
      {!isLoading && sources.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-mono text-slate-300">
            <thead className="bg-primary/10 text-accent uppercase text-xs">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Source Type</th>
                <th className="px-4 py-3">URL</th>
                <th className="px-4 py-3">Vectorization Status</th>
                <th className="px-4 py-3 rounded-tr-lg">Last Synced</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((source) => (
                <tr key={source.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                  <td className="px-4 py-3 font-semibold uppercase text-xs">{source.source_type.replace('_', ' ')}</td>
                  <td className="px-4 py-3">
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-accent underline underline-offset-2">
                      {source.url}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={
                      source.vectorization_status === 'vectorized' ? 'success' :
                      source.vectorization_status === 'failed' ? 'error' :
                      source.vectorization_status === 'processing' ? 'primary' : 'warning'
                    }>
                      {source.vectorization_status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">
                    {source.last_synced ? new Date(source.last_synced).toLocaleString() : 'Never'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DataViewLayout>
  );
}