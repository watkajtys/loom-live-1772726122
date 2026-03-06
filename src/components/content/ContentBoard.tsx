import React from 'react';
import { PipelineStage as PipelineStageComponent } from './PipelineStage';
import { CompactPipelineCard } from './CompactPipelineCard';
import { TransformedContentPipeline } from '../../lib/api/content';
import { PipelineStage } from '../../types/models';
import { Icon } from '../Icon';

interface ContentBoardProps {
  data: TransformedContentPipeline[];
  stages: PipelineStage[];
  collapsedStages: string[];
  toggleCollapse: (stage: string) => void;
}

export const ContentBoard: React.FC<ContentBoardProps> = ({
  data,
  stages,
  collapsedStages,
  toggleCollapse,
}) => {
  return (
    <>
      {stages.map((stage) => {
        // Group data by status or another relation property based on your data model
        // We fallback to `status` to group matching items if stage uses name mirroring
        // or actually `stage_id` if there's one. For this example, we assume `status` maps to `stage.title.toLowerCase()`
        // or the pipeline item has a `status` that corresponds to the stage ID or name.
        const normalizedStageStatus = stage.title.toLowerCase();
        
        // This is a naive matching if your schema uses `status` enum that maps to stage titles.
        // Update this logic based on how `ContentPipeline` items relate to `PipelineStage`.
        // The feedback says "contradicts the dynamic nature of COLLECTIONS.PIPELINE_STAGES".
        const stageData = data.filter((item) => {
          if (normalizedStageStatus.includes('draft')) return item.status === 'drafting';
          if (normalizedStageStatus.includes('review')) return item.status === 'review';
          if (normalizedStageStatus.includes('live') || normalizedStageStatus.includes('publish')) return item.status === 'published';
          // Fallback logic for dynamic matching if the backend uses custom statuses
          return item.status === stage.id || item.status === normalizedStageStatus as any;
        });

        // Determine specific icon per stage based on title as a visual enhancement
        let stageIcon = 'circle-dashed';
        if (normalizedStageStatus.includes('draft')) stageIcon = 'file-pen';
        if (normalizedStageStatus.includes('review')) stageIcon = 'message-square';
        if (normalizedStageStatus.includes('live')) stageIcon = 'radio';

        return (
          <PipelineStageComponent
            key={stage.id}
            title={stage.title}
            count={stageData.length}
            icon={stageIcon}
            status={normalizedStageStatus as any}
            isCollapsed={collapsedStages.includes(stage.id) || collapsedStages.includes(normalizedStageStatus)}
            onToggleCollapse={() => toggleCollapse(stage.id)}
            actionGutter={
              <>
                <span className="text-[8px] font-mono text-slate-600 vertical-text uppercase tracking-widest mb-2">Filters</span>
                <button className="w-7 h-7 flex items-center justify-center rounded border border-white/10 text-slate-500 hover:text-accent hover:border-accent/40 transition-all" title="Sort by priority">
                  <Icon name="circle-alert" className="text-[16px]" />
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded border border-white/10 text-slate-500 hover:text-accent hover:border-accent/40 transition-all" title="Batch Action">
                  <Icon name="square-check" className="text-[16px]" />
                </button>
              </>
            }
          >
            {stageData.map((content) => (
              <CompactPipelineCard key={content.id} content={content} />
            ))}
          </PipelineStageComponent>
        );
      })}
    </>
  );
};
