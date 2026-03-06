import React from 'react';
import { ChannelHealth } from '../components/dashboard/ChannelHealth';
import { AgentStatusVisualization } from '../components/dashboard/AgentStatusVisualization';
import { LiveTerminalOutput } from '../components/dashboard/LiveTerminalOutput';
import { RecentIngestsPanel } from '../components/dashboard/RecentIngestsPanel';
import { SnapshotStats } from '../components/dashboard/SnapshotStats';
import { useDashboardData } from '../hooks/useDashboardData';

export const Dashboard: React.FC = () => {
  const data = useDashboardData();

  return (
    <div className="flex-1 p-6 grid grid-cols-12 grid-rows-6 gap-4 overflow-hidden relative">
      <ChannelHealth data={data.channelHealth} />
      <AgentStatusVisualization bars={data.agentVisualBars} opsPerMinute={data.opsPerMinute} />
      <LiveTerminalOutput logs={data.terminalLogs} />
      <RecentIngestsPanel ingests={data.recentIngests} />
      <SnapshotStats data={data.snapshot} />
    </div>
  );
};
