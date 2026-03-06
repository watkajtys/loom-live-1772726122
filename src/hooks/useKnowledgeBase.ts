import useSWR from 'swr';
import { KnowledgeSource } from '../types/models';
import { COLLECTIONS } from '../constants/collections';
import { fetchKnowledgeSources, type FetchKnowledgeOptions } from '../lib/api/knowledge';
import { useRealtimeSubscription } from './useRealtimeSubscription';

export interface KnowledgeFetchOptions extends FetchKnowledgeOptions {
  subscribe?: boolean;
}

export interface KnowledgeDataResponse {
  data: KnowledgeSource[];
  loading: boolean;
  error: Error | null;
}

const fetcher = async ([collection, options]: readonly [string, KnowledgeFetchOptions]) => {
  const result = await fetchKnowledgeSources(options);
  return result.items;
};

export function useKnowledgeBase(options: KnowledgeFetchOptions = {}): KnowledgeDataResponse {
  const { subscribe = true, ...fetchOptions } = options;
  const swrKey = [COLLECTIONS.KNOWLEDGE_SOURCES, fetchOptions] as const;

  const { data, error, isLoading, mutate } = useSWR<KnowledgeSource[], Error>(
    swrKey,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  useRealtimeSubscription<KnowledgeSource>({
    collectionName: COLLECTIONS.KNOWLEDGE_SOURCES,
    subscribe,
    filter: fetchOptions.filter,
  }, mutate);

  return {
    data: data || [],
    loading: isLoading,
    error: error || null,
  };
}
