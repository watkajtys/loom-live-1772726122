import { useState, useEffect } from 'react';
import { INITIAL_DASHBOARD_DATA, type DashboardData } from '../lib/dashboardSimulation';

export type { Ingest, TerminalLog, DashboardData } from '../lib/dashboardSimulation';

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData>(INITIAL_DASHBOARD_DATA);

  // Mock live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        opsPerMinute: prev.opsPerMinute + (Math.random() > 0.5 ? 0.1 : -0.1),
        snapshot: {
          ...prev.snapshot,
          tokensPerSec: prev.snapshot.tokensPerSec + Math.floor(Math.random() * 10 - 5),
        },
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return data;
};
