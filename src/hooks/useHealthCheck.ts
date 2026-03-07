import useSWR from 'swr';
import { pb } from '../lib/pocketbase';

export interface AppHealth {
  status: 'healthy' | 'unhealthy';
  details: {
    app: 'ok';
    pocketbase?: {
      code: number;
      message: string;
    };
    error?: string;
  };
}

const fetchHealth = async (): Promise<AppHealth> => {
  try {
    const res = await pb.health.check();
    return {
      status: 'healthy',
      details: {
        app: 'ok',
        pocketbase: {
          code: res.code,
          message: res.message,
        },
      },
    };
  } catch (err: any) {
    return {
      status: 'unhealthy',
      details: {
        app: 'ok',
        error: err?.message || 'Unknown error during health check',
      },
    };
  }
};

export const useHealthCheck = (refreshInterval = 30000) => {
  const { data, error, isLoading } = useSWR<AppHealth>('health-check', fetchHealth, {
    refreshInterval,
  });

  return {
    health: data || null,
    loading: isLoading,
    error,
    isConnected: data?.status === 'healthy',
  };
};
