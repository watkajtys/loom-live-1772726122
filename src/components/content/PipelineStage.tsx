import React from 'react';
import { Icon, SemanticIconName } from '../Icon';
import { getStageStyles } from '../../utils/theme';

import { useDroppable } from '@dnd-kit/core';

export interface PipelineStageProps {
  id?: string;
  title: string;
  count: number;
  icon: SemanticIconName;
  status: 'drafting' | 'review' | 'published';
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  actionGutter?: React.ReactNode;
  children: React.ReactNode;
}

export const PipelineStage: React.FC<PipelineStageProps> = ({
  id,
  title,
  count,
  icon,
  status,
  isCollapsed,
  onToggleCollapse,
  actionGutter,
  children,
}) => {
  const { setNodeRef } = useDroppable({
    id: id || title,
    data: {
      type: 'Stage',
      status,
    },
  });

  const styles = getStageStyles(status);

  const stageColumnBaseClass = "flex flex-col h-full bg-black/40 border-x border-white/5 transition-all duration-300 relative";
  const actionGutterBaseClass = "w-10 flex flex-col items-center py-4 border-l border-white/10 bg-black/60 gap-4 shrink-0";

  if (isCollapsed) {
    return (
      <section className={`stage-column ${stageColumnBaseClass} w-12 overflow-hidden shrink-0 ${styles.collapsedBorder}`}>
        <header 
          className={`h-14 flex flex-col items-center justify-center gap-4 ${styles.collapsedBg} border-b border-white/10 pt-2 cursor-pointer transition-colors`}
          onClick={onToggleCollapse}
        >
          <Icon name="chevrons-right" className={`text-[14px] ${styles.iconColor}`} />
          <span className={`vertical-text text-[10px] font-bold ${styles.iconColor} uppercase tracking-widest pb-4`}>
            {title.replace(' ', '_')}
          </span>
        </header>
        <div className="flex-1 flex flex-col items-center py-4 gap-2 opacity-30">
          <div className="w-6 h-6 border border-white/20"></div>
          <div className="w-6 h-6 border border-white/20"></div>
          <div className="w-6 h-6 border border-white/20"></div>
        </div>
      </section>
    );
  }

  return (
    <section ref={setNodeRef} className={`stage-column ${stageColumnBaseClass} w-[380px] shrink-0 ${status === 'published' ? 'bg-black/60' : ''}`}>
      <header className={`h-14 flex items-center justify-between px-4 border-b border-white/10 ${styles.headerBg}`}>
        <div className="flex items-center gap-3">
          <Icon name={icon} className={`text-[18px] ${styles.iconColor}`} />
          <div>
            <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">{title}</h3>
            <p className={`text-[9px] font-mono ${styles.countColor}`}>{count} TOTAL</p>
          </div>
        </div>
        <button 
          onClick={onToggleCollapse}
          className="hover:text-accent text-slate-500 transition-colors"
        >
          <Icon name="chevrons-left" className="text-[18px]" />
        </button>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar min-h-[100px]">
          {children}
        </div>
        
        {actionGutter && (
          <aside className={`${actionGutterBaseClass} ${status === 'published' ? 'border-l border-white/5' : ''}`}>
            {actionGutter}
          </aside>
        )}
      </div>
    </section>
  );
};
