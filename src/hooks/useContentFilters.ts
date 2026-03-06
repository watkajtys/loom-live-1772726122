import React from 'react';
import { useUrlState } from './useUrlState';
import { CONTENT_PLATFORMS, CONTENT_AGENTS, CONTENT_STATUSES, CONTENT_VIEWS } from '../constants/config';

export function useContentFilters() {
  const { searchParams, setFilter: baseSetFilter, setSearchParams } = useUrlState();

  const platformFilter = searchParams.get('platform') || 'all';
  const agentFilter = searchParams.get('agent') || '';
  const statusFilter = searchParams.get('status') || '';
  const searchQuery = searchParams.get('search') || '';
  const viewMode = searchParams.get('view') || 'standard';

  const setFilter = (key: string, value: string) => {
    baseSetFilter(key, value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set('search', e.target.value);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  return {
    platformFilter,
    agentFilter,
    statusFilter,
    searchQuery,
    viewMode,
    setFilter,
    handleSearch,
    platforms: CONTENT_PLATFORMS,
    agents: CONTENT_AGENTS,
    statuses: CONTENT_STATUSES,
    views: CONTENT_VIEWS,
  };
}
