import { useSearchParams } from 'react-router-dom';

export function useUrlState() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentFilter = searchParams.get('filter') || 'all';

  const setFilter = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  // For backward compatibility with single-argument setFilter (from QueueControls)
  const setLegacyFilter = (filterName: string) => {
    setFilter('filter', filterName);
  };

  return {
    searchParams,
    setSearchParams,
    currentFilter,
    setFilter,
    setLegacyFilter
  };
}
