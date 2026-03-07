import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { KnowledgeGraphView } from '../components/knowledge/KnowledgeGraphView';
import { KnowledgeFeedView } from '../components/knowledge/KnowledgeFeedView';

export const KnowledgeBase: React.FC = () => {
  const [searchParams] = useSearchParams();
  const view = searchParams.get('view') || 'graph';

  if (view === 'feed') {
    return <KnowledgeFeedView />;
  }

  return <KnowledgeGraphView />;
};
