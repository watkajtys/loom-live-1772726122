import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from './Icon';

export const QueueControls: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');

  const currentFilter = searchParams.get('filter') || 'all';

  const handleFilterClick = (filterName: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (filterName === 'all') {
      newParams.delete('filter');
    } else {
      newParams.set('filter', filterName);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Debounce search update to URL parameters
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

  return (
    <div className="hud-bar">
      <div className="flex items-center gap-1">
        <button
          onClick={() => handleFilterClick('all')}
          className={`hud-icon-btn ${currentFilter === 'all' ? 'active' : ''}`}
          title="All Streams"
        >
          <Icon name="apps" className="text-[18px]" />
        </button>
        <button
          onClick={() => handleFilterClick('discord')}
          className={`hud-icon-btn ${currentFilter === 'discord' ? 'active' : ''}`}
          title="Filter Discord"
        >
          <Icon name="discord" className="text-[18px]" />
        </button>
        <button
          onClick={() => handleFilterClick('github')}
          className={`hud-icon-btn ${currentFilter === 'github' ? 'active' : ''}`}
          title="Filter GitHub"
        >
          <Icon name="github" className="text-[18px]" />
        </button>
        <button
          onClick={() => handleFilterClick('x')}
          className={`hud-icon-btn ${currentFilter === 'x' ? 'active' : ''}`}
          title="Filter X"
        >
          <Icon name="x" className="text-[18px]" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <label className="flex items-center bg-white/5 rounded px-1 group cursor-text">
          <Icon name="search" className="text-[16px] text-slate-500 group-focus-within:text-accent" />
          <input
            type="text"
            className="search-input-hud neon-cursor"
            placeholder="ID_REF..."
            value={searchValue}
            onChange={handleSearchChange}
          />
        </label>
        <div className="h-4 w-px bg-white/10"></div>
        <button className="hud-icon-btn" title="Sort Options">
          <Icon name="sort" className="text-[18px]" />
        </button>
      </div>
    </div>
  );
};
