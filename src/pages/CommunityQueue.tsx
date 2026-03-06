import React from 'react';
import { useQueueData } from '../hooks/useQueueData';
import { QueueItem } from '../components/QueueItem';
import { Icon } from '../components/Icon';

export const CommunityQueue: React.FC = () => {
  const { data, loading, error, telemetry } = useQueueData();

  return (
    <div className="flex-1 flex items-center justify-center p-4 h-full">
      <div className="w-full max-w-6xl glass-panel rounded-lg overflow-hidden shadow-2xl shadow-cyan-950/20 relative">
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-40"></div>
        <div className="relative z-10 flex flex-col h-[700px] max-h-full">
          <header className="flex items-center justify-between px-6 py-4 border-b border-accent/20 bg-black/40">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-accent/60 tracking-widest uppercase">SYSTEM::QUEUE_MANAGER</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-100 font-display">Active Agent Tasks</h2>
            </div>
            <div className="flex items-center gap-6 font-mono text-[11px]">
              <div className="flex flex-col items-end">
                <span className="text-slate-500 text-[9px] uppercase tracking-tighter">Total_Entries</span>
                <span className="text-accent">{telemetry.totalEntries}</span>
              </div>
              <div className="h-8 w-px bg-accent/10"></div>
              <div className="flex flex-col items-end">
                <span className="text-slate-500 text-[9px] uppercase tracking-tighter">Sync_Status</span>
                <span className="text-terminal-green flex items-center gap-1.5">
                  <span className="size-1 bg-terminal-green rounded-full animate-pulse"></span>
                  {telemetry.syncStatus}
                </span>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar relative">
            {loading && (
              <div className="absolute inset-0 bg-background-dark/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-accent font-mono text-sm uppercase tracking-widest animate-pulse">Loading Data...</p>
              </div>
            )}

            {error && !loading && (
              <div className="absolute inset-0 bg-background-dark z-10 flex flex-col items-center justify-center text-center p-6">
                <Icon name="error" className="text-red-500 text-5xl mb-4" />
                <h2 className="text-xl font-bold text-slate-100 mb-2">Error Loading Data</h2>
                <p className="text-slate-400 font-mono text-sm max-w-md">{error.message || 'An unknown error occurred while fetching data.'}</p>
              </div>
            )}

            {!loading && !error && (!data || data.length === 0) && (
              <div className="absolute inset-0 bg-background-dark/30 z-10 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-primary/20 m-4 rounded-lg">
                <Icon name="database" className="text-slate-600 text-5xl mb-4" />
                <h2 className="text-lg font-bold text-slate-300 mb-2">No Records Found</h2>
                <p className="text-slate-500 font-mono text-xs">The current data view returned 0 results.</p>
              </div>
            )}
            
            {!loading && !error && data && data.map((mention) => (
              <QueueItem key={mention.id} mention={mention} />
            ))}
          </main>

          <footer className="px-6 py-4 border-t border-accent/20 bg-black/60 flex justify-between items-center text-[10px] font-mono text-slate-500">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <span className="uppercase text-slate-600">Buffer_Utilization:</span>
                <span className="text-accent">{telemetry.bufferUtilization}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="uppercase text-slate-600">Latency:</span>
                <span className="text-terminal-green">{telemetry.latency}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Icon name="refresh" className="text-[12px] animate-pulse" />
              <span className="uppercase">Last_Sync:</span>
              <span className="text-accent">{telemetry.lastSync}</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
