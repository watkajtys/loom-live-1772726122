import React from 'react';
import { SplitHeader } from './SplitHeader';
import { SplitBoard } from './SplitBoard';
import { SplitFooter } from './SplitFooter';
import { LoadingState } from '../../states/LoadingState';
import { ErrorState } from '../../states/ErrorState';
import { EmptyState } from '../../states/EmptyState';

interface SplitViewLayoutProps {
  stages: any[];
  data: any[];
  loading: boolean;
  error: any;
  activeStageId: string | null;
  setActiveStageId: (id: string | null) => void;
  updateContentStatus: (id: string, newStatus: string) => void;
}

export const SplitViewLayout: React.FC<SplitViewLayoutProps> = ({
  stages,
  data,
  loading,
  error,
  activeStageId,
  setActiveStageId,
  updateContentStatus
}) => {
  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-[#020305] text-slate-100 font-display selection:bg-accent/30 selection:text-accent min-h-screen relative">
      <div className="absolute inset-0 grid-bg pointer-events-none"></div>
      <div className="w-full max-w-[1440px] h-[860px] glass-panel relative overflow-hidden flex flex-col">
        <SplitHeader />
        <div className="flex-1 relative overflow-hidden flex flex-col">
          {loading && <LoadingState />}
          {error && !loading && <ErrorState error={error} />}
          {!loading && !error && data.length === 0 && stages.length === 0 && <EmptyState />}
          {!loading && !error && (
            <SplitBoard 
              stages={stages} 
              data={data} 
              activeStageId={activeStageId} 
              onSelectStage={setActiveStageId} 
              onMoveCard={updateContentStatus}
            />
          )}
        </div>
        <SplitFooter />
      </div>
    </div>
  );
};
