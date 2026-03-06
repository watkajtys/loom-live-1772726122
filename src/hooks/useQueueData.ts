import { SocialMention } from '../types/models';
import { usePocketBase } from './usePocketBase';
import { COLLECTIONS } from '../constants/collections';
import { useQueueTelemetry, QueueTelemetry } from './useQueueTelemetry';

export type { QueueTelemetry };

export function useQueueData() {
  const { data, loading, error } = usePocketBase<SocialMention>(COLLECTIONS.SOCIAL_MENTIONS, {
    sort: '-created',
    subscribe: true,
  });

  const telemetry = useQueueTelemetry(data?.length || 0);

  return {
    data,
    loading,
    error,
    telemetry,
  };
}
