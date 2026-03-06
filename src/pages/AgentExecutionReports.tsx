import React from 'react';
import { DataViewLayout } from '../components/DataViewLayout';
import { useAgentExecutionReports } from '../hooks/useAgentExecutionReports';
import { ExecutionReportCard } from '../components/reports/ExecutionReportCard';

export const AgentExecutionReports: React.FC = () => {
  const { data, loading, error } = useAgentExecutionReports({
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
          <ExecutionReportCard key={report.id} report={report} />
        ))}
      </div>
    </DataViewLayout>
  );
};
