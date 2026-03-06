import React from 'react';
import { DataViewLayout } from '../components/DataViewLayout';
import { usePocketBase } from '../hooks/usePocketBase';
import { Badge } from '../components/Badge';
import { Icon } from '../components/Icon';
import { AXReport } from '../types/models';
import { COLLECTIONS } from '../constants/collections';

export const AgentExecutionReports: React.FC = () => {
  const { data, loading, error } = usePocketBase<AXReport>(COLLECTIONS.AX_REPORTS, {
    sort: '-created',
    subscribe: true,
  });

  return (
    <DataViewLayout
      title="Agent Execution Reports"
      icon="LineChart"
      loading={loading}
      error={error}
      isEmpty={data.length === 0}
    >
      <div className="space-y-6">
        {data.map((report) => (
          <div key={report.id} className="p-5 bg-background-dark/50 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.05)]">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-red-500/10">
              <div className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-red-500 animate-pulse"></div>
                <h3 className="text-sm font-mono text-slate-300 font-bold uppercase tracking-wider">Report ID: {report.id}</h3>
              </div>
              <Badge variant={report.status === 'pending' ? 'warning' : 'success'}>
                {report.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-xs font-mono text-red-400 uppercase flex items-center gap-2">
                  <Icon name="AlertCircle" className="text-sm" />
                  Error Log
                </p>
                <div className="p-4 bg-black/60 rounded border border-red-500/20 font-mono text-xs text-red-300 overflow-x-auto whitespace-pre">
                  {report.error_log}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-mono text-green-400 uppercase flex items-center gap-2">
                  <Icon name="Settings" className="text-sm" />
                  Suggested Fix
                </p>
                <div className="p-4 bg-black/60 rounded border border-green-500/20 font-mono text-xs text-green-300 overflow-x-auto whitespace-pre">
                  {report.suggested_fix}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-primary/20 text-accent border border-primary/40 rounded text-xs font-mono uppercase hover:bg-primary/30 transition-colors flex items-center gap-2">
                <Icon name="Terminal" className="text-sm" />
                Execute Fix
              </button>
            </div>
          </div>
        ))}
      </div>
    </DataViewLayout>
  );
};
