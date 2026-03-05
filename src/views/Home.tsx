import React from 'react';
import { ChannelHealthWidget } from '../components/widgets/ChannelHealthWidget';
import { AgentStatusWidget } from '../components/widgets/AgentStatusWidget';
import { LiveTerminalWidget } from '../components/widgets/LiveTerminalWidget';
import { RecentIngestsWidget } from '../components/widgets/RecentIngestsWidget';
import { SnapshotStatsWidget } from '../components/widgets/SnapshotStatsWidget';

export function Home() {
  return (
    <div className="flex-1 p-6 grid grid-cols-12 grid-rows-6 gap-4 overflow-hidden h-full">
      <ChannelHealthWidget />
      <AgentStatusWidget />
      <LiveTerminalWidget />
      <RecentIngestsWidget />
      <SnapshotStatsWidget />
    </div>
  );
}
