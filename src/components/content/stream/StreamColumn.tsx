import React from 'react';
import { PipelineStage } from '../../../types/models';
import { TransformedContentPipeline, mapStagePositionToStatus } from '../../../lib/api/content';
import { StreamCard } from './StreamCard';

interface StreamColumnProps {
  stage: PipelineStage;
  data: TransformedContentPipeline[];
}

const getStreamColumnStyles = (status: string) => {
  switch (status) {
    case 'drafting':
      return {
        columnBorder: '',
        countBg: 'bg-accent/10',
        countBorder: 'border-accent/20',
        countText: 'text-accent',
        divider: 'bg-accent/20',
        subtitle: 'text-slate-500',
        emptyIcon: 'text-slate-500'
      };
    case 'review':
      return {
        columnBorder: 'border-accent/20 bg-accent/[0.02]',
        countBg: 'bg-accent/20',
        countBorder: 'border-accent/40',
        countText: 'text-accent',
        divider: 'bg-accent/40',
        subtitle: 'text-accent/60',
        emptyIcon: 'text-accent/40'
      };
    case 'published':
      return {
        columnBorder: '',
        countBg: 'bg-green-400/10',
        countBorder: 'border-green-400/20',
        countText: 'text-green-400',
        divider: 'bg-green-400/20',
        subtitle: 'text-slate-500',
        emptyIcon: 'text-green-400/40'
      };
    default:
      return {
        columnBorder: '',
        countBg: 'bg-white/5',
        countBorder: 'border-white/10',
        countText: 'text-slate-500',
        divider: 'bg-white/10',
        subtitle: 'text-slate-500',
        emptyIcon: 'text-white/20'
      };
  }
};

export const StreamColumn: React.FC<StreamColumnProps> = ({ stage, data }) => {
  const status = mapStagePositionToStatus(stage.position);
  const styles = getStreamColumnStyles(status);
  
  // Create a subtitle based on stage title for the mock UI
  const getSubtitle = (title: string) => {
    const map: Record<string, string> = {
      'intake': 'SOURCE_INGESTION_DAEMON',
      'analyze': 'NEURAL_SYNAPSE_CORE',
      'generate': 'CONTENT_FABRICATOR_S1',
      'review': 'HUMAN_IN_THE_LOOP_V4',
      'deploy': 'EDGE_DELIVERY_NETWORK',
      'monitor': 'REAL_TIME_ANALYTICS'
    };
    return map[title.toLowerCase()] || `${title.toUpperCase()}_DAEMON`;
  };

  const formattedCount = data.length.toString().padStart(2, '0');

  return (
    <section className={`stream-column ${styles.columnBorder}`}>
      <header className="p-4 border-b border-white/10 bg-black/60 sticky top-0 z-20">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-sm font-bold text-white tracking-widest uppercase">{stage.title}</h3>
          <span className={`text-[10px] font-mono px-2 border ${styles.countBg} ${styles.countBorder} ${styles.countText}`}>
            {formattedCount}
          </span>
        </div>
        <div className={`w-full h-[1px] ${styles.divider}`}></div>
        <p className={`text-[9px] font-mono mt-2 ${styles.subtitle}`}>
          {getSubtitle(stage.title)}
        </p>
      </header>
      
      {data.length > 0 ? (
        <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
          {data.map(item => (
            <StreamCard key={item.id} content={item} stageStatus={status} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-center p-6">
          <div className="space-y-2 opacity-20">
            <span className="material-symbols-outlined text-4xl">cloud_queue</span>
            <p className="text-[10px] font-mono uppercase tracking-widest">Pipeline Empty</p>
          </div>
        </div>
      )}
    </section>
  );
};
