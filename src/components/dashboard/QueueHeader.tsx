import React from 'react';
import { Icon } from '../Icon';
import { QueueTelemetry } from '../../hooks/useCommunityQueue';

export const QueueHeader: React.FC<{ telemetry: QueueTelemetry }> = ({ telemetry }) => (
  <header className="mb-4 flex items-center justify-between">
    <div className="space-y-0.5">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono text-accent/60 tracking-widest uppercase">SYSTEM::QUEUE_MANAGER</span>
      </div>
      <h2 className="text-xl font-bold tracking-tight text-slate-100 font-display flex items-center gap-3 uppercase">
        <div className="p-2 rounded bg-primary/10 text-accent">
          <Icon name="smart_toy" />
        </div>
        Community Queue
      </h2>
    </div>
    <div className="flex items-center gap-6 font-mono text-[11px]">
      <div className="flex flex-col items-end">
        <span className="text-slate-500 text-[9px] uppercase tracking-tighter">Queue_Load</span>
        <span className="text-accent">{telemetry.totalEntries}</span>
      </div>
      <div className="h-8 w-px bg-accent/10"></div>
      <div className="flex flex-col items-end">
        <span className="text-slate-500 text-[9px] uppercase tracking-tighter">Node_Status</span>
        <span className="text-terminal-green flex items-center gap-1.5">
          <span className="size-1 bg-terminal-green rounded-full animate-pulse"></span>
          {telemetry.syncStatus}
        </span>
      </div>
    </div>
  </header>
);