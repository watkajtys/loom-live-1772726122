import React from 'react';
import { usePocketBase } from '../hooks/usePocketBase';
import { SocialMention } from '../types';
import { StatusBadge } from '../components/ui/Badge';

export function CommunityQueue() {
  const { data: mentions, loading, error } = usePocketBase<SocialMention>('social_mentions');

  if (loading) return <div className="p-6 font-mono text-accent">Loading Community Queue...</div>;
  if (error) return <div className="p-6 font-mono text-red-500">Error loading Community Queue: {error.message}</div>;

  return (
    <div className="flex-1 p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold font-mono mb-4 text-accent">Community Queue</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mentions.map((mention) => (
          <div key={mention.id} className="glass-panel p-4 rounded-lg flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-xs uppercase font-mono text-slate-400">{mention.platform}</span>
              <StatusBadge status={mention.status} />
            </div>
            <p className="text-sm">{mention.query}</p>
            {mention.draft_reply && (
              <div className="mt-2 p-2 bg-background-dark/50 rounded text-xs border border-primary/20">
                <span className="block text-[10px] uppercase text-primary mb-1 font-mono">Draft Reply</span>
                {mention.draft_reply}
              </div>
            )}
          </div>
        ))}
        {mentions.length === 0 && (
          <div className="col-span-full text-center text-slate-500 font-mono py-10">
            No mentions in the queue.
          </div>
        )}
      </div>
    </div>
  );
}
