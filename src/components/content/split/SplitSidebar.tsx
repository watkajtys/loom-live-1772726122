import React from 'react';
import { PipelineStage } from '../../../types/models';
import { TransformedContentPipeline, mapStagePositionToStatus } from '../../../lib/api/content';
import { Icon } from '../../Icon';
import { getStageStyles } from '../../../utils/theme';

interface SplitSidebarProps {
  stages: PipelineStage[];
  data: TransformedContentPipeline[];
  activeStageId: string;
  onSelectStage: (stageId: string) => void;
}

export const SplitSidebar: React.FC<SplitSidebarProps> = ({
  stages,
  data,
  activeStageId,
  onSelectStage,
}) => {
  return (
    <nav className="w-72 border-r border-white/10 bg-black/40 flex flex-col shrink-0">
      <div className="px-4 py-3 border-b border-white/10 bg-white/[0.02]">
        <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-slate-400">Pipeline Stages</span>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {stages.map((stage) => {
          const isActive = stage.id === activeStageId;
          const targetStatus = mapStagePositionToStatus(stage.position);
          const stageData = data.filter((item) => item.status === targetStatus);
          
          // Determine status color styling based on the status (re-using theme logic roughly)
          let statusColorClass = 'bg-slate-700';
          let textColorClass = 'text-slate-500';
          let titleColorClass = 'text-slate-500';
          
          if (targetStatus === 'published') {
            statusColorClass = 'bg-terminal-green';
            textColorClass = 'text-slate-500';
            titleColorClass = 'text-slate-300';
          } else if (targetStatus === 'review') {
            statusColorClass = 'bg-accent';
            textColorClass = 'text-accent';
            titleColorClass = 'text-white';
          } else if (targetStatus === 'drafting') {
            statusColorClass = 'bg-terminal-green';
            textColorClass = 'text-slate-500';
            titleColorClass = 'text-slate-300';
          }
          
          // Example of hardcoded mapping from design to make it match closely:
          // In the design, Deployment is warning. Since we only have drafting/review/published,
          // we map review to active/accent, drafting to green, published to green.
          
          return (
            <div 
              key={stage.id}
              onClick={() => onSelectStage(stage.id)}
              className={`flex items-center gap-3 px-4 py-3 border-b border-white/5 hover:bg-white/[0.03] transition-all cursor-pointer relative overflow-hidden ${isActive ? 'bg-accent/10 border-r-2 border-r-accent' : ''}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(0,242,255,0.5)] ${statusColorClass}`}></div>
              <div className="flex-1">
                <h4 className={`text-[11px] font-bold uppercase ${isActive ? 'text-white' : titleColorClass}`}>{stage.title}</h4>
                <p className={`text-[9px] font-mono ${isActive ? 'text-accent' : textColorClass}`}>{stageData.length} ITEMS</p>
              </div>
              
              {!isActive && (
                <Icon name="chevron-right" className="text-slate-600 text-sm" />
              )}
              
              {isActive && (
                <div className="flex gap-0.5">
                  <div className="w-1 h-3 bg-accent/40"></div>
                  <div className="w-1 h-2 bg-accent/40"></div>
                  <div className="w-1 h-4 bg-accent"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10 bg-black/60">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-slate-500">Health Overview</span>
          <span className="text-[10px] font-mono text-terminal-green">98.2%</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-terminal-green w-[98%] shadow-[0_0_10px_#4ade80]"></div>
        </div>
      </div>
    </nav>
  );
};
