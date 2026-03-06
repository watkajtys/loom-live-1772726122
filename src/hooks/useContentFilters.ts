import React from 'react';
import { useUrlState } from './useUrlState';

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

  const platforms = ['All', 'Github', 'X/Twitter', 'Discord'];
  const agents = ['Nexus_01', 'Echo_04'];
  const statuses = ['Live', 'Progress', 'Draft'];
  const views = ['Standard', 'Compact'];

  return {
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
  };
}
