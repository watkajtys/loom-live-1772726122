import React from 'react';
import { PipelineStage } from '../../../types/models';
import { TransformedContentPipeline } from '../../../lib/api/content';
import { SplitSidebar } from './SplitSidebar';
import { SplitMainArea } from './SplitMainArea';

interface SplitBoardProps {
  stages: PipelineStage[];
  data: TransformedContentPipeline[];
  activeStageId: string;
  onSelectStage: (stageId: string) => void;
}

export const SplitBoard: React.FC<SplitBoardProps> = ({
  stages,
  data,
  activeStageId,
  onSelectStage,
}) => {
  const activeStage = stages.find(s => s.id === activeStageId) || stages[0];

  return (
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
  );
};
