import React from 'react';
import { useCommunityQueue } from '../hooks/useCommunityQueue';
import { QueueItem } from '../components/QueueItem';
import { QueueItemSkeleton } from '../components/QueueItemSkeleton';
import { QueueControls } from '../components/QueueControls';
import { Icon } from '../components/Icon';
import { DataViewLayout } from '../components/DataViewLayout';
import { QueueHeader } from '../components/dashboard/QueueHeader';
import { QueueFooter } from '../components/dashboard/QueueFooter';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const CommunityQueue: React.FC = () => {
  const { data, loading, error, telemetry } = useCommunityQueue();

  return (
    <ErrorBoundary fallbackMessage="Failed to load Community Queue data. Please try again later.">
      <DataViewLayout
        title="Active Agent Tasks"
        icon="bot"
        loading={false} // Disable default layout spinner since we use skeletons
        error={error}
        isEmpty={!loading && (!data || data.length === 0)}
        customHeader={
          <>
            <QueueHeader telemetry={telemetry} />
            <QueueControls />
          </>
        }
        customFooter={<QueueFooter telemetry={telemetry} />}
      >
        <div className="space-y-3 relative z-10">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <QueueItemSkeleton key={`skeleton-${index}`} />
            ))
          ) : (
            data && data.map((mention) => (
              <QueueItem key={mention.id} mention={mention} />
            ))
          )}
        </div>
      </DataViewLayout>
    </ErrorBoundary>
  );
};
