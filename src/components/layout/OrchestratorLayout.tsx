import React, { ReactNode } from 'react';
import { Icon, IconName } from '../Icon';

export interface OrchestratorLayoutProps {
  variantTitle: string;
  variantSubtitle: string;
  iconName: IconName;
  statusText: string;
  statusPulse: boolean;
  statusValue: string;
  uptimeText: string;
  uptimeValue: string;
  children: ReactNode;
  sidebarHeader?: ReactNode;
  sidebarContent: ReactNode;
  footerContent: ReactNode;
}

export const OrchestratorLayout: React.FC<OrchestratorLayoutProps> = ({
  variantTitle,
  variantSubtitle,
  iconName,
  statusText,
  statusPulse,
  statusValue,
  uptimeText,
  uptimeValue,
  children,
  sidebarHeader,
  sidebarContent,
  footerContent
}) => {
  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-obsidian text-slate-300 font-display selection:bg-accent/30 selection:text-accent">
      <div className="absolute inset-0 grid-bg matrix-bg-text pointer-events-none z-0"></div>
      
      <header className="relative z-40 h-12 border-b border-accent/30 bg-black flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border border-accent flex items-center justify-center">
              <Icon name={iconName} className="text-accent text-sm" />
            </div>
            <div className="leading-none">
              <h1 className="text-sm font-bold text-white tracking-widest uppercase">{variantTitle}</h1>
              <span className="text-[8px] font-mono text-accent/60 tracking-[0.4em]">{variantSubtitle}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-[10px] font-mono">
            <span className="text-slate-500">{statusText}:</span>
            <span className={`text-terminal-green ${statusPulse ? 'animate-pulse' : ''}`}>{statusValue}</span>
            <span className="text-slate-500 ml-2">{uptimeText}:</span>
            <span className="text-accent">{uptimeValue}</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative z-10 p-2 gap-2">
        {children}
        
        <aside className="w-72 border border-accent/30 shadow-[0_0_10px_rgba(0,242,255,0.1)] bg-black/60 backdrop-blur-md flex flex-col shrink-0 relative">
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="w-full h-full bg-[linear-gradient(rgba(0,242,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
          </div>
          <div className="p-3 border-b border-accent/20 bg-accent/5 flex justify-between items-center relative z-20">
            {sidebarHeader || <span className="text-[10px] font-bold text-accent uppercase tracking-widest">03_ENGINE_STATS</span>}
          </div>
          {sidebarContent}
        </aside>
      </div>
      
      <footer className="h-6 border-t border-accent/30 bg-black px-6 flex items-center justify-between relative z-40 shrink-0">
        {footerContent}
      </footer>
    </div>
  );
};
