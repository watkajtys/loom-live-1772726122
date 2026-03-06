import React, { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useContentFilters } from '../../hooks/useContentFilters';
import { CommandButtonGroup } from '../CommandButtonGroup';
import { CONTENT_QUEUE_LOAD } from '../../constants/config';

export const ContentHeader: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const {
    platformFilter,
    agentFilter,
    statusFilter,
    searchQuery,
    viewMode,
    setFilter,
    handleSearch,
    platforms,
    agents,
    statuses,
    views,
  } = useContentFilters();

  const isPlatformActive = (p: string) => {
    const value = p.toLowerCase();
    return platformFilter === value || (value === 'all' && !searchParams.get('platform'));
  };

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
        <div className="flex items-center">
          <CommandButtonGroup
            label="VIEW"
            items={views}
            activeValue={viewMode}
            onSelect={(val) => setFilter('view', val)}
          />
          <div className="filter-group">
            <span className="command-label">PLATFORM</span>
            <div className="flex gap-1">
              {platforms.map(p => {
                const value = p.toLowerCase();
                const isActive = isPlatformActive(p);
                return (
                  <button
                    key={p}
                    onClick={() => setFilter('platform', value)}
                    className={`command-btn ${isActive ? 'active' : ''}`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
          <CommandButtonGroup
            label="AGENT"
            items={agents}
            activeValue={agentFilter}
            onSelect={(val) => setFilter('agent', val)}
          />
          <CommandButtonGroup
            label="STATUS"
            items={statuses}
            activeValue={statusFilter}
            onSelect={(val) => setFilter('status', val)}
            isLastGroup={true}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6 font-mono text-[10px]">
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-slate-500 text-[8px] uppercase tracking-widest block leading-none">QUEUE_LOAD</span>
            <span className="text-accent font-bold">{CONTENT_QUEUE_LOAD}</span>
          </div>
          <div className="h-6 w-px bg-white/5"></div>
          <label className="relative flex items-center cursor-text group">
            <span className="material-symbols-outlined absolute left-2 text-[14px] text-slate-500 pointer-events-none group-focus-within:text-accent">search</span>
            <input
              ref={searchInputRef}
              type="text"
              className="bg-white/5 border border-white/10 focus:border-accent/50 focus:ring-0 text-[10px] font-mono text-accent placeholder:text-slate-600 w-48 h-8 pl-7 transition-all outline-none"
              placeholder="FILTER_CARDS..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </label>
        </div>
      </div>
    </header>
  );
};
