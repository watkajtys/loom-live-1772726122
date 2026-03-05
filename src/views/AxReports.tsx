import React from 'react';
import { usePocketBase } from '../hooks/usePocketBase';
import { AxReport } from '../types';

export function AxReports() {
  const { data: reports, loading, error } = usePocketBase<AxReport>('ax_reports');

  if (loading) return <div className="p-6 font-mono text-accent">Loading AX Reports...</div>;
  if (error) return <div className="p-6 font-mono text-red-500">Error loading AX Reports: {error.message}</div>;

  return (
    <div className="flex-1 p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold font-mono mb-4 text-accent">AX Reports</h2>
      <div className="flex flex-col gap-4">
        {reports.map((report) => (
          <div key={report.id} className="glass-panel p-4 rounded-lg flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <span className="block text-[10px] uppercase text-red-400 mb-1 font-mono tracking-widest">Error Log</span>
              <pre className="text-xs p-3 bg-background-dark/80 rounded border border-red-500/30 text-red-300 terminal-scroll overflow-x-auto">
                {report.error_log}
              </pre>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <span className="block text-[10px] uppercase text-green-400 font-mono tracking-widest">Suggested Fix</span>
              <div className="p-3 bg-background-dark/80 rounded border border-green-500/30 text-green-300 text-xs font-mono">
                {report.suggested_fix}
              </div>
              <div className="mt-auto self-end">
                <span className={`text-[10px] uppercase px-3 py-1 rounded font-mono ${
                  report.status === 'submitted' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                }`}>
                  {report.status}
                </span>
              </div>
            </div>
          </div>
        ))}
        {reports.length === 0 && (
          <div className="text-center text-slate-500 font-mono py-10">
            No AX reports available.
          </div>
        )}
      </div>
    </div>
  );
}
