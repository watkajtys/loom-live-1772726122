import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { KnowledgeGraphView } from '../components/knowledge/KnowledgeGraphView';
import { KnowledgeFeedView } from '../components/knowledge/KnowledgeFeedView';

const VIEWS: Record<string, React.FC> = {
  feed: KnowledgeFeedView,
  graph: KnowledgeGraphView,
};

export const KnowledgeBase: React.FC = () => {
  const [searchParams] = useSearchParams();
  const view = searchParams.get('view') || 'graph';
  
  const ViewComponent = VIEWS[view] || VIEWS.graph;

  return <ViewComponent />;
};
