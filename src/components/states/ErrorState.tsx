import React from 'react';
import { Icon } from '../Icon';

interface ErrorStateProps {
  error: Error | null;
  message?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, message }) => {
  return (
    <div className="absolute inset-0 bg-background-dark z-10 flex flex-col items-center justify-center text-center p-6">
      <Icon name="AlertCircle" className="text-red-500 text-5xl mb-4" />
      <h2 className="text-xl font-bold text-slate-100 mb-2">Error Loading Data</h2>
      <p className="text-slate-400 font-mono text-sm max-w-md">
        {message || error?.message || 'An unknown error occurred while fetching data.'}
      </p>
    </div>
  );
};
