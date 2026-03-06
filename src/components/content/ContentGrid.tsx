import React from 'react';
import { PipelineCard } from './PipelineCard';
import { TransformedContentPipeline } from '../../lib/api/content';

interface ContentGridProps {
  data: TransformedContentPipeline[];
}

export const ContentGrid: React.FC<ContentGridProps> = ({ data }) => {
  if (data.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data.map((content) => (
        <PipelineCard key={content.id} content={content} />
      ))}
    </div>
  );
};
