import { z } from 'zod';
import { pb } from '../pocketbase';
import { ContentPipeline, CreateContentPipelineDTO, UpdateContentPipelineDTO } from '../../types/models';
import { COLLECTIONS } from '../../constants/collections';
import { SemanticIconName } from '../../components/Icon';
import { ValidationError } from './errors';
import { CreateContentPipelineSchema, UpdateContentPipelineSchema } from '../../schema/content';

export interface FetchContentOptions {
  page?: number;
  perPage?: number;
  filter?: string;
  sort?: string;
}

export type TransformedContentPipeline = ContentPipeline & {
  agentId: string;
  platformIcon: SemanticIconName;
};

export const fetchContentPipeline = async (options: FetchContentOptions = {}): Promise<{ items: TransformedContentPipeline[]; totalItems: number }> => {
  const { page = 1, perPage = 50, filter, sort = '-created' } = options;
  
  const result = await pb.collection(COLLECTIONS.CONTENT_PIPELINE).getList<ContentPipeline>(page, perPage, {
    filter,
    sort,
    requestKey: null,
  });

  const transformedItems = result.items.map((item) => {
    // Relying on data from DB if available, otherwise safely defaulting 
    // to prevent magic string operations here
    return {
      ...item,
      agentId: item.agentId || 'SYSTEM',
      platformIcon: item.platformIcon as SemanticIconName || 'terminal'
    };
  });

  return {
    items: transformedItems,
    totalItems: result.totalItems,
  };
};

export const createContentPipeline = async (data: CreateContentPipelineDTO): Promise<ContentPipeline> => {
  try {
    const validatedData = CreateContentPipelineSchema.parse(data);
    return await pb.collection(COLLECTIONS.CONTENT_PIPELINE).create<ContentPipeline>(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid content pipeline payload', error.errors);
    }
    throw error;
  }
};

export const updateContentPipeline = async (id: string, data: UpdateContentPipelineDTO): Promise<ContentPipeline> => {
  try {
    const validatedData = UpdateContentPipelineSchema.parse(data);
    return await pb.collection(COLLECTIONS.CONTENT_PIPELINE).update<ContentPipeline>(id, validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid content pipeline payload', error.errors);
    }
    throw error;
  }
};

export const deleteContentPipeline = async (id: string): Promise<boolean> => {
  return await pb.collection(COLLECTIONS.CONTENT_PIPELINE).delete(id);
};
