import React, { useState } from 'react';
import { PipelineStage } from '../../../types/models';
import { TransformedContentPipeline, mapStagePositionToStatus } from '../../../lib/api/content';
import { StreamColumn } from './StreamColumn';
import { PipelineDragOrchestrator } from '../PipelineDragOrchestrator';

interface StreamBoardProps {
  stages: PipelineStage[];
  data: TransformedContentPipeline[];
  onMoveCard?: (cardId: string, newStagePosition: number) => void;
}

export const StreamBoard: React.FC<StreamBoardProps> = ({ stages, data, onMoveCard }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleMoveCard = (cardId: string, newStageId: string | number) => {
    if (!onMoveCard) return;

    let newStagePosition = -1;
    const overId = String(newStageId);
    
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
      layoutType="stream"
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
    </PipelineDragOrchestrator>
  );
};
