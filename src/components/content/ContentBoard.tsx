import React from 'react';
import { PipelineStage as PipelineStageComponent } from './PipelineStage';
import { CompactPipelineCard } from './CompactPipelineCard';
import { TransformedContentPipeline, mapStagePositionToStatus, mapStagePositionToIcon } from '../../lib/api/content';
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
        // Map stage position to corresponding business logic status using the centralized domain mapper
        const targetStatus = mapStagePositionToStatus(stage.position);
        const stageData = data.filter((item) => item.status === targetStatus);
        const stageIcon = mapStagePositionToIcon(stage.position);

        return (
          <PipelineStageComponent
            key={stage.id}
            title={stage.title}
            count={stageData.length}
            icon={stageIcon as any}
            status={targetStatus}
            isCollapsed={collapsedStages.includes(stage.id)}
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
