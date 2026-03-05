import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Icon } from './Icon';

export const TopBar: React.FC = () => {
  const [time, setTime] = useState('');
  const location = useLocation();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(`UTC ${now.toISOString().split('T')[1].split('.')[0]}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getRouteName = () => {
    switch (location.pathname) {
      case '/': return 'Root::Command_Center';
      case '/queue': return 'Root::Community_Queue';
      case '/content': return 'Root::Content_Pipeline';
      case '/reports': return 'Root::AX_Reports';
      case '/knowledge': return 'Root::Knowledge_Base';
      default: return `Root::${location.pathname.replace('/', '').toUpperCase()}`;
    }
  };

  return (
    <header className="h-14 border-b border-primary/20 flex items-center justify-between px-6 bg-background-dark/50 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <span className="text-accent text-xs font-mono tracking-widest uppercase">
          {getRouteName()}
        </span>
        <div className="h-4 w-px bg-primary/20"></div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-green-500">SYSTEM_NOMINAL</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
          <Icon name="schedule" className="text-sm" />
          <span>{time}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-accent transition-colors">
            <Icon name="notifications" />
          </button>
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
};
