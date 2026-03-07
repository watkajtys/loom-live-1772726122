import React from 'react';
import { LOG_TYPOGRAPHY } from '../../constants/theme';

export interface Log {
  id: number;
  type: string;
  title: string;
  time: string;
  msg: string;
  color: string;
  pulse?: boolean;
  isItalic?: boolean;
}

export interface LiveStreamMatrixProps {
  logs: Log[];
  agentLogs: Log[];
  hasBackgroundEffects?: boolean;
}

export const LiveStreamMatrix: React.FC<LiveStreamMatrixProps> = ({ logs, agentLogs, hasBackgroundEffects = false }) => {
  return (
    <div className={`flex-1 flex gap-2 overflow-hidden ${hasBackgroundEffects ? 'relative' : ''}`}>
      {hasBackgroundEffects && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.05)_0%,transparent_70%)] opacity-50 z-0"></div>
      )}
      <section className={`flex-1 border border-accent/30 shadow-[0_0_10px_rgba(0,242,255,0.1)] bg-black/40 flex flex-col overflow-hidden ${hasBackgroundEffects ? 'relative z-10' : ''}`}>
        <div className="h-8 border-b border-accent/20 bg-accent/5 flex items-center px-3 shrink-0 justify-between">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">SYSTEM_LOGS</span>
          <span className="text-[8px] font-mono text-slate-600">S_PRIORITY: CRITICAL</span>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
          {logs.map((log) => (
            <div key={log.id} className={`border border-accent/10 bg-black/40 p-3 mb-2 hover:border-accent/30 transition-all duration-200 relative overflow-hidden ${log.color === 'red-500' ? 'border-red-500/20' : ''}`}>
              <div className="flex justify-between items-start mb-1">
                <span className={`${LOG_TYPOGRAPHY.title} ${log.color === 'accent' ? 'text-accent' : log.color === 'terminal-green' ? 'text-terminal-green' : 'text-red-500'}`}>
                  {log.title}
                </span>
                <span className={LOG_TYPOGRAPHY.timestamp}>{log.time}</span>
              </div>
              <p className={LOG_TYPOGRAPHY.body}>{log.msg}</p>
              {log.id === 1 && (
                <div className={`mt-2 flex gap-1 ${hasBackgroundEffects ? 'telemetry-banner' : ''}`}>
                  <span className={LOG_TYPOGRAPHY.metadata}>PID: 1022</span>
                  <span className={LOG_TYPOGRAPHY.metadata}>CPU: 0.1%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      
      <section className={`flex-1 border border-accent/30 shadow-[0_0_10px_rgba(0,242,255,0.1)] bg-black/40 flex flex-col overflow-hidden ${hasBackgroundEffects ? 'relative z-10' : ''}`}>
        <div className="h-8 border-b border-accent/20 bg-accent/5 flex items-center px-3 shrink-0 justify-between">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">AGENT_LOGS</span>
          <span className="text-[8px] font-mono text-slate-600">A_PRIORITY: HIGH</span>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
          {agentLogs.map((log) => (
            <div key={log.id} className="border border-accent/10 bg-black/40 p-3 mb-2 hover:border-accent/30 transition-all duration-200 relative overflow-hidden">
              <div className="flex justify-between items-start mb-1">
                <span className={`${LOG_TYPOGRAPHY.title} flex items-center gap-1 ${log.color === 'accent' ? 'text-accent' : log.color === 'slate-400' ? 'text-slate-400' : ''}`}>
                  {log.pulse && <span className="size-1.5 bg-accent shadow-[0_0_8px_rgba(0,242,255,0.8)] animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>}
                  {log.title}
                </span>
                <span className={LOG_TYPOGRAPHY.timestamp}>{log.time}</span>
              </div>
              {log.isItalic ? (
                <div className="p-2 bg-accent/5 border-l border-accent/30 mt-1">
                  <p className="text-[10px] font-mono text-slate-300 italic">{log.msg}</p>
                </div>
              ) : (
                <p className="text-[10px] font-mono text-slate-400 leading-tight">{log.msg}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
