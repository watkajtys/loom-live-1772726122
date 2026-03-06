import React from 'react';
import { useQueueData, QueueTelemetry } from '../hooks/useQueueData';
import { QueueItem } from '../components/QueueItem';
import { Icon } from '../components/Icon';
import { DataViewLayout } from '../components/DataViewLayout';

const CustomHeader: React.FC<{ telemetry: QueueTelemetry }> = ({ telemetry }) => (
  <header className="mb-6 flex items-center justify-between">
    <div className="space-y-0.5">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono text-accent/60 tracking-widest uppercase">SYSTEM::QUEUE_MANAGER</span>
      </div>
      <h2 className="text-xl font-bold tracking-tight text-slate-100 font-display flex items-center gap-3">
        <div className="p-2 rounded bg-primary/10 text-accent">
          <Icon name="Bot" />
        </div>
        Active Agent Tasks
      </h2>
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
);

const CustomFooter: React.FC<{ telemetry: QueueTelemetry }> = ({ telemetry }) => (
  <footer className="px-6 py-4 border-t border-accent/20 bg-black/60 flex justify-between items-center text-[10px] font-mono text-slate-500 rounded-b-lg">
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
      <Icon name="RefreshCw" className="text-[12px] animate-pulse" />
      <span className="uppercase">Last_Sync:</span>
      <span className="text-accent">{telemetry.lastSync}</span>
    </div>
  </footer>
);

export const CommunityQueue: React.FC = () => {
  const { data, loading, error, telemetry } = useQueueData();

  return (
    <DataViewLayout
      title="Active Agent Tasks"
      icon="Bot"
      loading={loading}
      error={error}
      isEmpty={!data || data.length === 0}
      customHeader={<CustomHeader telemetry={telemetry} />}
      customFooter={<CustomFooter telemetry={telemetry} />}
    >
      <div className="space-y-3 relative z-10">
        {data && data.map((mention) => (
          <QueueItem key={mention.id} mention={mention} />
        ))}
      </div>
    </DataViewLayout>
  );
};
