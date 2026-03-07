import React, { useMemo } from 'react';
import { SortableContext } from '@dnd-kit/sortable';
import { PipelineStage as PipelineStageComponent } from './PipelineStage';
import { CompactPipelineCard } from './CompactPipelineCard';
import { TransformedContentPipeline, mapStagePositionToStatus, mapStagePositionToIcon } from '../../lib/api/content';
import { PipelineStage } from '../../types/models';
import { Icon } from '../Icon';
import { PipelineDragOrchestrator } from './PipelineDragOrchestrator';

interface ContentBoardProps {
  data: TransformedContentPipeline[];
  stages: PipelineStage[];
  collapsedStages: string[];
  toggleCollapse: (stage: string) => void;
  onMoveCard?: (cardId: string, newStagePosition: number) => void;
}

export const ContentBoard: React.FC<ContentBoardProps> = ({
  data,
  stages,
  collapsedStages,
  toggleCollapse,
  onMoveCard,
}) => {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const handleMoveCard = (cardId: string, newStageId: string | number) => {
    if (!onMoveCard) return;

    let newStagePosition = -1;
    const overId = String(newStageId);
    
    // If dropped over a stage directly
    const stage = stages.find(s => s.id === overId || String(s.position) === overId);
    if (stage) {
      newStagePosition = stage.position;
    } else {
      // If dropped over a card, find its stage
      const overCard = data.find(c => c.id === overId);
      if (overCard) {
        const targetStage = stages.find(s => mapStagePositionToStatus(s.position) === overCard.status);
        if (targetStage) {
          newStagePosition = targetStage.position;
        }
      }
    }

    if (newStagePosition !== -1) {
      onMoveCard(cardId, newStagePosition);
    }
  };

  return (
    <PipelineDragOrchestrator
      data={data}
      stages={stages}
      onMoveCard={handleMoveCard}
      activeId={activeId}
      setActiveId={setActiveId}
      layoutType="board"
    >
      {stages.map((stage) => {
        // Map stage position to corresponding business logic status using the centralized domain mapper
        const targetStatus = mapStagePositionToStatus(stage.position);
        const stageData = data.filter((item) => item.status === targetStatus);
        const stageIcon = mapStagePositionToIcon(stage.position);

        return (
          <PipelineStageComponent
            key={stage.id}
            id={String(stage.position)} // Use position as id for dropping over the stage itself if empty
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
            <SortableContext items={stageData.map(c => c.id)}>
              {stageData.map((content) => (
                <CompactPipelineCard key={content.id} content={content} />
              ))}
            </SortableContext>
          </PipelineStageComponent>
        );
      })}
    </PipelineDragOrchestrator>
  );
};
