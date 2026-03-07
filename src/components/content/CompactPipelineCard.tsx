import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Icon } from '../Icon';
import { TransformedContentPipeline } from '../../lib/api/content';
import { getCompactPipelineStatusDisplay } from '../../utils/theme';

interface CompactPipelineCardProps {
  content: TransformedContentPipeline;
  isOverlay?: boolean;
}

export const CompactPipelineCard: React.FC<CompactPipelineCardProps> = ({ content, isOverlay }) => {
  const statusDisplay = getCompactPipelineStatusDisplay(content.status);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: content.id,
    data: {
      type: 'Card',
      content,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging && !isOverlay ? 0.4 : 1,
    zIndex: isDragging ? 999 : undefined,
  };

  return (
    <div 
      ref={isOverlay ? undefined : setNodeRef}
      style={style}
      {...(isOverlay ? {} : attributes)}
      {...(isOverlay ? {} : listeners)}
      className={`compact-log-card glass-panel py-2 px-3 relative overflow-hidden transition-all duration-200 hover:bg-white/[0.04] border-l-4 flex items-center gap-3 h-12 ${isOverlay ? 'cursor-grabbing scale-105 shadow-xl shadow-black/50' : 'cursor-grab active:cursor-grabbing'} ${statusDisplay.borderClass}`}
    >
      <div className="size-6 flex items-center justify-center bg-black/40 border border-white/5 text-slate-400 shrink-0">
        <Icon name={content.platformIcon} className="text-[14px]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className={`text-[10px] font-mono ${statusDisplay.textColor} font-bold shrink-0`}>
            #{content.id.substring(0, 6).toUpperCase()}
          </span>
          <h4 className="text-[11px] font-bold text-white uppercase truncate tracking-tight">
            {content.title}
          </h4>
        </div>
      </div>
      
      {statusDisplay.showSparkline && (
        <div className="flex items-end gap-[1px] h-3 w-12 shrink-0">
          <div className="w-1 bg-accent/40 rounded-t-[0.5px] h-1"></div>
          <div className="w-1 bg-accent/40 rounded-t-[0.5px] h-2"></div>
          <div className="w-1 bg-accent/40 rounded-t-[0.5px] h-3 bg-terminal-green"></div>
          <div className="w-1 bg-accent/40 rounded-t-[0.5px] h-1.5"></div>
          <div className="w-1 bg-accent/40 rounded-t-[0.5px] h-2.5"></div>
        </div>
      )}
      
      {statusDisplay.showProgress && (
        <div className="w-16 h-1 bg-white/5 shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent w-[75%]"></div>
        </div>
      )}
      
      {!statusDisplay.showSparkline && !statusDisplay.showProgress && (
        <div className={`text-[9px] font-mono ${statusDisplay.textColor} shrink-0 uppercase tracking-tighter`}>
          {statusDisplay.label}
        </div>
      )}
    </div>
  );
};
