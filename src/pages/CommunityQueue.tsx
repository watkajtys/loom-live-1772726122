import React from 'react';
import { useQueueData } from '../hooks/useQueueData';
import { QueueItem } from '../components/QueueItem';
import { DataViewLayout } from '../components/DataViewLayout';
import { QueueHeader } from '../components/dashboard/QueueHeader';
import { QueueFooter } from '../components/dashboard/QueueFooter';

export const CommunityQueue: React.FC = () => {
  const { data, loading, error, telemetry } = useQueueData();

  return (
    <DataViewLayout
      title="Active Agent Tasks"
      icon="Bot"
      loading={loading}
      error={error}
      isEmpty={!data || data.length === 0}
      customHeader={<QueueHeader telemetry={telemetry} />}
      customFooter={<QueueFooter telemetry={telemetry} />}
    >
      <div className="space-y-3 relative z-10">
        {data && data.map((mention) => (
          <QueueItem key={mention.id} mention={mention} />
        ))}
      </div>
    </DataViewLayout>
  );
};
