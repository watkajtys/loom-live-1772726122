import React from 'react';
import { DataViewLayout } from '../components/DataViewLayout';
import { usePocketBase } from '../hooks/usePocketBase';
import { AXReport } from '../types';
import { Badge } from '../components/Badge';

export function AXReports() {
  const { data: reports, isLoading, error } = usePocketBase<AXReport>('ax_reports');

  return (
    <DataViewLayout title="AX Reports">
      {isLoading && <p className="text-slate-400 font-mono text-sm">Loading AX reports...</p>}
      {error && <p className="text-red-400 font-mono text-sm">Error: {error.message}</p>}
      {!isLoading && !error && reports.length === 0 && (
        <p className="text-slate-400 font-mono text-sm">No AX reports found.</p>
      )}
      {!isLoading && reports.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-mono text-slate-300">
            <thead className="bg-primary/10 text-accent uppercase text-xs">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Error Log</th>
                <th className="px-4 py-3">Suggested Fix</th>
                <th className="px-4 py-3 rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                  <td className="px-4 py-3 text-red-400 font-bold font-mono text-xs">{report.error_log}</td>
                  <td className="px-4 py-3 text-green-400 font-mono text-xs">{report.suggested_fix || '-'}</td>
                  <td className="px-4 py-3">
                    <Badge variant={report.status === 'submitted' ? 'success' : 'warning'}>
                      {report.status}
                    </Badge>
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