import { useState, useEffect } from 'react';
import { SocialMention } from '../types/models';
import { fetchQueueData } from '../lib/queueService';
import { pb } from '../lib/pocketbase';
import { COLLECTIONS } from '../constants/collections';

export interface QueueTelemetry {
  bufferUtilization: string;
  latency: string;
  lastSync: string;
  totalEntries: string;
  syncStatus: string;
}

export function useQueueData() {
  const [data, setData] = useState<SocialMention[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [telemetry, setTelemetry] = useState<QueueTelemetry>({
    bufferUtilization: '14.2%',
    latency: '42ms',
    lastSync: '14:22:18 UTC',
    totalEntries: '0x42',
    syncStatus: 'ACTIVE',
  });

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        const resolvedData = await fetchQueueData();
        if (isMounted) {
          setData(resolvedData);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    // Still maintain subscription for real-time changes
    pb.collection(COLLECTIONS.SOCIAL_MENTIONS).subscribe<SocialMention>('*', (e) => {
      if (e.action === 'create') {
        setData((prev) => [e.record, ...prev]);
      } else if (e.action === 'update') {
        setData((prev) => prev.map((item) => (item.id === e.record.id ? e.record : item)));
      } else if (e.action === 'delete') {
        setData((prev) => prev.filter((item) => item.id !== e.record.id));
      }
    });

    return () => {
      isMounted = false;
      pb.collection(COLLECTIONS.SOCIAL_MENTIONS).unsubscribe('*');
    };
  }, []);

  return {
    data,
    loading,
    error,
    telemetry,
  };
}
