import React from 'react';
import { useContentFilters } from '../../../hooks/useContentFilters';

export const StreamHeader: React.FC = () => {
  const { searchQuery, handleSearch } = useContentFilters();

  return (
    <header className="relative z-30 h-16 border-b border-white/10 bg-black/80 backdrop-blur-xl flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent/10 border border-accent/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-accent text-xl">stream</span>
          </div>
          <div className="leading-none">
            <h1 className="text-xl font-bold text-white tracking-tight uppercase">Advoloom</h1>
            <span className="text-[9px] font-mono text-accent/60 tracking-[0.3em]">HORIZONTAL_STREAM_V3</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-slate-500 uppercase">Stream Velocity</span>
            <span className="text-xs font-mono text-accent">14.2 ops/sec</span>
          </div>
          <div className="h-6 w-px bg-white/10"></div>
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-slate-500 uppercase">Sync Status</span>
            <span className="text-xs font-mono text-green-400">ENCRYPTED_LINK</span>
          </div>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/5 border border-accent/20 rounded-sm">
          <span className="material-symbols-outlined text-accent text-sm">search</span>
          <input 
            className="bg-transparent border-none text-[10px] font-mono text-accent focus:ring-0 w-32 placeholder:text-accent/30 p-0" 
            placeholder="FILTER_STREAM..." 
            type="text"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <button className="w-10 h-10 flex items-center justify-center border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white transition-all">
          <span className="material-symbols-outlined">settings_input_component</span>
        </button>
      </div>
    </header>
  );
};
