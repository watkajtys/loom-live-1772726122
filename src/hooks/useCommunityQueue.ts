import useSWR from 'swr';
import { SocialMention } from '../types/models';
import { COLLECTIONS } from '../constants/collections';
import { useQueueTelemetry, QueueTelemetry } from './useQueueTelemetry';
import { fetchQueueItems, type FetchQueueOptions } from '../lib/api/queue';
import { useRealtimeSubscription } from './useRealtimeSubscription';

export type { QueueTelemetry };

export interface QueueFetchOptions extends FetchQueueOptions {
  subscribe?: boolean;
}

export interface QueueDataResponse {
  data: SocialMention[] | undefined;
  loading: boolean;
  error: Error | null;
  telemetry: QueueTelemetry;
}

const fetcher = async ([collection, options]: readonly [string, QueueFetchOptions]) => {
  const result = await fetchQueueItems(options);
  return result.items;
};

export function useCommunityQueue(options: QueueFetchOptions = {}): QueueDataResponse {
  const { subscribe = true, ...fetchOptions } = options;
  const swrKey = [COLLECTIONS.SOCIAL_MENTIONS, fetchOptions] as const;

  const { data, error, isLoading, mutate } = useSWR<SocialMention[], Error>(
    swrKey,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  useRealtimeSubscription<SocialMention>({
    collectionName: COLLECTIONS.SOCIAL_MENTIONS,
    subscribe,
    filter: fetchOptions.filter,
  }, mutate);

  const telemetry = useQueueTelemetry(data?.length || 0);

  return {
    data,
    loading: isLoading,
    error: error || null,
    telemetry,
  };
}
