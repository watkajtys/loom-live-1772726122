import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useContentPipeline } from '../hooks/useContentPipeline';
import { PipelineCard } from '../components/content/PipelineCard';
import { CompactPipelineCard } from '../components/content/CompactPipelineCard';
import { ContentHeader } from '../components/content/ContentHeader';
import { ContentFooter } from '../components/content/ContentFooter';
import { LoadingState } from '../components/states/LoadingState';
import { ErrorState } from '../components/states/ErrorState';
import { EmptyState } from '../components/states/EmptyState';

export const ContentPipeline: React.FC = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || '';
  const agentFilter = searchParams.get('agent') || '';
  const viewMode = searchParams.get('view') || 'standard';
  
  // Note: Platform filter doesn't exist on the content model currently but is mockable

  const filterString = [
    search ? `title ~ "${search}" || markdown_body ~ "${search}"` : '',
    statusFilter === 'live' ? 'status="published"' : statusFilter === 'progress' ? 'status="drafting" || status="review"' : statusFilter === 'draft' ? 'status="draft"' : '',
    // Agent filter would map to user/author in a real model
  ].filter(Boolean).join(' && ');

  const { data, loading, error } = useContentPipeline({
    sort: '-created',
    filter: filterString || undefined,
    subscribe: true,
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-[#020305] text-slate-100 font-display selection:bg-accent/30 selection:text-accent relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none z-0"></div>
      
      <div className="flex-1 glass-panel relative overflow-hidden flex flex-col mx-4 my-4 z-10">
        <ContentHeader />
        
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 relative z-10">
          {loading && <LoadingState />}
          {error && !loading && <ErrorState error={error} />}
          {!loading && !error && data.length === 0 && <EmptyState />}

          {!loading && !error && data.length > 0 && (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${viewMode === 'compact' ? 'gap-2' : 'gap-6'}`}>
              {data.map((content) => (
                viewMode === 'compact' 
                  ? <CompactPipelineCard key={content.id} content={content} />
                  : <PipelineCard key={content.id} content={content} />
              ))}
            </div>
          )}
        </main>

        <ContentFooter />
      </div>
    </div>
  );
};
