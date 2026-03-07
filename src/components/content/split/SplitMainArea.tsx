import React from 'react';
import { PipelineStage } from '../../../types/models';
import { TransformedContentPipeline, mapStagePositionToStatus } from '../../../lib/api/content';
import { Icon } from '../../Icon';
import { useContentFilters } from '../../../hooks/useContentFilters';

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
          {filteredData.map((content) => {
            // Apply different border colors based on some logic if needed. 
            // In the design, different cards had different border colors. We'll alternate or use status.
            let borderColor = 'border-l-accent';
            let iconName = 'file-text' as any;
            let iconColor = 'text-accent';
            let bgIcon = 'bg-accent/5';
            let borderIcon = 'border-accent/20';
            
            // Randomly mapping styling based on ID or index to match the "split-command" vibe of the design mockup
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

            return (
              <div key={content.id} className={`bg-black/40 border border-white/10 p-4 hover:border-accent/30 transition-all group border-l-4 ${borderColor}`}>
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
                
                {/* Simulated Content Body area based on design */}
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
          })}
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
