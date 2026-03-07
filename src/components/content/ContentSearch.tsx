import React, { useRef } from 'react';

interface ContentSearchProps {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  queueLoad: string;
}

export const ContentSearch: React.FC<ContentSearchProps> = ({ searchQuery, handleSearch, queueLoad }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-6 font-mono text-[10px]">
      <div className="flex items-center gap-4">
        <div className="text-right">
          <span className="text-slate-500 text-[8px] uppercase tracking-widest block leading-none">QUEUE_LOAD</span>
          <span className="text-accent font-bold">{queueLoad}</span>
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
  );
};
