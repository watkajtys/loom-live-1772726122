import React from 'react';
import DataViewLayout from '../components/layout/DataViewLayout';
import { usePocketBaseList } from '../hooks/usePocketBase';
import { RecordModel } from 'pocketbase';

interface AXReport extends RecordModel {
    error_log: string;
    suggested_fix: string;
    status: 'pending' | 'submitted';
}

export default function AXReports() {
    const { data, isLoading, error } = usePocketBaseList<AXReport>('ax_reports');

    return (
        <DataViewLayout 
            title="AX Reports" 
            description="Review identified architectural exceptions and suggested fixes."
            isLoading={isLoading}
            error={error}
        >
            {data.length === 0 ? (
                <div className="text-slate-500 font-mono text-center mt-10">No reports found.</div>
            ) : (
                <div className="flex flex-col gap-4">
                    {data.map((report) => (
                        <div key={report.id} className="p-4 bg-background-dark/50 border border-red-500/20 rounded-lg">
                            <div className="flex justify-between items-center mb-4 border-b border-red-500/10 pb-2">
                                <span className="text-xs font-mono text-slate-400">Report ID: <span className="text-accent">{report.id}</span></span>
                                <span className={`text-[10px] px-2 py-1 rounded-full uppercase border ${
                                    report.status === 'pending' ? 'border-yellow-500/50 text-yellow-500 bg-yellow-500/10' :
                                    'border-green-500/50 text-green-500 bg-green-500/10'
                                }`}>
                                    {report.status}
                                </span>
                            </div>
                            
                            <div className="mb-4">
                                <p className="text-xs font-mono text-red-400 uppercase tracking-wider mb-2">Error Log</p>
                                <div className="font-mono text-xs text-red-300/80 bg-red-950/30 p-3 rounded whitespace-pre-wrap border border-red-900/50">
                                    {report.error_log}
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-mono text-green-400 uppercase tracking-wider mb-2">Suggested Fix</p>
                                <div className="font-mono text-xs text-green-300/80 bg-green-950/20 p-3 rounded whitespace-pre-wrap border border-green-900/50">
                                    {report.suggested_fix}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </DataViewLayout>
    );
}
