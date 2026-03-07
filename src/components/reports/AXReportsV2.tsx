import React from 'react';
import { AXReportsHeader } from './AXReportsHeader';
import { AXReportsFooter } from './AXReportsFooter';
import { AgentThoughtStreamLog } from './AgentThoughtStreamLog';
import { KnowledgeCoverageMatrix } from './KnowledgeCoverageMatrix';
import { InteractionVolumeByChannel } from './InteractionVolumeByChannel';

export const AXReportsV2: React.FC = () => {
  return (
    <div className="bg-obsidian text-slate-300 font-display selection:bg-accent/30 selection:text-accent flex-1 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none z-0"></div>
      
      <AXReportsHeader />
      
      <main className="relative z-10 flex-1 flex overflow-hidden p-4 gap-4">
        <AgentThoughtStreamLog />
        
        <section className="w-[60%] flex flex-col gap-4 overflow-y-auto custom-scrollbar">
          <KnowledgeCoverageMatrix />
          <InteractionVolumeByChannel />
        </section>
      </main>

      <AXReportsFooter />
    </div>
  );
};
