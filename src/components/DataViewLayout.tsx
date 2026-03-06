import React from 'react';
import { Icon, type IconName } from './Icon';
import { LoadingState } from './states/LoadingState';
import { ErrorState } from './states/ErrorState';
import { EmptyState } from './states/EmptyState';

type DataViewLayoutProps = {
  title: string;
  icon: IconName;
  loading?: boolean;
  error?: Error | null;
  isEmpty?: boolean;
  customHeader?: React.ReactNode;
  customFooter?: React.ReactNode;
  children: React.ReactNode;
  containerClassName?: string;
  wrapperClassName?: string;
  contentClassName?: string;
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
  containerClassName = "flex-1 p-6 flex flex-col h-full overflow-hidden",
  wrapperClassName = "flex-1 glass-panel rounded-lg overflow-hidden flex flex-col relative",
  contentClassName = "flex-1 overflow-y-auto terminal-scroll p-4",
}) => {
  return (
    <div className={containerClassName}>
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

      <div className={wrapperClassName}>
        {loading && <LoadingState />}
        {error && !loading && <ErrorState error={error} />}
        {!loading && !error && isEmpty && <EmptyState />}

        <div className={contentClassName}>
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
