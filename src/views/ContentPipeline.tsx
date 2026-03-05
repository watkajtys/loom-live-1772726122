import React from 'react';
import DataViewLayout from '../components/layout/DataViewLayout';
import { usePocketBaseList } from '../hooks/usePocketBase';
import { RecordModel } from 'pocketbase';

interface ContentPipeline extends RecordModel {
    title: string;
    markdown_body: string;
    status: 'drafting' | 'review' | 'published';
}

export default function ContentPipelineView() {
    const { data, isLoading, error } = usePocketBaseList<ContentPipeline>('content_pipeline');

    return (
        <DataViewLayout 
            title="Content Pipeline" 
            description="Track technical content generation and publish status."
            isLoading={isLoading}
            error={error}
        >
            {data.length === 0 ? (
                <div className="text-slate-500 font-mono text-center mt-10">No content found.</div>
            ) : (
                <div className="flex flex-col gap-4">
                    {data.map((content) => (
                        <div key={content.id} className="p-4 bg-background-dark/50 border border-primary/20 rounded-lg">
                            <div className="flex justify-between items-center mb-4 border-b border-primary/10 pb-2">
                                <h3 className="text-lg text-slate-200 font-bold">{content.title}</h3>
                                <span className={`text-[10px] px-2 py-1 rounded-full uppercase border ${
                                    content.status === 'drafting' ? 'border-primary/50 text-primary bg-primary/10' :
                                    content.status === 'review' ? 'border-yellow-500/50 text-yellow-500 bg-yellow-500/10' :
                                    'border-green-500/50 text-green-500 bg-green-500/10'
                                }`}>
                                    {content.status}
                                </span>
                            </div>
                            <div className="font-mono text-sm text-slate-400 bg-black/40 p-4 rounded whitespace-pre-wrap">
                                {content.markdown_body}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </DataViewLayout>
    );
}
