import { PipelineStage } from '../types/models';
import { COLLECTIONS } from '../constants/collections';
import { fetchPipelineStages, type FetchPipelineStagesOptions } from '../lib/api/pipeline/stages';
import { usePocketBase } from './usePocketBase';

export interface PipelineStagesFetchOptions extends FetchPipelineStagesOptions {
  subscribe?: boolean;
}

export interface PipelineStagesDataResponse {
  data: PipelineStage[];
  loading: boolean;
  error: Error | null;
}

const fetcher = async ([_, options]: readonly [string, PipelineStagesFetchOptions]) => {
  const result = await fetchPipelineStages(options);
  return result.items;
};

export function usePipelineStages(options: PipelineStagesFetchOptions = { pipeline_id: '', subscribe: true }): PipelineStagesDataResponse {
  // If no pipeline_id is provided, we might just want to fetch all or not execute the query, but let's assume it's valid
  const { data, loading, error } = usePocketBase<PipelineStage, PipelineStagesFetchOptions>(
    COLLECTIONS.PIPELINE_STAGES,
    options,
    fetcher
  );

  return {
    data: data as unknown as PipelineStage[],
    loading,
    error: error || null,
  };
}
