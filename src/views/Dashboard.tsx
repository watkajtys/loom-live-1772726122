import React from 'react';
import ChannelHealth from '../components/dashboard/ChannelHealth';
import AgentStatus from '../components/dashboard/AgentStatus';
import LiveTerminal from '../components/dashboard/LiveTerminal';
import RecentIngests from '../components/dashboard/RecentIngests';
import SnapshotStats from '../components/dashboard/SnapshotStats';

export default function Dashboard() {
    return (
        <div className="h-full w-full p-6 grid grid-cols-12 grid-rows-6 gap-4 overflow-hidden">
            <ChannelHealth />
            <AgentStatus />
            <LiveTerminal />
            <RecentIngests />
            <SnapshotStats />
        </div>
    );
}
