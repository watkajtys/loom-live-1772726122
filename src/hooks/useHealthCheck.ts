import useSWR from 'swr';
import { pb } from '../lib/pocketbase';

export interface AppHealth {
  status: 'healthy' | 'unhealthy' | 'degraded';
  details: {
    app: 'ok' | 'error';
    database?: 'connected' | 'disconnected';
    cache?: 'connected' | 'disconnected';
    pocketbase?: {
      code: number;
      message: string;
    };
    error?: string;
  };
}

const fetchHealth = async (): Promise<AppHealth> => {
  let appStatus: 'ok' | 'error' = 'ok';
  let dbStatus: 'connected' | 'disconnected' = 'disconnected';
  let cacheStatus: 'connected' | 'disconnected' = 'disconnected';
  let pbDetails: { code: number; message: string } | undefined;
  let overallError: string | undefined;

  // 1. App Health
  try {
    const res = await pb.health.check();
    pbDetails = { code: res.code, message: res.message };
  } catch (err: any) {
    appStatus = 'error';
    overallError = err?.message || 'Unknown error during health check';
  }

  // 2. Database Health
  try {
    await pb.collection('content_pipeline').getList(1, 1);
    dbStatus = 'connected';
  } catch (err: any) {
    dbStatus = 'disconnected';
  }

  // 3. Cache Health
  try {
    localStorage.setItem('healthz_cache_test', 'test');
    const val = localStorage.getItem('healthz_cache_test');
    if (val === 'test') {
      cacheStatus = 'connected';
      localStorage.removeItem('healthz_cache_test');
    } else {
      cacheStatus = 'disconnected';
    }
  } catch (err: any) {
    cacheStatus = 'disconnected';
  }

  // Determine overall status
  let status: 'healthy' | 'unhealthy' | 'degraded' = 'unhealthy';
  
  if (appStatus === 'ok' && dbStatus === 'connected' && cacheStatus === 'connected') {
    status = 'healthy';
  } else if (appStatus === 'ok' && (dbStatus === 'disconnected' || cacheStatus === 'disconnected')) {
    status = 'degraded';
  } else {
    status = 'unhealthy';
  }

  return {
    status,
    details: {
      app: appStatus,
      database: dbStatus,
      cache: cacheStatus,
      ...(pbDetails ? { pocketbase: pbDetails } : {}),
      ...(overallError ? { error: overallError } : {}),
    },
  };
};

export const useHealthCheck = (refreshInterval = 30000) => {
  const { data, error, isLoading } = useSWR<AppHealth>('health-check', fetchHealth, {
    refreshInterval,
  });

  return {
    health: data || null,
    loading: isLoading,
    error,
    isConnected: data?.status === 'healthy' || data?.status === 'degraded',
  };
};
