import React from 'react';
import { PipelineStage } from './PipelineStage';
import { CompactPipelineCard } from './CompactPipelineCard';
import { TransformedContentPipeline } from '../../lib/api/content';
import { Icon } from '../Icon';

interface ContentBoardProps {
  draftingData: TransformedContentPipeline[];
  reviewData: TransformedContentPipeline[];
  liveData: TransformedContentPipeline[];
  collapsedStages: string[];
  toggleCollapse: (stage: string) => void;
}

export const ContentBoard: React.FC<ContentBoardProps> = ({
  draftingData,
  reviewData,
  liveData,
  collapsedStages,
  toggleCollapse,
}) => {
  return (
    <>
      <PipelineStage
        title="Drafting"
        count={draftingData.length}
        icon="file-edit"
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
              <Icon name="file-text" className="text-[16px]" />
            </button>
            <div className="w-4 h-px bg-white/10 my-1"></div>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-white/10 text-slate-500 hover:text-accent hover:border-accent/40 transition-all" title="Sort by priority">
              <Icon name="alert-circle" className="text-[16px]" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-white/10 text-slate-500 hover:text-accent hover:border-accent/40 transition-all" title="Batch Action">
              <Icon name="check-square" className="text-[16px]" />
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
        icon="message-square"
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
        icon="radio"
        status="published"
        isCollapsed={collapsedStages.includes('published')}
        onToggleCollapse={() => toggleCollapse('published')}
        actionGutter={
          <>
            <span className="text-[8px] font-mono text-slate-600 vertical-text uppercase tracking-widest mb-2">Metrics</span>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-white/10 text-slate-500 hover:text-accent hover:border-accent/40 transition-all" title="View Heatmap">
              <Icon name="layout-grid" className="text-[16px]" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-white/10 text-slate-500 hover:text-accent hover:border-accent/40 transition-all" title="Performance">
              <Icon name="trending-up" className="text-[16px]" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-white/10 text-slate-500 hover:text-accent hover:border-accent/40 transition-all" title="Alerts">
              <Icon name="bell" className="text-[16px]" />
            </button>
          </>
        }
      >
        {liveData.map((content) => (
          <CompactPipelineCard key={content.id} content={content} />
        ))}
      </PipelineStage>
    </>
  );
};
