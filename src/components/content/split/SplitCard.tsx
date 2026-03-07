import React from 'react';
import { TransformedContentPipeline } from '../../../lib/api/content';
import { Icon } from '../../Icon';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SplitCardProps {
  content: TransformedContentPipeline;
  isOverlay?: boolean;
}

export const SplitCard: React.FC<SplitCardProps> = ({ content, isOverlay }) => {
  let borderColor = 'border-l-accent';
  let iconName = 'file-text' as any;
  let iconColor = 'text-accent';
  let bgIcon = 'bg-accent/5';
  let borderIcon = 'border-accent/20';
  
  if (content.id.includes('2')) {
    borderColor = 'border-l-warning';
    iconName = 'terminal';
    iconColor = 'text-warning';
    bgIcon = 'bg-warning/5';
    borderIcon = 'border-warning/20';
  } else if (content.id.includes('3')) {
    borderColor = 'border-l-slate-700';
    iconName = 'file';
    iconColor = 'text-slate-500';
    bgIcon = 'bg-white/5';
    borderIcon = 'border-white/10';
  }

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
      type: 'SplitCard',
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
      className={`bg-black/40 border border-white/10 p-4 hover:border-accent/30 transition-all group border-l-4 ${borderColor} ${isOverlay ? 'shadow-2xl shadow-black scale-105 cursor-grabbing' : 'cursor-grab active:cursor-grabbing'}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <div className={`w-10 h-10 ${bgIcon} border ${borderIcon} flex items-center justify-center`}>
            <Icon name={iconName} className={iconColor} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono ${iconColor}`}>#{content.id.substring(0, 8).toUpperCase()}</span>
              <span className="text-[8px] font-mono text-slate-500 bg-white/5 px-1">PRIO_HIGH</span>
            </div>
            <h4 className="text-xs font-bold text-white uppercase mt-0.5 truncate max-w-[150px]">{content.title}</h4>
          </div>
        </div>
        <button className="text-slate-500 hover:text-accent">
          <Icon name="external-link" className="text-[14px]" />
        </button>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-[9px] font-mono">
          <span className="text-slate-500 uppercase">Draft Maturity</span>
          <span className="text-terminal-green">94%</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-accent w-[94%]"></div>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 py-1.5 border border-white/10 hover:border-terminal-green hover:bg-terminal-green/5 text-[10px] font-mono uppercase text-slate-400 hover:text-terminal-green transition-all">Approve</button>
        <button className="flex-1 py-1.5 border border-white/10 hover:border-warning/50 hover:bg-warning/5 text-[10px] font-mono uppercase text-slate-400 hover:text-warning transition-all">Re-Draft</button>
      </div>
    </div>
  );
};
