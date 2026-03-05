import React from 'react';
import { DataViewLayout } from '../components/DataViewLayout';
import { usePocketBase } from '../hooks/usePocketBase';
import { Badge } from '../components/Badge';

type KnowledgeSource = {
  id: string;
  source_type: 'sdk_repo' | 'docs_url' | 'github_issues' | 'forum';
  url: string;
  vectorization_status: 'pending' | 'processing' | 'vectorized' | 'failed';
  last_synced: string;
};

export const KnowledgeBase: React.FC = () => {
  const { data, loading, error } = usePocketBase<KnowledgeSource>('knowledge_sources', {
    sort: '-created',
    subscribe: true,
  });

  return (
    <DataViewLayout
      title="Knowledge Base"
      icon="settings_input_component"
      loading={loading}
      error={error}
      isEmpty={data.length === 0}
    >
      <div className="overflow-x-auto bg-background-dark/50 rounded-lg border border-primary/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/10 border-b border-primary/20 text-xs font-mono uppercase text-slate-400">
              <th className="p-4 font-bold tracking-widest">Type</th>
              <th className="p-4 font-bold tracking-widest">Source URL</th>
              <th className="p-4 font-bold tracking-widest text-center">Status</th>
              <th className="p-4 font-bold tracking-widest text-right">Last Synced</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {data.map((source) => (
              <tr key={source.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                <td className="p-4 font-mono text-accent">
                  {source.source_type}
                </td>
                <td className="p-4 text-slate-300 truncate max-w-xs xl:max-w-md">
                  <a href={source.url} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors hover:underline">
                    {source.url}
                  </a>
                </td>
                <td className="p-4 text-center">
                  <Badge variant={
                    source.vectorization_status === 'vectorized' ? 'success' :
                    source.vectorization_status === 'failed' ? 'error' :
                    source.vectorization_status === 'processing' ? 'accent' : 'warning'
                  }>
                    {source.vectorization_status}
                  </Badge>
                </td>
                <td className="p-4 text-right font-mono text-slate-500 text-xs">
                  {new Date(source.last_synced).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DataViewLayout>
  );
};
