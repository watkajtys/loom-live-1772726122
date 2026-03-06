import React, { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

export const ContentHeader: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const platformFilter = searchParams.get('platform') || 'all';
  const agentFilter = searchParams.get('agent') || '';
  const statusFilter = searchParams.get('status') || '';
  const searchQuery = searchParams.get('search') || '';
  const viewMode = searchParams.get('view') || 'standard';

  const setFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
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

  return (
    <header className="relative z-30 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="flex items-center gap-8">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-mono text-accent tracking-[0.2em] font-bold">
              {viewMode === 'compact' ? 'LOG_MODE::DENSITY_HIGH' : 'ROUTE::/CONTENT-PIPELINE'}
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white font-display uppercase leading-none">
            {viewMode === 'compact' ? 'System Logs' : 'Content Deck'}
          </h2>
        </div>
        <div className="h-10 w-px bg-white/10"></div>
        <div className="flex items-center">
          <div className="filter-group">
            <span className="command-label">VIEW</span>
            <div className="flex gap-1">
              {views.map(v => {
                const value = v.toLowerCase();
                const isActive = viewMode === value;
                return (
                  <button
                    key={v}
                    onClick={() => setFilter('view', value)}
                    className={`command-btn ${isActive ? 'active' : ''}`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="filter-group">
            <span className="command-label">PLATFORM</span>
            <div className="flex gap-1">
              {platforms.map(p => {
                const value = p.toLowerCase();
                const isActive = platformFilter === value || (p === 'All' && !searchParams.get('platform'));
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
          <div className="filter-group">
            <span className="command-label">AGENT</span>
            <div className="flex gap-1">
              {agents.map(a => {
                const value = a.toLowerCase();
                const isActive = agentFilter === value;
                return (
                  <button
                    key={a}
                    onClick={() => setFilter('agent', value)}
                    className={`command-btn ${isActive ? 'active' : ''}`}
                  >
                    {a}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="filter-group border-r-0">
            <span className="command-label">STATUS</span>
            <div className="flex gap-1">
              {statuses.map(s => {
                const value = s.toLowerCase();
                const isActive = statusFilter === value;
                return (
                  <button
                    key={s}
                    onClick={() => setFilter('status', value)}
                    className={`command-btn ${isActive ? 'active' : ''}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6 font-mono text-[10px]">
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-slate-500 text-[8px] uppercase tracking-widest block leading-none">QUEUE_LOAD</span>
            <span className="text-accent font-bold">0xAF24</span>
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
