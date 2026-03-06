import React from 'react';
import { useContentPipelineView } from '../hooks/useContentPipelineView';
import { usePipelineStages } from '../hooks/usePipelineStages';
import { ContentGrid } from '../components/content/ContentGrid';
import { ContentBoard } from '../components/content/ContentBoard';
import { ContentHeader } from '../components/content/ContentHeader';
import { ContentFooter } from '../components/content/ContentFooter';
import { DataViewLayout } from '../components/DataViewLayout';

export const ContentPipeline: React.FC = () => {
  const {
    viewMode,
    collapsedStages,
    toggleCollapse,
    data,
    loading: contentLoading,
    error: contentError,
  } = useContentPipelineView();

  const {
    data: stages,
    loading: stagesLoading,
    error: stagesError
  } = usePipelineStages({ pipeline_id: 'default_pipeline' }); 

  const loading = contentLoading || stagesLoading;
  const error = contentError || stagesError;

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
          />
        )}
      </DataViewLayout>
    </div>
  );
};
