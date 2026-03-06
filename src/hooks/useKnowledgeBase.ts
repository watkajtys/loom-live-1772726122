import { KnowledgeSource } from '../types/models';
import { COLLECTIONS } from '../constants/collections';
import { fetchKnowledgeSources, type FetchKnowledgeOptions } from '../lib/api/knowledge';
import { usePocketBase } from './usePocketBase';

export interface KnowledgeFetchOptions extends FetchKnowledgeOptions {
  subscribe?: boolean;
}

export interface KnowledgeDataResponse {
  data: KnowledgeSource[];
  loading: boolean;
  error: Error | null;
}

const fetcher = async ([_, options]: readonly [string, KnowledgeFetchOptions]) => {
  const result = await fetchKnowledgeSources(options);
  return result.items;
};

export function useKnowledgeBase(options: KnowledgeFetchOptions = { subscribe: true }): KnowledgeDataResponse {
  const { data, loading, error } = usePocketBase<KnowledgeSource, KnowledgeFetchOptions>(
    COLLECTIONS.KNOWLEDGE_SOURCES,
    options,
    fetcher
  );

  return {
    data: data as KnowledgeSource[],
    loading,
    error: error || null,
  };
}
