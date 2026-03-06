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
    <div className="hud-bar w-full mb-4">
      <label className="flex items-center bg-black/60 border border-slate-800 focus-within:border-accent/50 transition-colors rounded-sm px-3 py-1.5 group cursor-text w-64">
        <Icon name="search" className="text-[14px] text-slate-500 group-focus-within:text-accent" />
        <input
          type="text"
          className="search-input-hud neon-cursor outline-none w-full"
          placeholder="SEARCH_ID..."
          value={searchValue}
          onChange={handleSearchChange}
        />
      </label>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleFilterClick('all')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-sm border ${currentFilter === 'all' ? 'border-accent text-accent bg-accent/10' : 'border-slate-800 text-slate-500 hover:border-slate-600 bg-black/60'} transition-all`}
          title="All Streams"
        >
          <Icon name="apps" className="text-[14px]" />
          ALL
        </button>
        <button
          onClick={() => handleFilterClick('discord')}
          className={`p-1.5 rounded-sm border ${currentFilter === 'discord' ? 'border-accent text-accent bg-accent/10' : 'border-slate-800 text-slate-500 hover:border-slate-600 bg-black/60'} transition-all`}
          title="Filter Discord"
        >
          <Icon name="discord" className="text-[14px]" />
        </button>
        <button
          onClick={() => handleFilterClick('github')}
          className={`p-1.5 rounded-sm border ${currentFilter === 'github' ? 'border-accent text-accent bg-accent/10' : 'border-slate-800 text-slate-500 hover:border-slate-600 bg-black/60'} transition-all`}
          title="Filter GitHub"
        >
          <Icon name="github" className="text-[14px]" />
        </button>
        <button
          onClick={() => handleFilterClick('x')}
          className={`p-1.5 rounded-sm border ${currentFilter === 'x' ? 'border-accent text-accent bg-accent/10' : 'border-slate-800 text-slate-500 hover:border-slate-600 bg-black/60'} transition-all`}
          title="Filter X"
        >
          <Icon name="x" className="text-[14px]" />
        </button>
      </div>

      <div className="flex-1"></div>

      <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-sm border border-slate-800 text-slate-500 hover:border-slate-600 bg-black/60 transition-all" title="Sort Options">
        <Icon name="sort" className="text-[14px]" />
        SORT
      </button>
    </div>
  );
};
