import React from 'react';

interface DataViewLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
    isLoading?: boolean;
    error?: Error | null;
}

export default function DataViewLayout({ title, description, children, isLoading, error }: DataViewLayoutProps) {
    return (
        <div className="h-full w-full p-6 flex flex-col gap-4 overflow-hidden">
            <div className="glass-panel rounded-lg p-6">
                <h1 className="text-2xl font-bold font-mono text-accent mb-2">{title}</h1>
                <p className="text-slate-400 text-sm">{description}</p>
            </div>
            
            <div className="flex-1 glass-panel rounded-lg p-6 overflow-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-full text-red-400 font-mono">
                        Error loading data: {error.message}
                    </div>
                ) : (
                    children
                )}
            </div>
        </div>
    );
}
