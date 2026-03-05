import React from 'react';
import { DataViewLayout } from '../components/DataViewLayout';
import { usePocketBase } from '../hooks/usePocketBase';
import { Badge } from '../components/Badge';

type ContentPipeline = {
  id: string;
  title: string;
  markdown_body: string;
  status: 'drafting' | 'review' | 'published';
};

export const ContentPipeline: React.FC = () => {
  const { data, loading, error } = usePocketBase<ContentPipeline>('content_pipeline', {
    sort: '-created',
    subscribe: true,
  });

  return (
    <DataViewLayout
      title="Content Pipeline"
      icon="article"
      loading={loading}
      error={error}
      isEmpty={data.length === 0}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.map((content) => (
          <div key={content.id} className="p-4 bg-background-dark/50 rounded-lg border border-primary/20 hover:border-accent/40 transition-colors flex flex-col h-64">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-sm font-bold text-slate-100 line-clamp-2 pr-2">{content.title}</h3>
              <Badge variant={
                content.status === 'drafting' ? 'outline' :
                content.status === 'review' ? 'warning' : 'success'
              }>
                {content.status}
              </Badge>
            </div>
            <div className="flex-1 bg-black/40 rounded border border-slate-800 p-3 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
              <p className="text-xs text-slate-400 font-mono whitespace-pre-wrap">{content.markdown_body}</p>
            </div>
            <div className="mt-3 pt-3 border-t border-primary/10 flex justify-between items-center">
              <span className="text-[10px] text-slate-500 font-mono uppercase">ID: {content.id.substring(0, 8)}</span>
              <button className="text-xs text-accent hover:text-primary transition-colors font-mono">EDIT</button>
            </div>
          </div>
        ))}
      </div>
    </DataViewLayout>
  );
};
