import React from 'react';
import { Icon } from './Icon';
import { useExecution } from '../providers/ExecutionProvider';

export const TopBar: React.FC = () => {
  const { currentRouteName, systemStatus, uptime, currentTime } = useExecution();

  const getSystemStatusColor = () => {
    switch (systemStatus) {
      case 'nominal': return { text: 'text-green-500', bg: 'bg-green-500' };
      case 'degraded': return { text: 'text-yellow-500', bg: 'bg-yellow-500' };
      case 'offline': return { text: 'text-red-500', bg: 'bg-red-500' };
      default: return { text: 'text-green-500', bg: 'bg-green-500' };
    }
  };

  const { text: textColorClass, bg: bgColorClass } = getSystemStatusColor();

  return (
    <header className="h-14 border-b border-primary/20 flex items-center justify-between px-6 bg-background-dark/50 backdrop-blur-md z-10">
      <div className="flex items-center gap-4">
        <span className="text-accent text-xs font-mono tracking-widest uppercase">
          {currentRouteName}
        </span>
        <div className="h-4 w-px bg-primary/20"></div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className={`size-2 rounded-full ${bgColorClass} animate-pulse`}></span>
          <span className={textColorClass}>SYSTEM_{systemStatus.toUpperCase()}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
          <Icon name="schedule" className="text-sm" />
          <span>{currentTime}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-accent transition-colors">
            <Icon name="notifications" />
          </button>
          <div className="h-6 w-px bg-primary/20"></div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-tighter text-slate-500">Uptime</p>
              <p className="text-xs font-mono text-accent">{uptime}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
