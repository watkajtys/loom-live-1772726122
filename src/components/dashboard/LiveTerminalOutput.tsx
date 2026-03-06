import React from 'react';
import { Icon } from '../Icon';
import type { TerminalLog } from '../../hooks/useDashboardData';

interface LiveTerminalOutputProps {
  logs: TerminalLog[];
}

export const LiveTerminalOutput: React.FC<LiveTerminalOutputProps> = ({ logs }) => (
  <section className="col-span-12 lg:col-span-9 row-span-4 glass-panel rounded-lg flex flex-col overflow-hidden border-t-2 border-t-accent/30">
    <div className="bg-primary/10 px-4 py-2 border-b border-primary/20 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon name="Terminal" className="text-accent text-sm" />
        <span className="text-xs font-mono font-bold uppercase tracking-wider">Command::Live_Log</span>
      </div>
      <div className="flex gap-1">
        <div className="size-2 rounded-full bg-slate-600"></div>
        <div className="size-2 rounded-full bg-slate-600"></div>
        <div className="size-2 rounded-full bg-slate-600"></div>
      </div>
    </div>
    <div className="flex-1 p-4 font-mono text-sm terminal-scroll overflow-y-auto bg-black/40">
      {logs.map((log, i) => (
        <div key={i} className="mb-2">
          <span className="text-accent">[{log.time}]</span>{' '}
          <span className={log.typeColor}>{log.type}</span> {log.message}
        </div>
      ))}
      <div className="flex items-center gap-2">
        <span className="text-accent font-bold">&gt;</span>
        <div className="w-2 h-4 bg-accent animate-[pulse_1s_infinite]"></div>
      </div>
    </div>
  </section>
);
