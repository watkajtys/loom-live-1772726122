import React from 'react';
import { useHealthCheck } from '../hooks/useHealthCheck';

export const Healthz: React.FC = () => {
  const { health, loading } = useHealthCheck(0); // No refresh interval on static endpoint page

  if (loading) {
    return <pre>{"{"}\n  "status": "loading"\n{"}"}</pre>;
  }

  return (
    <pre>{JSON.stringify(health, null, 2)}</pre>
  );
};
