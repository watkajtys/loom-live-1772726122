import { useState } from 'react';
import { SocialMention } from '../types/models';
import { usePocketBase } from './usePocketBase';
import { COLLECTIONS } from '../constants/collections';

export interface QueueTelemetry {
  bufferUtilization: string;
  latency: string;
  lastSync: string;
  totalEntries: string;
  syncStatus: string;
}

export function useQueueData() {
  const { data, loading, error } = usePocketBase<SocialMention>(COLLECTIONS.SOCIAL_MENTIONS, {
    sort: '-created',
    subscribe: true,
  });

  const [telemetry] = useState<QueueTelemetry>({
    bufferUtilization: '14.2%',
    latency: '42ms',
    lastSync: '14:22:18 UTC',
    totalEntries: '0x42',
    syncStatus: 'ACTIVE',
  });

  return {
    data,
    loading,
    error,
    telemetry,
  };
}
