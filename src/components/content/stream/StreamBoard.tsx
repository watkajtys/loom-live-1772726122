import React from 'react';
import { PipelineStage } from '../../../types/models';
import { TransformedContentPipeline, mapStagePositionToStatus } from '../../../lib/api/content';
import { StreamColumn } from './StreamColumn';

interface StreamBoardProps {
  stages: PipelineStage[];
  data: TransformedContentPipeline[];
}

export const StreamBoard: React.FC<StreamBoardProps> = ({ stages, data }) => {
  return (
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
  );
};
