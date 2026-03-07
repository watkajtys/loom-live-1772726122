import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { CommandButtonGroup } from '../CommandButtonGroup';
import { useContentFilters } from '../../hooks/useContentFilters';

export const ContentFilters: React.FC = () => {
  const [searchParams] = useSearchParams();
  const {
    platformFilter,
    agentFilter,
    statusFilter,
    viewMode,
    setFilter,
    platforms,
    agents,
    statuses,
    views,
  } = useContentFilters();

  const isPlatformActive = (p: string) => {
    const value = p.toLowerCase();
    return platformFilter === value || (value === 'all' && !searchParams.get('platform'));
  };

  return (
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
  );
};
