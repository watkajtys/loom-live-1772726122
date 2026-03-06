import React from 'react';
import { DataViewLayout } from '../components/DataViewLayout';
import { useQueueData } from '../hooks/useQueueData';
import { QueueItem } from '../components/QueueItem';
import { Icon } from '../components/Icon';

export const CommunityQueue: React.FC = () => {
  const { data, loading, error, telemetry } = useQueueData();

  const customHeader = (
    <div className="flex items-center justify-between border-b border-accent/20 pb-4 mb-8">
      <div>
        <h1 className="text-xs font-mono text-accent tracking-[0.2em] uppercase">System::Queue_Manager</h1>
        <p className="text-2xl font-bold tracking-tight">Active Agent Tasks</p>
      </div>
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="text-slate-500">TOTAL_ENTRIES:</span>
        <span className="text-accent">{telemetry.totalEntries}</span>
        <div className="h-4 w-px bg-accent/20"></div>
        <span className="text-slate-500">SYNC_STATUS:</span>
        <span className="text-terminal-green uppercase">{telemetry.syncStatus}</span>
      </div>
    </div>
  );

  const customFooter = (
    <div className="mt-8 pt-4 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-600">
      <div className="flex gap-4">
        <span>BUFFER_UTILIZATION: {telemetry.bufferUtilization}</span>
        <span>LATENCY: {telemetry.latency}</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon name="update" className="text-[10px]" />
        <span>LAST_SYNC: {telemetry.lastSync}</span>
      </div>
    </div>
  );

  return (
    <DataViewLayout
      title="Community Queue"
      icon="smart_toy"
      loading={loading}
      error={error}
      isEmpty={!loading && !error && (!data || data.length === 0)}
      customHeader={customHeader}
      customFooter={customFooter}
    >
      <div className="space-y-3">
        {data && data.map((mention) => (
          <QueueItem key={mention.id} mention={mention} />
        ))}
      </div>
    </DataViewLayout>
  );
};
