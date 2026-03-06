import React from 'react';
import { Icon } from '../Icon';
import { TransformedContentPipeline } from '../../lib/api/content';
import { getPipelineStatusDisplay } from '../../utils/theme';

interface PipelineCardProps {
  content: TransformedContentPipeline;
}

export const PipelineCard: React.FC<PipelineCardProps> = ({ content }) => {
  const statusDisplay = getPipelineStatusDisplay(content.status);

  return (
    <div className={`content-card border-l-2 ${statusDisplay.borderClass}`}>
      <div className="flex justify-between items-start">
        <div className="platform-icon">
          <Icon name={content.platformIcon} className="text-[18px]" />
        </div>
        <div className="flex items-center gap-2">
          {content.status === 'drafting' && <div className="size-1.5 rounded-full bg-accent pulse-cyan"></div>}
          <span className={`status-tag ${statusDisplay.tagClass}`}>{statusDisplay.label}</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500">
          <span className="text-accent">#{content.id.substring(0, 6).toUpperCase()}</span>
          <span>•</span>
          <span>AGNT: {content.agentId}</span>
        </div>
        <h4 className="text-sm font-bold text-white uppercase tracking-tight line-clamp-2">{content.title}</h4>
        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
          {content.markdown_body}
        </p>
      </div>
      <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[9px]">
        <span className="text-slate-500 uppercase tracking-widest">{content.status === 'published' ? 'Published' : 'Updated'} recently</span>
      </div>
    </div>
  );
};
