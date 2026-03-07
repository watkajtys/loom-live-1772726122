import React, { useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    if (onMoveCard) {
      // Find the stage position from the over container or item
      let newStagePosition = -1;
      
      const overId = String(over.id);
      
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
        onMoveCard(active.id as string, newStagePosition);
      }
    }
  };

  const activeCard = useMemo(
    () => data.find((item) => item.id === activeId),
    [activeId, data]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
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
      
      <DragOverlay dropAnimation={{
        sideEffects: defaultDropAnimationSideEffects({
          styles: {
            active: {
              opacity: '0.4',
            },
          },
        }),
      }}>
        {activeCard ? <CompactPipelineCard content={activeCard} isOverlay={true} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
