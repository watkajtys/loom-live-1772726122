import React, { useEffect, useState } from 'react';
import { pb } from '../lib/pb';

export function CommunityQueue() {
  const [mentions, setMentions] = useState<any[]>([]);

  useEffect(() => {
    const fetchMentions = async () => {
      try {
        const records = await pb.collection('social_mentions').getFullList();
        setMentions(records);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMentions();

    pb.collection('social_mentions').subscribe('*', function (e) {
      if (e.action === 'create') {
        setMentions((prev) => [...prev, e.record]);
      } else if (e.action === 'update') {
        setMentions((prev) => prev.map(m => m.id === e.record.id ? e.record : m));
      } else if (e.action === 'delete') {
        setMentions((prev) => prev.filter(m => m.id !== e.record.id));
      }
    });

    return () => {
      pb.collection('social_mentions').unsubscribe('*');
    };
  }, []);

  return (
    <div className="flex-1 p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold font-mono mb-4 text-accent">Community Queue</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mentions.map((mention) => (
          <div key={mention.id} className="glass-panel p-4 rounded-lg flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-xs uppercase font-mono text-slate-400">{mention.platform}</span>
              <span className={`text-[10px] px-2 py-1 rounded font-mono ${
                mention.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                mention.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>{mention.status}</span>
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
