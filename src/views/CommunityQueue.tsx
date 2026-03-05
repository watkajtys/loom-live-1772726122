import React from 'react';
import DataViewLayout from '../components/layout/DataViewLayout';
import { usePocketBaseList } from '../hooks/usePocketBase';
import { RecordModel } from 'pocketbase';

interface SocialMention extends RecordModel {
    platform: string;
    query: string;
    draft_reply: string;
    status: 'pending' | 'approved' | 'rejected';
}

export default function CommunityQueue() {
    const { data, isLoading, error } = usePocketBaseList<SocialMention>('social_mentions');

    return (
        <DataViewLayout 
            title="Community Queue" 
            description="Manage inbound social mentions and approve drafted AI responses."
            isLoading={isLoading}
            error={error}
        >
            {data.length === 0 ? (
                <div className="text-slate-500 font-mono text-center mt-10">No mentions found.</div>
            ) : (
                <div className="flex flex-col gap-4">
                    {data.map((mention) => (
                        <div key={mention.id} className="p-4 bg-background-dark/50 border border-primary/20 rounded-lg">
                            <div className="flex justify-between mb-2">
                                <span className="text-accent text-xs font-mono uppercase">{mention.platform}</span>
                                <span className={`text-[10px] px-2 py-1 rounded-full uppercase border ${
                                    mention.status === 'pending' ? 'border-yellow-500/50 text-yellow-500 bg-yellow-500/10' :
                                    mention.status === 'approved' ? 'border-green-500/50 text-green-500 bg-green-500/10' :
                                    'border-red-500/50 text-red-500 bg-red-500/10'
                                }`}>
                                    {mention.status}
                                </span>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-slate-300 font-semibold mb-1">Query:</p>
                                <p className="text-sm text-slate-400 bg-black/30 p-2 rounded">{mention.query}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-300 font-semibold mb-1">Draft Reply:</p>
                                <p className="text-sm text-slate-400 bg-primary/5 p-2 rounded border border-primary/10">{mention.draft_reply}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </DataViewLayout>
    );
}
