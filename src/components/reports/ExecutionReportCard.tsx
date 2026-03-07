import React from 'react';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
import { AXReport } from '../../types/models';

interface ExecutionReportCardProps {
  report: AXReport;
}

export const ExecutionReportCard: React.FC<ExecutionReportCardProps> = ({ report }) => {
  return (
    <div className="p-5 bg-background-dark/50 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-colors shadow-[0_0_15px_theme(colors.red.500/5%)]">
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
            <Icon name="circle-alert" className="text-sm" />
            Error Log
          </p>
          <div className="p-4 bg-black/60 rounded border border-red-500/20 font-mono text-xs text-red-300 overflow-x-auto whitespace-pre">
            {report.error_log}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-mono text-green-400 uppercase flex items-center gap-2">
            <Icon name="settings" className="text-sm" />
            Suggested Fix
          </p>
          <div className="p-4 bg-black/60 rounded border border-green-500/20 font-mono text-xs text-green-300 overflow-x-auto whitespace-pre">
            {report.suggested_fix}
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button className="px-4 py-2 bg-primary/20 text-accent border border-primary/40 rounded text-xs font-mono uppercase hover:bg-primary/30 transition-colors flex items-center gap-2">
          <Icon name="terminal" className="text-sm" />
          Execute Fix
        </button>
      </div>
    </div>
  );
};
