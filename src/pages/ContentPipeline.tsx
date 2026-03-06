import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useContentPipeline } from '../hooks/useContentPipeline';
import { PipelineCard } from '../components/content/PipelineCard';
import { CompactPipelineCard } from '../components/content/CompactPipelineCard';
import { PipelineStage } from '../components/content/PipelineStage';
import { ContentHeader } from '../components/content/ContentHeader';
import { ContentFooter } from '../components/content/ContentFooter';
import { LoadingState } from '../components/states/LoadingState';
import { ErrorState } from '../components/states/ErrorState';
import { EmptyState } from '../components/states/EmptyState';
import { Icon } from '../components/Icon';

export const ContentPipeline: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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

  const collapsedStages = searchParams.get('collapsed')?.split(',') || [];

  const toggleCollapse = (stage: string) => {
    const newParams = new URLSearchParams(searchParams);
    let currentCollapsed = newParams.get('collapsed')?.split(',') || [];
    if (currentCollapsed.includes(stage)) {
      currentCollapsed = currentCollapsed.filter((s) => s !== stage);
    } else {
      currentCollapsed.push(stage);
    }
    
    if (currentCollapsed.length > 0) {
      newParams.set('collapsed', currentCollapsed.join(','));
    } else {
      newParams.delete('collapsed');
    }
    setSearchParams(newParams);
  };

  const { data, loading, error } = useContentPipeline({
    sort: '-created',
    filter: filterString || undefined,
    subscribe: true,
  });

  const draftingData = data.filter((item) => item.status === 'drafting');
  const reviewData = data.filter((item) => item.status === 'review');
  const liveData = data.filter((item) => item.status === 'published');

  return (
    <div className="flex-1 flex flex-col h-full bg-[#020305] text-slate-100 font-display selection:bg-accent/30 selection:text-accent relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none z-0"></div>
      
      <div className="flex-1 glass-panel relative overflow-hidden flex flex-col mx-4 my-4 z-10">
        <ContentHeader />
        
        <main className={`flex-1 overflow-hidden relative z-10 ${viewMode === 'compact' ? 'flex bg-black/20 overflow-x-auto custom-scrollbar' : 'overflow-y-auto custom-scrollbar p-6'}`}>
          {loading && <LoadingState />}
          {error && !loading && <ErrorState error={error} />}
          {!loading && !error && data.length === 0 && <EmptyState />}

          {!loading && !error && data.length > 0 && viewMode !== 'compact' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.map((content) => (
                <PipelineCard key={content.id} content={content} />
              ))}
            </div>
          )}

          {!loading && !error && data.length > 0 && viewMode === 'compact' && (
            <>
              <PipelineStage
                title="Drafting"
                count={draftingData.length}
                icon="edit_note"
                status="drafting"
                isCollapsed={collapsedStages.includes('drafting')}
                onToggleCollapse={() => toggleCollapse('drafting')}
                actionGutter={
                  <>
                    <span className="text-[8px] font-mono text-slate-600 vertical-text uppercase tracking-widest mb-2">Filters</span>
                    <button className="gutter-btn active" title="Filter: Code">
                      <Icon name="code" className="text-[16px]" />
                    </button>
                    <button className="gutter-btn" title="Filter: Social">
                      <Icon name="share" className="text-[16px]" />
                    </button>
                    <button className="gutter-btn" title="Filter: Blog">
                      <Icon name="article" className="text-[16px]" />
                    </button>
                    <div className="w-4 h-px bg-white/10 my-1"></div>
                    <button className="gutter-btn" title="Sort by priority">
                      <Icon name="priority_high" className="text-[16px]" />
                    </button>
                    <button className="gutter-btn" title="Batch Action">
                      <Icon name="checklist" className="text-[16px]" />
                    </button>
                  </>
                }
              >
                {draftingData.map((content) => (
                  <CompactPipelineCard key={content.id} content={content} />
                ))}
              </PipelineStage>

              <PipelineStage
                title="Review Pipeline"
                count={reviewData.length}
                icon="forum"
                status="review"
                isCollapsed={collapsedStages.includes('review')}
                onToggleCollapse={() => toggleCollapse('review')}
              >
                {reviewData.map((content) => (
                  <CompactPipelineCard key={content.id} content={content} />
                ))}
              </PipelineStage>

              <PipelineStage
                title="Live Nodes"
                count={liveData.length}
                icon="sensors"
                status="published"
                isCollapsed={collapsedStages.includes('published')}
                onToggleCollapse={() => toggleCollapse('published')}
                actionGutter={
                  <>
                    <span className="text-[8px] font-mono text-slate-600 vertical-text uppercase tracking-widest mb-2">Metrics</span>
                    <button className="gutter-btn" title="View Heatmap">
                      <Icon name="grid_view" className="text-[16px]" />
                    </button>
                    <button className="gutter-btn" title="Performance">
                      <Icon name="show_chart" className="text-[16px]" />
                    </button>
                    <button className="gutter-btn" title="Alerts">
                      <Icon name="notifications" className="text-[16px]" />
                    </button>
                  </>
                }
              >
                {liveData.map((content) => (
                  <CompactPipelineCard key={content.id} content={content} />
                ))}
              </PipelineStage>
            </>
          )}
        </main>

        <ContentFooter />
      </div>
    </div>
  );
};
