import { ContentPipeline } from '../types/models';
import { COLLECTIONS } from '../constants/collections';
import { fetchContentPipeline, type FetchContentOptions, type TransformedContentPipeline } from '../lib/api/content';
import { usePocketBase } from './usePocketBase';

export interface ContentPipelineFetchOptions extends FetchContentOptions {
  subscribe?: boolean;
}

export interface ContentPipelineDataResponse {
  data: TransformedContentPipeline[];
  loading: boolean;
  error: Error | null;
  mutate: (data?: any, opts?: any) => Promise<any>;
}

const fetcher = async ([_, options]: readonly [string, ContentPipelineFetchOptions]) => {
  const result = await fetchContentPipeline(options);
  return result.items;
};

export function useContentPipeline(options: ContentPipelineFetchOptions = { subscribe: true }): ContentPipelineDataResponse {
  const { data, loading, error, mutate } = usePocketBase<ContentPipeline, ContentPipelineFetchOptions>(
    COLLECTIONS.CONTENT_PIPELINE,
    options,
    fetcher
  );

  return {
    data: data as unknown as TransformedContentPipeline[],
    loading,
    error: error || null,
    mutate,
  };
}
