import { useState, useEffect } from 'react';

export interface QueueTelemetry {
  bufferUtilization: string;
  latency: string;
  lastSync: string;
  totalEntries: string;
  syncStatus: string;
}

export function useQueueTelemetry(initialDataCount: number = 0) {
  const [telemetry, setTelemetry] = useState<QueueTelemetry>({
    bufferUtilization: '14.2%',
    latency: '42ms',
    lastSync: new Date().toISOString().split('T')[1].split('.')[0] + ' UTC',
    totalEntries: `0x${initialDataCount.toString(16).padStart(2, '0').toUpperCase()}`,
    syncStatus: 'ACTIVE',
  });

  useEffect(() => {
    let interval = setInterval(() => {
      setTelemetry((prev) => {
        // Simulate minor fluctuations in telemetry metrics
        const baseLatency = parseInt(prev.latency);
        const newLatency = Math.max(10, Math.min(150, baseLatency + (Math.random() * 20 - 10)));
        const newBuffer = Math.max(5, Math.min(95, parseFloat(prev.bufferUtilization) + (Math.random() * 2 - 1)));
        
        return {
          ...prev,
          latency: `${Math.round(newLatency)}ms`,
          bufferUtilization: `${newBuffer.toFixed(1)}%`,
          lastSync: new Date().toISOString().split('T')[1].split('.')[0] + ' UTC',
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Update total entries when the count changes
  useEffect(() => {
    setTelemetry((prev) => ({
      ...prev,
      totalEntries: `0x${initialDataCount.toString(16).padStart(2, '0').toUpperCase()}`
    }));
  }, [initialDataCount]);

  return telemetry;
}
