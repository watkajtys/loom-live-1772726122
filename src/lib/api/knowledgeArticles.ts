import { pb } from '../pocketbase';
import { KnowledgeArticle } from '../../types/models';
import { COLLECTIONS } from '../../constants/collections';
import {
  CreateKnowledgeArticleSchema,
  UpdateKnowledgeArticleSchema,
  FetchKnowledgeArticlesOptionsSchema,
  type CreateKnowledgeArticleDTO,
  type UpdateKnowledgeArticleDTO,
  type FetchKnowledgeArticlesOptionsDTO
} from '../../schema/knowledgeArticles';
import { z } from 'zod';

export class ValidationError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

export const fetchKnowledgeArticles = async (options: FetchKnowledgeArticlesOptionsDTO = {}): Promise<{ items: KnowledgeArticle[]; totalItems: number }> => {
  try {
    const validatedOptions = FetchKnowledgeArticlesOptionsSchema.parse(options);
    const { page = 1, perPage = 50, filter, sort = '-created' } = validatedOptions;
    
    const result = await pb.collection(COLLECTIONS.KNOWLEDGE_ARTICLES).getList<KnowledgeArticle>(page, perPage, {
      filter,
      sort,
      requestKey: null,
    });

    return {
      items: result.items,
      totalItems: result.totalItems,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(error.issues.map(e => e.message).join(', '));
    }
    throw error;
  }
};

export const createKnowledgeArticle = async (data: CreateKnowledgeArticleDTO): Promise<KnowledgeArticle> => {
  try {
    const validatedData = CreateKnowledgeArticleSchema.parse(data);
    return await pb.collection(COLLECTIONS.KNOWLEDGE_ARTICLES).create<KnowledgeArticle>(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(error.issues.map(e => e.message).join(', '));
    }
    throw error;
  }
};

export const updateKnowledgeArticle = async (id: string, data: UpdateKnowledgeArticleDTO): Promise<KnowledgeArticle> => {
  try {
    const validatedData = UpdateKnowledgeArticleSchema.parse(data);
    return await pb.collection(COLLECTIONS.KNOWLEDGE_ARTICLES).update<KnowledgeArticle>(id, validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(error.issues.map(e => e.message).join(', '));
    }
    throw error;
  }
};

export const deleteKnowledgeArticle = async (id: string): Promise<boolean> => {
  if (!id) {
     throw new ValidationError('Knowledge Article ID is required');
  }
  return await pb.collection(COLLECTIONS.KNOWLEDGE_ARTICLES).delete(id);
};
