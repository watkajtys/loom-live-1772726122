import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function Header() {
  const [time, setTime] = useState('');
  const location = useLocation();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toISOString().substring(11, 19)
      );
    };
    updateTime();
    const int = setInterval(updateTime, 1000);
    return () => clearInterval(int);
  }, []);

  const viewName = location.pathname === '/'
    ? 'HOME'
    : location.pathname.substring(1).replace(/-/g, '_').toUpperCase();

  return (
    <header className="h-14 border-b border-primary/20 flex items-center justify-between px-6 bg-background-dark/50 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <span className="text-accent text-xs font-mono tracking-widest uppercase">Root::{viewName}</span>
        <div className="h-4 w-px bg-primary/20"></div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-green-500">SYSTEM_NOMINAL</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
          <span className="material-symbols-outlined text-sm">schedule</span>
          <span>UTC {time}</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-slate-400 hover:text-accent">notifications</button>
          <div className="h-6 w-px bg-primary/20"></div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-tighter text-slate-500">Uptime</p>
              <p className="text-xs font-mono text-accent">99.982%</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
