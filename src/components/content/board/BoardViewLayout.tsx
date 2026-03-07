import React from 'react';
import { DataViewLayout } from '../../DataViewLayout';
import { ContentHeader } from '../ContentHeader';
import { ContentFooter } from '../ContentFooter';
import { ContentGrid } from '../ContentGrid';
import { ContentBoard } from '../ContentBoard';

interface BoardViewLayoutProps {
  stages: any[];
  data: any[];
  loading: boolean;
  error: any;
  viewMode: string;
  collapsedStages: string[];
  toggleCollapse: (stageId: string) => void;
  updateContentStatus: (id: string, newStatus: string) => void;
}

export const BoardViewLayout: React.FC<BoardViewLayoutProps> = ({
  stages,
  data,
  loading,
  error,
  viewMode,
  collapsedStages,
  toggleCollapse,
  updateContentStatus
}) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#020305] text-slate-100 font-display selection:bg-accent/30 selection:text-accent relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none z-0"></div>
      
      <DataViewLayout
        title="Content Pipeline"
        icon="file-text"
        loading={loading}
        error={error}
        isEmpty={data.length === 0 && stages.length === 0}
        customHeader={<ContentHeader />}
        customFooter={<ContentFooter />}
        containerClassName="flex-1 flex flex-col mx-4 my-4 z-10"
        wrapperClassName="flex-1 glass-panel relative overflow-hidden flex flex-col z-10"
        contentClassName={`flex-1 overflow-hidden relative z-10 ${viewMode === 'compact' ? 'flex bg-black/20 overflow-x-auto custom-scrollbar' : 'overflow-y-auto custom-scrollbar p-6'}`}
      >
        {data.length > 0 && viewMode !== 'compact' && <ContentGrid data={data} />}
        {stages.length > 0 && viewMode === 'compact' && (
          <ContentBoard
            data={data}
            stages={stages}
            collapsedStages={collapsedStages}
            toggleCollapse={toggleCollapse}
            onMoveCard={updateContentStatus}
          />
        )}
      </DataViewLayout>
    </div>
  );
};
