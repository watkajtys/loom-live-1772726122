import useSWR from 'swr';
import { ContentPipeline } from '../types/models';
import { COLLECTIONS } from '../constants/collections';
import { fetchContentPipeline, type FetchContentOptions } from '../lib/api/content';
import { useRealtimeSubscription } from './useRealtimeSubscription';

export interface ContentPipelineFetchOptions extends FetchContentOptions {
  subscribe?: boolean;
}

export interface ContentPipelineDataResponse {
  data: ContentPipeline[];
  loading: boolean;
  error: Error | null;
}

const fetcher = async ([collection, options]: readonly [string, ContentPipelineFetchOptions]) => {
  const result = await fetchContentPipeline(options);
  return result.items;
};

export function useContentPipeline(options: ContentPipelineFetchOptions = {}): ContentPipelineDataResponse {
  const { subscribe = true, ...fetchOptions } = options;
  const swrKey = [COLLECTIONS.CONTENT_PIPELINE, fetchOptions] as const;

  const { data, error, isLoading, mutate } = useSWR<ContentPipeline[], Error>(
    swrKey,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  useRealtimeSubscription<ContentPipeline>({
    collectionName: COLLECTIONS.CONTENT_PIPELINE,
    subscribe,
    filter: fetchOptions.filter,
  }, mutate);

  return {
    data: data || [],
    loading: isLoading,
    error: error || null,
  };
}
