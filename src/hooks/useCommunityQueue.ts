import { SocialMention } from '../types/models';
import { COLLECTIONS } from '../constants/collections';
import { useQueueTelemetry, QueueTelemetry } from './useQueueTelemetry';
import { fetchQueueItems, type FetchQueueOptions } from '../lib/api/queue';
import { usePocketBase } from './usePocketBase';

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

const fetcher = async ([_, options]: readonly [string, QueueFetchOptions]) => {
  const result = await fetchQueueItems(options);
  return result.items;
};

export function useCommunityQueue(options: QueueFetchOptions = { subscribe: true }): QueueDataResponse {
  const { data, loading, error } = usePocketBase<SocialMention, QueueFetchOptions>(
    COLLECTIONS.SOCIAL_MENTIONS,
    options,
    fetcher
  );

  const telemetry = useQueueTelemetry(data?.length || 0);

  return {
    data: data as SocialMention[] | undefined,
    loading,
    error: error || null,
    telemetry,
  };
}
