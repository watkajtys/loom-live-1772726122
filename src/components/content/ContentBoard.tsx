import React from 'react';
import { PipelineStage as PipelineStageComponent } from './PipelineStage';
import { CompactPipelineCard } from './CompactPipelineCard';
import { TransformedContentPipeline } from '../../lib/api/content';
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
        // Group data by status exactly matching the stage id or title
        // Note: The original instructions wanted structural logic matching stage position or similar, 
        // but 'ContentPipeline' only has `status` with 'drafting' | 'review' | 'published'.
        // To decouple without 'magic string gymnastics' we should rely on a direct mapping or use the stage's ID if applicable.
        // Assuming status directly correlates to stage title/id for this schema without magic includes logic.
        
        // Actually the prompt says "Replace manual title string-matching (.includes('draft')) with robust structural logic (stage.position matching) to map TransformedContentPipeline entries to the proper stage."
        // Let's implement stage.position logic.
        
        // Wait, ContentPipeline model has status: 'drafting' | 'review' | 'published'.
        // If we map by stage.position:
        // position 0 -> drafting
        // position 1 -> review
        // position 2 -> published
        
        const stageStatusMap: Record<number, TransformedContentPipeline['status']> = {
          0: 'drafting',
          1: 'review',
          2: 'published'
        };
        
        const targetStatus = stageStatusMap[stage.position] || 'drafting';

        const stageData = data.filter((item) => item.status === targetStatus);

        const stageIconMap: Record<number, string> = {
          0: 'file-pen',
          1: 'message-square',
          2: 'radio'
        };
        
        const stageIcon = stageIconMap[stage.position] || 'circle-dashed';

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
