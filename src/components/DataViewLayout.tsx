import React from 'react';
import { Icon } from './Icon';

type DataViewLayoutProps = {
  title: string;
  icon: string;
  loading?: boolean;
  error?: Error | null;
  isEmpty?: boolean;
  customHeader?: React.ReactNode;
  customFooter?: React.ReactNode;
  children: React.ReactNode;
};

export const DataViewLayout: React.FC<DataViewLayoutProps> = ({
  title,
  icon,
  loading = false,
  error = null,
  isEmpty = false,
  customHeader,
  customFooter,
  children,
}) => {
  return (
    <div className="flex-1 p-6 flex flex-col h-full overflow-hidden">
      {customHeader ? (
        customHeader
      ) : (
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-primary/10 text-accent">
              <Icon name={icon} />
            </div>
            <h1 className="text-xl font-display font-bold text-slate-100">{title}</h1>
          </div>
        </header>
      )}

      <div className="flex-1 glass-panel rounded-lg overflow-hidden flex flex-col relative">
        {loading && (
          <div className="absolute inset-0 bg-background-dark/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-accent font-mono text-sm uppercase tracking-widest animate-pulse">Loading Data...</p>
          </div>
        )}

        {error && !loading && (
          <div className="absolute inset-0 bg-background-dark z-10 flex flex-col items-center justify-center text-center p-6">
            <Icon name="error" className="text-red-500 text-5xl mb-4" />
            <h2 className="text-xl font-bold text-slate-100 mb-2">Error Loading Data</h2>
            <p className="text-slate-400 font-mono text-sm max-w-md">{error.message || 'An unknown error occurred while fetching data.'}</p>
          </div>
        )}

        {!loading && !error && isEmpty && (
          <div className="absolute inset-0 bg-background-dark/30 z-10 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-primary/20 m-4 rounded-lg">
            <Icon name="database" className="text-slate-600 text-5xl mb-4" />
            <h2 className="text-lg font-bold text-slate-300 mb-2">No Records Found</h2>
            <p className="text-slate-500 font-mono text-xs">The current data view returned 0 results.</p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto terminal-scroll p-4">
          {children}
        </div>
      </div>
      {customFooter && (
        <div className="mt-4">
          {customFooter}
        </div>
      )}
    </div>
  );
};
