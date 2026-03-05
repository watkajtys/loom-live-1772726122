import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { APP_ROUTES, AppRoute, getRouteName } from '../constants/routes';

interface ExecutionContextType {
  currentPath: string;
  currentRouteName: string;
  systemStatus: 'nominal' | 'degraded' | 'offline';
  uptime: string;
  routes: AppRoute[];
  currentTime: string;
}

const ExecutionContext = createContext<ExecutionContextType | undefined>(undefined);

export const ExecutionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(`UTC ${now.toISOString().split('T')[1].split('.')[0]}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const value: ExecutionContextType = {
    currentPath: location.pathname,
    currentRouteName: getRouteName(location.pathname),
    systemStatus: 'nominal',
    uptime: '99.982%',
    routes: APP_ROUTES,
    currentTime,
  };

  return (
    <ExecutionContext.Provider value={value}>
      {children}
    </ExecutionContext.Provider>
  );
};

export const useExecution = (): ExecutionContextType => {
  const context = useContext(ExecutionContext);
  if (context === undefined) {
    throw new Error('useExecution must be used within an ExecutionProvider');
  }
  return context;
};
