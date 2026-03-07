import React, { useState } from 'react';
import { PipelineStage } from '../../../types/models';
import { TransformedContentPipeline, mapStagePositionToStatus } from '../../../lib/api/content';
import { SplitSidebar } from './SplitSidebar';
import { SplitMainArea } from './SplitMainArea';
import { PipelineDragOrchestrator } from '../PipelineDragOrchestrator';

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
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleMoveCard = (cardId: string, newStageId: string | number) => {
    if (!onMoveCard) return;

    let newStagePosition = -1;
    const overId = String(newStageId);
    
    const stage = stages.find(s => s.id === overId || String(s.position) === overId);
    if (stage) {
      newStagePosition = stage.position;
    }

    if (newStagePosition !== -1) {
      onMoveCard(cardId, newStagePosition);
    }
  };

  const activeStage = stages.find(s => s.id === activeStageId) || stages[0];

  return (
    <PipelineDragOrchestrator
      data={data}
      stages={stages}
      onMoveCard={handleMoveCard}
      activeId={activeId}
      setActiveId={setActiveId}
      layoutType="split"
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
    </PipelineDragOrchestrator>
  );
};
