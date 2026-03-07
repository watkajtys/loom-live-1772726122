import { useState, useEffect } from 'react';
import { profiler } from '../lib/pocketbase';

export function useProfiler() {
  const [metrics, setMetrics] = useState<{ url: string; duration: number; timestamp: number }[]>([]);

  useEffect(() => {
    const unsubscribe = profiler.subscribe((newMetrics) => {
      setMetrics([...newMetrics]);
    });
    return unsubscribe;
  }, []);

  const avgLatency = metrics.length > 0 
    ? Math.round(metrics.reduce((acc, curr) => acc + curr.duration, 0) / metrics.length)
    : 0;

  return { avgLatency, metrics };
}
