import React, { useMemo } from 'react';
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
import { PipelineStage } from '../../types/models';
import { CompactPipelineCard } from './CompactPipelineCard';
import { StreamCard } from './stream/StreamCard';
import { SplitCard } from './split/SplitCard';
import { TransformedContentPipeline } from '../../lib/api/content';

interface PipelineDragOrchestratorProps {
  children: React.ReactNode;
  data: TransformedContentPipeline[];
  stages: PipelineStage[];
  onMoveCard?: (cardId: string, newStageId: string | number) => void;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  layoutType: 'board' | 'stream' | 'split';
}

export const PipelineDragOrchestrator: React.FC<PipelineDragOrchestratorProps> = ({
  children,
  data,
  stages,
  onMoveCard,
  activeId,
  setActiveId,
  layoutType,
}) => {
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
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;
    if (active.id === over.id) return;

    if (onMoveCard) {
      onMoveCard(active.id as string, over.id as string);
    }
  };

  const activeItem = useMemo(() => data.find((item) => item.id === activeId), [activeId, data]);

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: { opacity: '0.4' },
      },
    }),
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay dropAnimation={dropAnimation}>
        {activeItem ? (
          layoutType === 'board' ? <CompactPipelineCard content={activeItem} isOverlay /> :
          layoutType === 'stream' ? <StreamCard content={activeItem} stageStatus={activeItem.status} isOverlay /> :
          <SplitCard content={activeItem} isOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
