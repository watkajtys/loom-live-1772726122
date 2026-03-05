import React from 'react';
import { usePocketBase } from '../hooks/usePocketBase';
import { ContentPipeline as ContentPipelineType } from '../types';
import { StatusBadge } from '../components/ui/Badge';

export function ContentPipeline() {
  const { data: contentItems, loading, error } = usePocketBase<ContentPipelineType>('content_pipeline');

  if (loading) return <div className="p-6 font-mono text-accent">Loading Content Pipeline...</div>;
  if (error) return <div className="p-6 font-mono text-red-500">Error loading Content Pipeline: {error.message}</div>;

  return (
    <div className="flex-1 p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold font-mono mb-4 text-accent">Content Pipeline</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contentItems.map((item) => (
          <div key={item.id} className="glass-panel p-4 rounded-lg flex flex-col gap-2">
            <h3 className="font-bold text-lg text-primary">{item.title}</h3>
            <StatusBadge status={item.status} />
            <div className="mt-2 p-2 bg-background-dark/50 rounded text-xs border border-primary/20 max-h-40 overflow-y-auto terminal-scroll whitespace-pre-wrap font-mono">
              {item.markdown_body}
            </div>
          </div>
        ))}
        {contentItems.length === 0 && (
          <div className="col-span-full text-center text-slate-500 font-mono py-10">
            Pipeline is empty.
          </div>
        )}
      </div>
    </div>
  );
}
