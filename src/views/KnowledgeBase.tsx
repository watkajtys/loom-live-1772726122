import React from 'react';
import DataViewLayout from '../components/layout/DataViewLayout';
import { usePocketBaseList } from '../hooks/usePocketBase';
import { RecordModel } from 'pocketbase';

interface KnowledgeSource extends RecordModel {
    source_type: 'sdk_repo' | 'docs_url' | 'github_issues' | 'forum';
    url: string;
    vectorization_status: 'pending' | 'processing' | 'vectorized' | 'failed';
    last_synced: string;
}

export default function KnowledgeBase() {
    const { data, isLoading, error } = usePocketBaseList<KnowledgeSource>('knowledge_sources');

    return (
        <DataViewLayout 
            title="Knowledge Base" 
            description="Manage context sources and vectorization status."
            isLoading={isLoading}
            error={error}
        >
            {data.length === 0 ? (
                <div className="text-slate-500 font-mono text-center mt-10">No knowledge sources found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-primary/20 text-xs font-mono text-slate-400 uppercase tracking-wider">
                                <th className="p-3">Source Type</th>
                                <th className="p-3">URL</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Last Synced</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((source) => (
                                <tr key={source.id} className="border-b border-primary/10 hover:bg-background-dark/50 transition-colors">
                                    <td className="p-3">
                                        <span className="text-accent text-xs font-mono uppercase">{source.source_type.replace('_', ' ')}</span>
                                    </td>
                                    <td className="p-3">
                                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-300 hover:text-primary transition-colors hover:underline truncate max-w-[300px] block">
                                            {source.url}
                                        </a>
                                    </td>
                                    <td className="p-3">
                                        <span className={`text-[10px] px-2 py-1 rounded-full uppercase border font-mono ${
                                            source.vectorization_status === 'vectorized' ? 'border-green-500/50 text-green-500 bg-green-500/10' :
                                            source.vectorization_status === 'failed' ? 'border-red-500/50 text-red-500 bg-red-500/10' :
                                            source.vectorization_status === 'processing' ? 'border-blue-500/50 text-blue-500 bg-blue-500/10' :
                                            'border-yellow-500/50 text-yellow-500 bg-yellow-500/10'
                                        }`}>
                                            {source.vectorization_status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-xs text-slate-500 font-mono">
                                        {source.last_synced ? new Date(source.last_synced).toLocaleString() : 'Never'}
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
