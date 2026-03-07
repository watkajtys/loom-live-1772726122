import React, { useMemo } from 'react';
import { PipelineStage } from '../../../types/models';
import { TransformedContentPipeline, mapStagePositionToStatus } from '../../../lib/api/content';
import { StreamColumn } from './StreamColumn';
import { StreamCard } from './StreamCard';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

interface StreamBoardProps {
  stages: PipelineStage[];
  data: TransformedContentPipeline[];
  onMoveCard?: (cardId: string, newStagePosition: number) => void;
}

export const StreamBoard: React.FC<StreamBoardProps> = ({ stages, data, onMoveCard }) => {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
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
      let newStagePosition = -1;
      const overId = String(over.id);
      
      const stage = stages.find(s => s.id === overId || String(s.position) === overId);
      if (stage) {
        newStagePosition = stage.position;
      } else {
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
      <main className="relative z-10 flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar flex bg-obsidian/40">
        {stages.map((stage) => {
          const targetStatus = mapStagePositionToStatus(stage.position);
          const stageData = data.filter((item) => item.status === targetStatus);

          return (
            <StreamColumn 
              key={stage.id} 
              stage={stage} 
              data={stageData} 
            />
          );
        })}
      </main>
      
      <DragOverlay dropAnimation={{
        sideEffects: defaultDropAnimationSideEffects({
          styles: {
            active: {
              opacity: '0.4',
            },
          },
        }),
      }}>
        {activeCard ? <StreamCard content={activeCard} stageStatus={activeCard.status} isOverlay={true} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
