import React from 'react';
import { ChannelHealth } from '../components/dashboard/ChannelHealth';
import { AgentStatusVisualization } from '../components/dashboard/AgentStatusVisualization';
import { LiveTerminalOutput } from '../components/dashboard/LiveTerminalOutput';
import { RecentIngestsPanel } from '../components/dashboard/RecentIngestsPanel';
import { SnapshotStats } from '../components/dashboard/SnapshotStats';

export const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 p-6 grid grid-cols-12 grid-rows-6 gap-4 overflow-hidden">
      <ChannelHealth />
      <AgentStatusVisualization />
      <LiveTerminalOutput />
      <RecentIngestsPanel />
      <SnapshotStats />
    </div>
  );
};
