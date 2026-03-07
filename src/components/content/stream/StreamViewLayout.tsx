import React from 'react';
import { StreamHeader } from './StreamHeader';
import { StreamBoard } from './StreamBoard';
import { StreamBatchActions } from './StreamBatchActions';
import { StreamFooter } from './StreamFooter';
import { LoadingState } from '../../states/LoadingState';
import { ErrorState } from '../../states/ErrorState';
import { EmptyState } from '../../states/EmptyState';

interface StreamViewLayoutProps {
  stages: any[];
  data: any[];
  loading: boolean;
  error: any;
  updateContentStatus: (id: string, newStatus: string) => void;
}

export const StreamViewLayout: React.FC<StreamViewLayoutProps> = ({
  stages,
  data,
  loading,
  error,
  updateContentStatus
}) => {
  return (
    <div className="bg-obsidian text-slate-300 font-display selection:bg-accent/30 selection:text-accent h-screen w-full overflow-hidden flex flex-col absolute inset-0 z-50">
      <div className="fixed inset-0 grid-bg pointer-events-none z-0"></div>
      <StreamHeader />
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {loading && <LoadingState />}
        {error && !loading && <ErrorState error={error} />}
        {!loading && !error && data.length === 0 && stages.length === 0 && <EmptyState />}
        {!loading && !error && (
          <StreamBoard stages={stages} data={data} onMoveCard={updateContentStatus} />
        )}
      </div>
      <StreamBatchActions />
      <StreamFooter />
    </div>
  );
};
