import React from 'react';
import { Icon } from '../Icon';

export const EmptyState: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-background-dark/30 z-10 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-primary/20 m-4 rounded-lg">
      <Icon name="Database" className="text-slate-600 text-5xl mb-4" />
      <h2 className="text-lg font-bold text-slate-300 mb-2">No Records Found</h2>
      <p className="text-slate-500 font-mono text-xs">The current data view returned 0 results.</p>
    </div>
  );
};
