import React from 'react';
import { DataViewLayout } from '../components/DataViewLayout';
import { usePocketBase } from '../hooks/usePocketBase';
import { SocialMention } from '../types/models';
import { QueueItem } from '../components/QueueItem';

export const CommunityQueue: React.FC = () => {
  const { data, loading, error } = usePocketBase<SocialMention>('social_mentions', {
    sort: '-created',
    subscribe: true,
  });

  return (
    <DataViewLayout
      title="Community Queue"
      icon="smart_toy"
      loading={loading}
      error={error}
      isEmpty={data.length === 0}
    >
      <div className="space-y-3">
        {data.map((mention) => (
          <QueueItem key={mention.id} mention={mention} />
        ))}
      </div>
    </DataViewLayout>
  );
};
