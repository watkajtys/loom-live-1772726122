import React from 'react';
import { PipelineStage } from '../../../types/models';
import { TransformedContentPipeline, mapStagePositionToStatus } from '../../../lib/api/content';
import { Icon } from '../../Icon';
import { useContentFilters } from '../../../hooks/useContentFilters';
import { SplitCard } from './SplitCard';
import { SortableContext } from '@dnd-kit/sortable';

interface SplitMainAreaProps {
  stage: PipelineStage | undefined;
  data: TransformedContentPipeline[];
}

export const SplitMainArea: React.FC<SplitMainAreaProps> = ({ stage, data }) => {
  const { searchQuery, handleSearch } = useContentFilters();
  
  const targetStatus = stage ? mapStagePositionToStatus(stage.position) : 'drafting';
  const filteredData = data.filter((item) => item.status === targetStatus);

  return (
    <main className="flex-1 flex flex-col bg-black/20 overflow-hidden">
      <header className="h-14 flex items-center justify-between px-6 border-b border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-accent/10 rounded border border-accent/20">
            <Icon name="clipboard-check" className="text-accent text-[18px]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              Active Management: {stage ? stage.title : 'REVIEW'}
              <span className="px-1.5 py-0.5 rounded bg-accent/10 text-accent text-[9px] border border-accent/20">FOCUS_MODE</span>
            </h3>
            <p className="text-[10px] font-mono text-slate-500 tracking-tight">INSPECTING AGENT OUTPUTS FOR COMPLIANCE AND TONE</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 border border-white/10 rounded px-2 py-1 bg-black/40">
            <Icon name="search" className="text-[14px] text-slate-400" />
            <input 
              className="bg-transparent border-none text-[10px] font-mono focus:ring-0 text-white w-32 placeholder:text-slate-600 outline-none" 
              placeholder="FILTER_WORKSPACE..." 
              type="text"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="h-6 w-px bg-white/10"></div>
          <button className="text-slate-500 hover:text-white transition-colors">
            <Icon name="settings" className="text-[20px]" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <div className="grid grid-cols-2 gap-4">
          <SortableContext items={filteredData.map(d => d.id)}>
            {filteredData.map((content) => (
              <SplitCard key={content.id} content={content} />
            ))}
          </SortableContext>
        </div>
      </div>

      <aside className="h-20 border-t border-white/10 bg-black/60 flex items-center px-6 gap-6 shrink-0">
        <div className="flex-1 flex gap-8">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-slate-500 mb-1">Queue Status</span>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                <div className="w-3 h-3 bg-accent"></div>
                <div className="w-3 h-3 bg-accent"></div>
                <div className="w-3 h-3 bg-white/10"></div>
                <div className="w-3 h-3 bg-white/10"></div>
                <div className="w-3 h-3 bg-white/10"></div>
              </div>
              <span className="text-[10px] font-mono text-white">2/8 REVIEWED</span>
            </div>
          </div>
          <div className="h-10 w-px bg-white/10"></div>
          <div className="flex flex-col">
            <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-slate-500 mb-1">Verification Agent</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-terminal-green"></span>
              <span className="text-[10px] font-mono text-white uppercase tracking-wider">ACTIVE_01_SONIC</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 border border-white/10 text-slate-500 hover:text-white transition-all">
            <Icon name="refresh-cw" className="text-[16px]" />
          </button>
          <button className="px-6 py-2 bg-accent text-obsidian text-[11px] font-bold uppercase tracking-widest hover:brightness-110 transition-all">
            Submit_Batch
          </button>
        </div>
      </aside>
    </main>
  );
};
