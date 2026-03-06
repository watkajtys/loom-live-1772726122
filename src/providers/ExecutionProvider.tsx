import React, { createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { APP_ROUTES, AppRoute, getRouteName } from '../constants/routes';

interface ExecutionContextType {
  currentPath: string;
  currentRouteName: string;
  routes: AppRoute[];
}

const ExecutionContext = createContext<ExecutionContextType | undefined>(undefined);

export const ExecutionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const value: ExecutionContextType = {
    currentPath: location.pathname,
    currentRouteName: getRouteName(location.pathname),
    routes: APP_ROUTES,
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
