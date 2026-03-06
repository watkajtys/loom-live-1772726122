import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useUrlState() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  
  const currentFilter = searchParams.get('filter') || 'all';

  const setFilter = (filterName: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (filterName === 'all') {
      newParams.delete('filter');
    } else {
      newParams.set('filter', filterName);
    }
    setSearchParams(newParams);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue === (searchParams.get('search') || '')) return;
      const newParams = new URLSearchParams(searchParams);
      if (searchValue) {
        newParams.set('search', searchValue);
      } else {
        newParams.delete('search');
      }
      setSearchParams(newParams);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, searchParams, setSearchParams]);

  return {
    searchValue,
    setSearchValue,
    currentFilter,
    setFilter
  };
}
