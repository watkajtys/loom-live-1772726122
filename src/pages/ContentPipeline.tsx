import React from 'react';
import { useContentPipelineView } from '../hooks/useContentPipelineView';
import { PipelineCard } from '../components/content/PipelineCard';
import { CompactPipelineCard } from '../components/content/CompactPipelineCard';
import { PipelineStage } from '../components/content/PipelineStage';
import { ContentHeader } from '../components/content/ContentHeader';
import { ContentFooter } from '../components/content/ContentFooter';
import { DataViewLayout } from '../components/DataViewLayout';
import { Icon } from '../components/Icon';

export const ContentPipeline: React.FC = () => {
  const {
    viewMode,
    collapsedStages,
    toggleCollapse,
    data,
    draftingData,
    reviewData,
    liveData,
    loading,
    error,
  } = useContentPipelineView();

  return (
    <div className="flex-1 flex flex-col h-full bg-[#020305] text-slate-100 font-display selection:bg-accent/30 selection:text-accent relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none z-0"></div>
      
      <DataViewLayout
        title="Content Pipeline"
        icon="article"
        loading={loading}
        error={error}
        isEmpty={data.length === 0}
        customHeader={<ContentHeader />}
        customFooter={<ContentFooter />}
        containerClassName="flex-1 flex flex-col mx-4 my-4 z-10"
        wrapperClassName="flex-1 glass-panel relative overflow-hidden flex flex-col z-10"
        contentClassName={`flex-1 overflow-hidden relative z-10 ${viewMode === 'compact' ? 'flex bg-black/20 overflow-x-auto custom-scrollbar' : 'overflow-y-auto custom-scrollbar p-6'}`}
      >
        {data.length > 0 && viewMode !== 'compact' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((content) => (
              <PipelineCard key={content.id} content={content} />
            ))}
          </div>
        )}

        {data.length > 0 && viewMode === 'compact' && (
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
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-accent/40 bg-accent/10 text-accent transition-all" title="Filter: Code">
                    <Icon name="code" className="text-[16px]" />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-white/10 text-slate-500 hover:text-accent hover:border-accent/40 transition-all" title="Filter: Social">
                    <Icon name="share" className="text-[16px]" />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-white/10 text-slate-500 hover:text-accent hover:border-accent/40 transition-all" title="Filter: Blog">
                    <Icon name="article" className="text-[16px]" />
                  </button>
                  <div className="w-4 h-px bg-white/10 my-1"></div>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-white/10 text-slate-500 hover:text-accent hover:border-accent/40 transition-all" title="Sort by priority">
                    <Icon name="priority_high" className="text-[16px]" />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-white/10 text-slate-500 hover:text-accent hover:border-accent/40 transition-all" title="Batch Action">
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
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-white/10 text-slate-500 hover:text-accent hover:border-accent/40 transition-all" title="View Heatmap">
                    <Icon name="grid_view" className="text-[16px]" />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-white/10 text-slate-500 hover:text-accent hover:border-accent/40 transition-all" title="Performance">
                    <Icon name="show_chart" className="text-[16px]" />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-white/10 text-slate-500 hover:text-accent hover:border-accent/40 transition-all" title="Alerts">
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
      </DataViewLayout>
    </div>
  );
};
