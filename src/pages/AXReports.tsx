import React from 'react';
import { useCollection } from '../hooks/useCollection';

export default function AXReports() {
  const { data: reports, loading, error } = useCollection('ax_reports');

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-100">AX Reports</h1>
          <p className="text-sm font-mono text-slate-400 mt-1 uppercase tracking-wider">Developer Experience Telemetry</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 terminal-scroll pr-2">
        {loading && <p className="text-accent font-mono animate-pulse">Fetching diagnostics...</p>}
        {error && <p className="text-red-400 font-mono">ERR: {error.message}</p>}
        
        {!loading && !error && reports.map((report: any) => (
          <div key={report.id} className="glass-panel rounded-lg p-4 border-l-4 border-l-red-500">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-mono text-red-400 bg-red-400/10 px-2 py-0.5 rounded uppercase">
                ERROR LOG
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                report.status === 'submitted' ? 'text-green-400' : 'text-slate-400'
              }`}>
                {report.status}
              </span>
            </div>
            
            <div className="mb-4">
               <pre className="bg-black/60 p-3 rounded font-mono text-xs text-red-300 overflow-x-auto terminal-scroll border border-red-500/20">
                {report.error_log}
               </pre>
            </div>

            <div>
              <p className="text-xs font-mono text-accent mb-1 uppercase tracking-wider">Suggested Fix Strategy:</p>
              <div className="bg-primary/5 p-3 rounded border border-primary/20 text-sm text-slate-300">
                {report.suggested_fix}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
