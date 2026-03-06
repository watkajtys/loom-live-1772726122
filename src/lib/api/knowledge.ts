import { pb } from '../pocketbase';
import { KnowledgeSource } from '../../types/models';
import { COLLECTIONS } from '../../constants/collections';

export interface FetchKnowledgeOptions {
  page?: number;
  perPage?: number;
  filter?: string;
  sort?: string;
}

export const fetchKnowledgeSources = async (options: FetchKnowledgeOptions = {}): Promise<{ items: KnowledgeSource[]; totalItems: number }> => {
  const { page = 1, perPage = 50, filter, sort = '-created' } = options;
  
  const result = await pb.collection(COLLECTIONS.KNOWLEDGE_SOURCES).getList<KnowledgeSource>(page, perPage, {
    filter,
    sort,
    requestKey: null,
  });

  return {
    items: result.items,
    totalItems: result.totalItems,
  };
};
