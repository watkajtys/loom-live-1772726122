import React, { useEffect, useState, useRef } from 'react';
import { getTerminalStream, TerminalLog } from '../../utils/terminalStream';

export function LiveTerminalWidget() {
  const [logs, setLogs] = useState<TerminalLog[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add some initial mock logs to prevent the terminal from looking empty at first
    const initialLogs: TerminalLog[] = [
      { id: '1', timestamp: '14:22:01', prefix: 'INGEST_SUCCESS:', message: "Github Webhook - Repository: 'advoloom-core' - Pull Request #421", type: 'success' },
      { id: '2', timestamp: '14:22:05', prefix: 'AGENT_REPLY:', message: "Llama-3-70B processing technical query on Discord #general...", type: 'info' },
      { id: '3', timestamp: '14:22:10', prefix: 'NEURAL_MAP:', message: "Updating context vector for 'Authentication Flow' tutorials", type: 'system' }
    ];
    setLogs(initialLogs);

    const cleanup = getTerminalStream((log) => {
      setLogs((prev) => {
        const newLogs = [...prev, log];
        // Keep only last 50 logs to prevent memory leaks
        return newLogs.length > 50 ? newLogs.slice(newLogs.length - 50) : newLogs;
      });
    });

    return () => cleanup();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const getColorForType = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'info': return 'text-primary';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'system': return 'text-slate-400';
      default: return 'text-slate-200';
    }
  };

  return (
    <section className="col-span-12 lg:col-span-9 row-span-4 glass-panel rounded-lg flex flex-col overflow-hidden border-t-2 border-t-accent/30">
      <div className="bg-primary/10 px-4 py-2 border-b border-primary/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-accent text-sm">terminal</span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider">Command::Live_Log</span>
        </div>
        <div className="flex gap-1">
          <div className="size-2 rounded-full bg-slate-600"></div>
          <div className="size-2 rounded-full bg-slate-600"></div>
          <div className="size-2 rounded-full bg-slate-600"></div>
        </div>
      </div>
      <div ref={containerRef} className="flex-1 p-4 font-mono text-sm terminal-scroll overflow-y-auto bg-black/40">
        {logs.map((log) => (
          <div key={log.id} className="mb-2">
            <span className="text-accent">[{log.timestamp}]</span>{' '}
            <span className={getColorForType(log.type)}>{log.prefix}</span>{' '}
            {log.message}
          </div>
        ))}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-accent font-bold">&gt;</span>
          <div className="w-2 h-4 bg-accent animate-[pulse_1s_infinite]"></div>
        </div>
      </div>
    </section>
  );
}
