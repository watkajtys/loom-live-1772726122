import React from 'react';
import { DataViewLayout } from '../components/DataViewLayout';
import { usePocketBase } from '../hooks/usePocketBase';
import { SocialMention } from '../types';
import { Badge } from '../components/Badge';

export function CommunityQueue() {
  const { data: mentions, isLoading, error } = usePocketBase<SocialMention>('social_mentions');

  return (
    <DataViewLayout title="Community Queue">
      {isLoading && <p className="text-slate-400 font-mono text-sm">Loading social mentions...</p>}
      {error && <p className="text-red-400 font-mono text-sm">Error: {error.message}</p>}
      {!isLoading && !error && mentions.length === 0 && (
        <p className="text-slate-400 font-mono text-sm">No social mentions found.</p>
      )}
      {!isLoading && mentions.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-mono text-slate-300">
            <thead className="bg-primary/10 text-accent uppercase text-xs">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Platform</th>
                <th className="px-4 py-3">Query</th>
                <th className="px-4 py-3">Draft Reply</th>
                <th className="px-4 py-3 rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {mentions.map((mention) => (
                <tr key={mention.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                  <td className="px-4 py-3 capitalize">{mention.platform}</td>
                  <td className="px-4 py-3">{mention.query}</td>
                  <td className="px-4 py-3 text-slate-400 line-clamp-1">{mention.draft_reply || '-'}</td>
                  <td className="px-4 py-3">
                    <Badge variant={mention.status === 'approved' ? 'success' : mention.status === 'rejected' ? 'error' : 'warning'}>
                      {mention.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DataViewLayout>
  );
}