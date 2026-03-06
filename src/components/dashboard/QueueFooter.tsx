import React from 'react';
import { Icon } from '../Icon';
import { QueueTelemetry } from '../../hooks/useCommunityQueue';

export const QueueFooter: React.FC<{ telemetry: QueueTelemetry }> = ({ telemetry }) => (
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