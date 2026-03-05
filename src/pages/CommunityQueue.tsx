import React from 'react';
import { DataViewLayout } from '../components/DataViewLayout';
import { usePocketBase } from '../hooks/usePocketBase';
import { Badge } from '../components/Badge';
import { SocialMention } from '../types/models';

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
      <div className="space-y-4">
        {data.map((mention) => (
          <div key={mention.id} className="p-4 bg-background-dark/50 rounded-lg border border-primary/20 hover:border-accent/40 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">{mention.platform}</span>
              <Badge variant={
                mention.status === 'pending' ? 'warning' :
                mention.status === 'approved' ? 'success' : 'error'
              }>
                {mention.status}
              </Badge>
            </div>
            <p className="text-sm text-slate-200 mb-4">{mention.query}</p>
            <div className="p-3 bg-black/40 rounded border border-slate-800">
              <p className="text-xs font-mono text-slate-500 mb-1 uppercase tracking-wider">Draft Reply</p>
              <p className="text-sm text-accent font-mono">{mention.draft_reply}</p>
            </div>
          </div>
        ))}
      </div>
    </DataViewLayout>
  );
};
