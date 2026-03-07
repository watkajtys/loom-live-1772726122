import { PipelineCard } from '../types/models';
import { COLLECTIONS } from '../constants/collections';
import { fetchPipelineCards, type FetchPipelineCardsOptions } from '../lib/api/pipeline/cards';
import { usePocketBase } from './usePocketBase';

export interface PipelineCardsFetchOptions extends FetchPipelineCardsOptions {
  subscribe?: boolean;
}

export interface PipelineCardsDataResponse {
  data: PipelineCard[];
  loading: boolean;
  error: Error | null;
}

const fetcher = async ([_, options]: readonly [string, PipelineCardsFetchOptions]) => {
  const result = await fetchPipelineCards(options);
  return result.items;
};

export function usePipelineCards(options: PipelineCardsFetchOptions = { stage_id: '', subscribe: true }): PipelineCardsDataResponse {
  const { data, loading, error } = usePocketBase<PipelineCard, PipelineCardsFetchOptions>(
    COLLECTIONS.PIPELINE_CARDS,
    options,
    fetcher
  );

  return {
    data: data as unknown as PipelineCard[],
    loading,
    error: error || null,
  };
}
