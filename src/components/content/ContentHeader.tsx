import React from 'react';
import { useContentFilters } from '../../hooks/useContentFilters';
import { CONTENT_QUEUE_LOAD } from '../../constants/config';
import { ContentFilters } from './ContentFilters';
import { ContentSearch } from './ContentSearch';

export const ContentHeader: React.FC = () => {
  const {
    searchQuery,
    viewMode,
    handleSearch,
  } = useContentFilters();

  const getHeaderDetails = () => {
    if (viewMode === 'compact') {
      return { route: 'LOG_MODE::DENSITY_HIGH', title: 'System Logs' };
    }
    return { route: 'ROUTE::/CONTENT-PIPELINE', title: 'Content Deck' };
  };

  const { route, title } = getHeaderDetails();

  return (
    <header className="relative z-30 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="flex items-center gap-8">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-mono text-accent tracking-[0.2em] font-bold">
              {route}
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white font-display uppercase leading-none">
            {title}
          </h2>
        </div>
        <div className="h-10 w-px bg-white/10"></div>
        <ContentFilters />
      </div>
      
      <ContentSearch 
        searchQuery={searchQuery} 
        handleSearch={handleSearch} 
        queueLoad={CONTENT_QUEUE_LOAD} 
      />
    </header>
  );
};
