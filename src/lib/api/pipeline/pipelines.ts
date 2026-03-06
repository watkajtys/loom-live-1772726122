import { z } from 'zod';
import { pb } from '../../pocketbase';
import { Pipeline, CreatePipelineDTO, UpdatePipelineDTO } from '../../../types/models';
import { COLLECTIONS } from '../../../constants/collections';
import { CreatePipelineSchema } from '../../../schema/pipeline';

export interface FetchPipelinesOptions {
  page?: number;
  perPage?: number;
  filter?: string;
  sort?: string;
}

export const fetchPipelines = async (options: FetchPipelinesOptions = {}): Promise<{ items: Pipeline[]; totalItems: number }> => {
  const { page = 1, perPage = 50, filter, sort = '-created' } = options;
  
  const result = await pb.collection(COLLECTIONS.PIPELINES).getList<Pipeline>(page, perPage, {
    filter,
    sort,
    requestKey: null,
  });

  return {
    items: result.items,
    totalItems: result.totalItems,
  };
};

export const createPipeline = async (data: CreatePipelineDTO): Promise<Pipeline> => {
  try {
    const validatedData = CreatePipelineSchema.parse(data);
    return await pb.collection(COLLECTIONS.PIPELINES).create<Pipeline>(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = new Error('Bad Request: Invalid pipeline payload');
      (validationError as any).status = 400;
      (validationError as any).errors = error.errors;
      throw validationError;
    }
    throw error;
  }
};

export const updatePipeline = async (id: string, data: UpdatePipelineDTO): Promise<Pipeline> => {
  return await pb.collection(COLLECTIONS.PIPELINES).update<Pipeline>(id, data);
};

export const deletePipeline = async (id: string): Promise<boolean> => {
  return await pb.collection(COLLECTIONS.PIPELINES).delete(id);
};
