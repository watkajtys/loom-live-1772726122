import React from 'react';
import { useContentPipelineView } from '../hooks/useContentPipelineView';
import { usePipelineStages } from '../hooks/usePipelineStages';
import { StreamViewLayout } from '../components/content/stream/StreamViewLayout';
import { SplitViewLayout } from '../components/content/split/SplitViewLayout';
import { BoardViewLayout } from '../components/content/board/BoardViewLayout';
import { AXReportsV2 } from '../components/reports/AXReportsV2';

const VIEW_REGISTRY: Record<string, React.FC<any>> = {
  stream: StreamViewLayout,
  split: SplitViewLayout,
  reports: AXReportsV2,
  board: BoardViewLayout,
  compact: BoardViewLayout,
};

export const ContentPipeline: React.FC = () => {
  const {
    viewMode,
    activeStageId,
    setActiveStageId,
    collapsedStages,
    toggleCollapse,
    data,
    loading: contentLoading,
    error: contentError,
    updateContentStatus,
  } = useContentPipelineView();

  const {
    data: stages,
    loading: stagesLoading,
    error: stagesError
  } = usePipelineStages({ pipeline_id: 'default_pipeline' }); 

  const loading = contentLoading || stagesLoading;
  const error = contentError || stagesError;

  const currentViewKey = viewMode.toLowerCase();
  const ViewComponent = VIEW_REGISTRY[currentViewKey] || VIEW_REGISTRY.board;

  return (
    <ViewComponent
      stages={stages}
      data={data}
      loading={loading}
      error={error}
      viewMode={viewMode}
      activeStageId={activeStageId}
      setActiveStageId={setActiveStageId}
      collapsedStages={collapsedStages}
      toggleCollapse={toggleCollapse}
      updateContentStatus={updateContentStatus}
    />
  );
};
