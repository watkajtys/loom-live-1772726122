import React from 'react';
import { DataViewLayout } from '../components/DataViewLayout';
import { usePocketBase } from '../hooks/usePocketBase';
import { ContentPipeline as ContentPipelineType } from '../types';
import { Badge } from '../components/Badge';

export function ContentPipeline() {
  const { data: pipelineItems, isLoading, error } = usePocketBase<ContentPipelineType>('content_pipeline');

  return (
    <DataViewLayout title="Content Pipeline">
      {isLoading && <p className="text-slate-400 font-mono text-sm">Loading content pipeline...</p>}
      {error && <p className="text-red-400 font-mono text-sm">Error: {error.message}</p>}
      {!isLoading && !error && pipelineItems.length === 0 && (
        <p className="text-slate-400 font-mono text-sm">No content pipeline items found.</p>
      )}
      {!isLoading && pipelineItems.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-mono text-slate-300">
            <thead className="bg-primary/10 text-accent uppercase text-xs">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Title</th>
                <th className="px-4 py-3">Content Snippet</th>
                <th className="px-4 py-3 rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {pipelineItems.map((item) => (
                <tr key={item.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                  <td className="px-4 py-3 font-semibold">{item.title}</td>
                  <td className="px-4 py-3 text-slate-400 line-clamp-1">{item.markdown_body || '-'}</td>
                  <td className="px-4 py-3">
                    <Badge variant={item.status === 'published' ? 'success' : item.status === 'review' ? 'warning' : 'primary'}>
                      {item.status}
                    </Badge>
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