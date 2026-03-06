import React from 'react';
import { DataViewLayout } from '../components/DataViewLayout';
import { useContentPipeline } from '../hooks/useContentPipeline';
import { PipelineCard } from '../components/content/PipelineCard';

export const ContentPipeline: React.FC = () => {
  const { data, loading, error } = useContentPipeline({
    sort: '-created',
    subscribe: true,
  });

  return (
    <DataViewLayout
      title="Content Pipeline"
      icon="article"
      loading={loading}
      error={error}
      isEmpty={data.length === 0}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.map((content) => (
          <PipelineCard key={content.id} content={content} />
        ))}
      </div>
    </DataViewLayout>
  );
};
