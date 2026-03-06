import React from 'react';
import { Icon } from '../Icon';
import { TransformedContentPipeline } from '../../lib/api/content';

interface CompactPipelineCardProps {
  content: TransformedContentPipeline;
}

type CompactStatusState = 
  | { status: 'published'; borderClass: 'border-l-terminal-green'; textColor: 'text-terminal-green'; showSparkline: true; showProgress: false; label: 'LIVE' }
  | { status: 'drafting'; borderClass: 'border-l-accent'; textColor: 'text-accent'; showSparkline: false; showProgress: true; label: 'PROGRESS' }
  | { status: 'review'; borderClass: 'border-l-accent'; textColor: 'text-accent'; showSparkline: false; showProgress: true; label: 'PROGRESS' }
  | { status: string; borderClass: 'border-l-slate-700'; textColor: 'text-slate-500'; showSparkline: false; showProgress: false; label: 'DRAFT' }; // fallback

const getCompactStatusDisplay = (status: string): CompactStatusState => {
  switch (status) {
    case 'published':
      return { status: 'published', borderClass: 'border-l-terminal-green', textColor: 'text-terminal-green', showSparkline: true, showProgress: false, label: 'LIVE' };
    case 'drafting':
      return { status: 'drafting', borderClass: 'border-l-accent', textColor: 'text-accent', showSparkline: false, showProgress: true, label: 'PROGRESS' };
    case 'review':
      return { status: 'review', borderClass: 'border-l-accent', textColor: 'text-accent', showSparkline: false, showProgress: true, label: 'PROGRESS' };
    default:
      return { status, borderClass: 'border-l-slate-700', textColor: 'text-slate-500', showSparkline: false, showProgress: false, label: 'DRAFT' };
  }
};

export const CompactPipelineCard: React.FC<CompactPipelineCardProps> = ({ content }) => {
  const statusDisplay = getCompactStatusDisplay(content.status);
  
  return (
    <div className={`compact-log-card glass-panel py-2 px-3 relative overflow-hidden transition-all duration-200 hover:bg-white/[0.04] border-l-4 flex items-center gap-3 h-12 ${statusDisplay.borderClass}`}>
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
