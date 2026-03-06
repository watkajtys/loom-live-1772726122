import React from 'react';
import { Icon } from './Icon';
import { useUrlState } from '../hooks/useUrlState';

export const QueueControls: React.FC = () => {
  const { searchValue, setSearchValue, currentFilter, setFilter } = useUrlState();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="hud-bar w-full mb-4">
      <label className={`flex items-center bg-black/60 border border-slate-800 focus-within:border-accent/50 transition-all duration-300 rounded-sm px-3 py-1.5 group cursor-text ${searchValue ? 'w-64' : 'w-10 focus-within:w-64'}`}>
        <Icon name="search" className="text-[14px] text-slate-500 group-focus-within:text-accent shrink-0" />
        <input
          type="text"
          className={`search-input-hud neon-cursor bg-transparent outline-none transition-all duration-300 ${searchValue ? 'w-full ml-2 opacity-100' : 'w-0 opacity-0 group-focus-within:w-full group-focus-within:ml-2 group-focus-within:opacity-100'}`}
          placeholder="SEARCH_ID..."
          value={searchValue}
          onChange={handleSearchChange}
        />
      </label>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-sm border ${currentFilter === 'all' ? 'border-accent text-accent bg-accent/10' : 'border-slate-800 text-slate-500 hover:border-slate-600 bg-black/60'} transition-all`}
          title="All Streams"
        >
          <Icon name="apps" className="text-[14px]" />
          ALL
        </button>
        <button
          onClick={() => setFilter('discord')}
          className={`p-1.5 rounded-sm border ${currentFilter === 'discord' ? 'border-accent text-accent bg-accent/10' : 'border-slate-800 text-slate-500 hover:border-slate-600 bg-black/60'} transition-all`}
          title="Filter Discord"
        >
          <Icon name="discord" className="text-[14px]" />
        </button>
        <button
          onClick={() => setFilter('github')}
          className={`p-1.5 rounded-sm border ${currentFilter === 'github' ? 'border-accent text-accent bg-accent/10' : 'border-slate-800 text-slate-500 hover:border-slate-600 bg-black/60'} transition-all`}
          title="Filter GitHub"
        >
          <Icon name="github" className="text-[14px]" />
        </button>
        <button
          onClick={() => setFilter('x')}
          className={`p-1.5 rounded-sm border ${currentFilter === 'x' ? 'border-accent text-accent bg-accent/10' : 'border-slate-800 text-slate-500 hover:border-slate-600 bg-black/60'} transition-all`}
          title="Filter X"
        >
          <Icon name="x" className="text-[14px]" />
        </button>
      </div>

      <div className="flex-1"></div>

      <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-sm border border-slate-800 text-slate-500 hover:border-slate-600 bg-black/60 transition-all" title="Sort Options">
        <Icon name="sort" className="text-[14px]" />
        SORT_BY
      </button>
    </div>
  );
};
