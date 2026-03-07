import React from 'react';
import { Link } from 'react-router-dom';

interface KnowledgeLayoutProps {
  title: string;
  subtitle: string;
  icon: string;
  headerStats: React.ReactNode;
  headerStatus: React.ReactNode;
  footerStats: React.ReactNode;
  footerStatus: React.ReactNode;
  footerVersion: string;
  viewLink: string;
  viewIcon: string;
  viewTitle: string;
  children: React.ReactNode;
}

export const KnowledgeLayout: React.FC<KnowledgeLayoutProps> = ({
  title,
  subtitle,
  icon,
  headerStats,
  headerStatus,
  footerStats,
  footerStatus,
  footerVersion,
  viewLink,
  viewIcon,
  viewTitle,
  children
}) => {
  return (
    <div className="flex-1 flex flex-col relative bg-obsidian text-slate-300 font-display selection:bg-accent/30 selection:text-accent overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTYwIDBMMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLCAyNDIsIDI1NSwgMC4wMikiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] pointer-events-none z-0"></div>
      <div className="absolute inset-0 grid-bg pointer-events-none z-0"></div>

      <header className="relative z-30 h-14 bg-black/80 backdrop-blur-xl flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-accent/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-accent text-lg">{icon}</span>
            </div>
            <div className="leading-none">
              <h1 className="text-lg font-bold text-white tracking-tight uppercase">{title}</h1>
              <span className="text-[9px] font-mono text-accent/60 tracking-[0.3em]">{subtitle}</span>
            </div>
          </div>
          <div className="h-6 w-[1px] bg-white/10 hidden md:block"></div>
          <div className="hidden md:flex items-center gap-6">
            {headerStats}
            {headerStatus && (
              <div className="flex flex-col pl-6">
                <span className="text-[8px] font-mono text-slate-500 uppercase">Sync Status</span>
                <span className="text-xs font-mono text-terminal-green">{headerStatus}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-1.5 bg-white/5 text-[10px] font-mono uppercase tracking-widest text-slate-400">
            <span className="text-terminal-green animate-pulse">●</span>
            SYS_HEALTH: OPTIMAL
          </div>
          <Link to={viewLink} className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all" title={viewTitle}>
            <span className="material-symbols-outlined text-xl">{viewIcon}</span>
          </Link>
        </div>
      </header>

      {children}

      <footer className="h-8 bg-black/90 px-6 flex items-center justify-between relative z-30 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-terminal-green animate-pulse shadow-[0_0_6px_#00ff41]"></span>
            <span className="text-[9px] font-mono text-terminal-green uppercase tracking-tighter">{footerStatus}</span>
          </div>
          {footerStats}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-white/10"></div>
            <div className="w-2 h-2 bg-accent/20"></div>
            <div className="w-2 h-2 bg-white/10"></div>
          </div>
          <span className="text-[9px] font-mono text-slate-600">{footerVersion}</span>
          <span className="text-[9px] font-mono text-slate-600">© ADVOLOOM_SYSTEMS_2024</span>
        </div>
      </footer>
    </div>
  );
};
