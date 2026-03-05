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
  const [systemStatus, setSystemStatus] = useState<'nominal' | 'degraded' | 'offline'>('nominal');
  const [uptime, setUptime] = useState('99.982%');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(`UTC ${now.toISOString().split('T')[1].split('.')[0]}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate telemetry data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomValue = Math.random();
      if (randomValue > 0.99) {
        setSystemStatus('degraded');
      } else if (randomValue > 0.999) {
        setSystemStatus('offline');
      } else {
        setSystemStatus('nominal');
      }
      
      // slightly fluctuate uptime string
      const uptimeNum = 99.982 + (Math.random() * 0.005 - 0.002);
      setUptime(`${uptimeNum.toFixed(3)}%`);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const value: ExecutionContextType = {
    currentPath: location.pathname,
    currentRouteName: getRouteName(location.pathname),
    systemStatus,
    uptime,
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
