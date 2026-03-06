import React from 'react';
import { ContentPipeline } from '../../types/models';
import { Icon } from '../Icon';

interface PipelineCardProps {
  content: ContentPipeline;
}

export const PipelineCard: React.FC<PipelineCardProps> = ({ content }) => {
  // Map content status to display state classes
  const getStatusDisplay = () => {
    switch(content.status) {
      case 'published':
        return { tagClass: 'status-live', label: 'Live', borderClass: 'border-l-terminal-green' };
      case 'drafting':
        return { tagClass: 'status-progress', label: 'In Progress', borderClass: 'border-l-accent' };
      case 'review':
        return { tagClass: 'status-progress', label: 'Review', borderClass: 'border-l-accent' };
      default:
        return { tagClass: 'status-draft', label: content.status, borderClass: 'border-l-slate-800' };
    }
  };

  const statusDisplay = getStatusDisplay();
  const agentId = (content.id.charCodeAt(0) % 2 === 0) ? 'NEXUS_01' : 'ECHO_04'; // Mocked agent assignment based on ID

  return (
    <div className={`content-card border-l-2 ${statusDisplay.borderClass}`}>
      <div className="flex justify-between items-start">
        <div className="platform-icon">
          <Icon name="article" className="text-[18px]" />
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
          <span>AGNT: {agentId}</span>
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
