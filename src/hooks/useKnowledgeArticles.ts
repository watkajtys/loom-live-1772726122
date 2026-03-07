import { KnowledgeArticle } from '../types/models';
import { COLLECTIONS } from '../constants/collections';
import { fetchKnowledgeArticles } from '../lib/api/knowledgeArticles';
import { usePocketBase } from './usePocketBase';
import { FetchKnowledgeArticlesOptionsDTO } from '../schema/knowledgeArticles';

export interface KnowledgeArticlesFetchOptions extends FetchKnowledgeArticlesOptionsDTO {
  subscribe?: boolean;
}

export interface KnowledgeArticlesDataResponse {
  data: KnowledgeArticle[];
  loading: boolean;
  error: Error | null;
  mutate: () => void;
}

const fetcher = async ([_, options]: readonly [string, KnowledgeArticlesFetchOptions]) => {
  const result = await fetchKnowledgeArticles(options);
  return result.items;
};

export function useKnowledgeArticles(options: KnowledgeArticlesFetchOptions = { subscribe: true }): KnowledgeArticlesDataResponse {
  const { data, loading, error, mutate } = usePocketBase<KnowledgeArticle, KnowledgeArticlesFetchOptions>(
    COLLECTIONS.KNOWLEDGE_ARTICLES,
    options,
    fetcher
  );

  return {
    data: data as KnowledgeArticle[],
    loading,
    error: error || null,
    mutate,
  };
}
