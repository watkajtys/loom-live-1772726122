import React, { useMemo } from 'react';
import { PipelineStage } from '../../../types/models';
import { TransformedContentPipeline, mapStagePositionToStatus } from '../../../lib/api/content';
import { SplitSidebar } from './SplitSidebar';
import { SplitMainArea } from './SplitMainArea';
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
import { SplitCard } from './SplitCard'; // we will create this from SplitMainArea's inner card rendering

interface SplitBoardProps {
  stages: PipelineStage[];
  data: TransformedContentPipeline[];
  activeStageId: string;
  onSelectStage: (stageId: string) => void;
  onMoveCard?: (cardId: string, newStagePosition: number) => void;
}

export const SplitBoard: React.FC<SplitBoardProps> = ({
  stages,
  data,
  activeStageId,
  onSelectStage,
  onMoveCard,
}) => {
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

  const activeStage = stages.find(s => s.id === activeStageId) || stages[0];

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex-1 flex overflow-hidden relative z-10 w-full">
        <SplitSidebar 
          stages={stages} 
          data={data} 
          activeStageId={activeStage?.id || ''} 
          onSelectStage={onSelectStage} 
        />
        <SplitMainArea 
          stage={activeStage} 
          data={data} 
        />
      </div>
      <DragOverlay dropAnimation={{
        sideEffects: defaultDropAnimationSideEffects({
          styles: {
            active: {
              opacity: '0.4',
            },
          },
        }),
      }}>
        {activeCard ? <SplitCard content={activeCard} isOverlay={true} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
