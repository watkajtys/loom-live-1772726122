import React, { createContext, useContext, useState, useEffect } from 'react';

interface TelemetryContextType {
  systemStatus: 'nominal' | 'degraded' | 'offline';
  uptime: string;
}

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export const TelemetryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [systemStatus, setSystemStatus] = useState<'nominal' | 'degraded' | 'offline'>('nominal');
  const [uptime, setUptime] = useState('99.982%');

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

  const value: TelemetryContextType = {
    systemStatus,
    uptime,
  };

  return (
    <TelemetryContext.Provider value={value}>
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = (): TelemetryContextType => {
  const context = useContext(TelemetryContext);
  if (context === undefined) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
};
