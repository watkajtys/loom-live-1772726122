import React from 'react';
import { DataViewLayout } from '../components/DataViewLayout';
import { useKnowledgeBase } from '../hooks/useKnowledgeBase';
import { KnowledgeTable } from '../components/knowledge/KnowledgeTable';

export const KnowledgeBase: React.FC = () => {
  const { data, loading, error } = useKnowledgeBase({
    sort: '-created',
    subscribe: true,
  });

  return (
    <DataViewLayout
      title="Knowledge Base"
      icon="database"
      loading={loading}
      error={error}
      isEmpty={data.length === 0}
    >
      <KnowledgeTable data={data} />
    </DataViewLayout>
  );
};
