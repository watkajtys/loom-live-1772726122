import React from 'react';
import { TransformedContentPipeline } from '../../../lib/api/content';
import { getCompactPipelineStatusDisplay } from '../../../utils/theme';

interface StreamCardProps {
  content: TransformedContentPipeline;
  stageStatus: string;
}

export const StreamCard: React.FC<StreamCardProps> = ({ content, stageStatus }) => {
  const statusDisplay = getCompactPipelineStatusDisplay(content.status);
  
  // Custom mock data for terminal look
  const isProcessing = content.status === 'review';
  const isPending = content.status === 'published';
  const isQueued = content.status === 'drafting';

  let borderClass = 'border border-white/5';
  let badgeColor = 'text-accent/50';
  let badgeText = new Date(content.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  
  if (isProcessing) {
    borderClass = 'border-accent/30 shadow-[inset_0_0_20px_rgba(0,242,255,0.05)]';
    badgeColor = 'text-accent/50';
    badgeText = 'PROCESSING';
  } else if (isPending) {
    borderClass = 'border-yellow-500/30';
    badgeColor = 'text-yellow-500/60';
    badgeText = 'PENDING';
  } else if (isQueued && content.id.length % 2 === 0) {
    borderClass = 'opacity-60 border border-white/5';
    badgeColor = 'text-slate-500';
    badgeText = 'QUEUED';
  }

  return (
    <div className={`log-entry ${borderClass}`}>
      <div className={`flex justify-between text-[9px] font-mono ${badgeColor} mb-2`}>
        <span>#{content.id.substring(0, 6).toUpperCase()}</span>
        {isProcessing ? (
          <span className="animate-pulse">{badgeText}</span>
        ) : isPending ? (
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
            {badgeText}
          </span>
        ) : (
          <span>{badgeText}</span>
        )}
      </div>
      <h4 className="text-xs font-bold text-white mb-2 uppercase">{content.platform} {content.title}</h4>
      
      {isProcessing ? (
        <div className="space-y-2">
          <div className="w-full bg-white/5 h-1">
            <div className="bg-accent h-full w-[65%] shadow-[0_0_8px_#00f2ff]"></div>
          </div>
          <div className="terminal-text text-accent/80 italic">
            Analyzing keyword density in v2 docs...
          </div>
        </div>
      ) : isQueued && content.id.length % 2 === 0 ? (
        <div className="terminal-text text-slate-500">
          <p>&gt; Waiting for template...</p>
        </div>
      ) : isPending ? (
        <div className="terminal-text text-slate-400">
          <p>&gt; High complexity detected</p>
          <p>&gt; Legal approval required</p>
        </div>
      ) : (
        <div className="terminal-text text-slate-400 space-y-1">
          <p>&gt; Fetching diff data...</p>
          <p>&gt; Parsing metadata...</p>
          <p className="text-accent/70">&gt; Ready for analysis</p>
        </div>
      )}

      {/* Buttons or indicators based on status */}
      {!isProcessing && !isQueued && !isPending && (
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
          <div className="flex gap-1">
            <span className="w-1 h-1 bg-accent"></span>
            <span className="w-1 h-1 bg-accent"></span>
            <span className="w-1 h-1 bg-white/20"></span>
          </div>
          <span className="material-symbols-outlined text-slate-600 text-sm">more_horiz</span>
        </div>
      )}
      
      {/* Mock buttons for idle states */}
      {!isProcessing && !isPending && content.id.length % 2 !== 0 && stageStatus !== 'drafting' && (
        <div className="mt-4 flex gap-1">
          <button className="px-2 py-1 text-[8px] font-mono bg-white/5 border border-white/10 text-slate-400 uppercase">View</button>
          <button className="px-2 py-1 text-[8px] font-mono bg-accent/10 border border-accent/20 text-accent uppercase">Finalize</button>
        </div>
      )}
    </div>
  );
};
