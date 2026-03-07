import { Pipeline } from '../types/models';
import { COLLECTIONS } from '../constants/collections';
import { fetchPipelines, type FetchPipelinesOptions } from '../lib/api/pipeline/pipelines';
import { usePocketBase } from './usePocketBase';

export interface PipelinesFetchOptions extends FetchPipelinesOptions {
  subscribe?: boolean;
}

export interface PipelinesDataResponse {
  data: Pipeline[];
  loading: boolean;
  error: Error | null;
}

const fetcher = async ([_, options]: readonly [string, PipelinesFetchOptions]) => {
  const result = await fetchPipelines(options);
  return result.items;
};

export function usePipelines(options: PipelinesFetchOptions = { subscribe: true }): PipelinesDataResponse {
  const { data, loading, error } = usePocketBase<Pipeline, PipelinesFetchOptions>(
    COLLECTIONS.PIPELINES,
    options,
    fetcher
  );

  return {
    data: data as unknown as Pipeline[],
    loading,
    error: error || null,
  };
}
