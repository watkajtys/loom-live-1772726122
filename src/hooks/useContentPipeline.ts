import { ContentPipeline } from '../types/models';
import { COLLECTIONS } from '../constants/collections';
import { fetchContentPipeline, type FetchContentOptions } from '../lib/api/content';
import { usePocketBase } from './usePocketBase';

export interface ContentPipelineFetchOptions extends FetchContentOptions {
  subscribe?: boolean;
}

export interface ContentPipelineDataResponse {
  data: ContentPipeline[];
  loading: boolean;
  error: Error | null;
}

const fetcher = async ([_, options]: readonly [string, ContentPipelineFetchOptions]) => {
  const result = await fetchContentPipeline(options);
  return result.items;
};

export function useContentPipeline(options: ContentPipelineFetchOptions = { subscribe: true }): ContentPipelineDataResponse {
  const { data, loading, error } = usePocketBase<ContentPipeline, ContentPipelineFetchOptions>(
    COLLECTIONS.CONTENT_PIPELINE,
    options,
    fetcher
  );

  return {
    data: data as ContentPipeline[],
    loading,
    error: error || null,
  };
}
