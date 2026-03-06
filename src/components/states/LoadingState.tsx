import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-background-dark/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-accent font-mono text-sm uppercase tracking-widest animate-pulse">Loading Data...</p>
    </div>
  );
};
