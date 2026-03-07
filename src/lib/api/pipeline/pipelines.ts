import { ValidationError } from '../errors';
import { z } from 'zod';
import { pb } from '../../pocketbase';
import { Pipeline, CreatePipelineDTO, UpdatePipelineDTO } from '../../../types/models';
import { COLLECTIONS } from '../../../constants/collections';
import { CreatePipelineSchema, UpdatePipelineSchema, FetchPipelinesOptionsSchema, DeletePipelineIdSchema, FetchPipelinesOptionsDTO } from '../../../schema/pipeline';
export interface FetchPipelinesOptions {
  page?: number;
  perPage?: number;
  filter?: string;
  sort?: string;
}
export const fetchPipelines = async (options: FetchPipelinesOptions = {}): Promise<{ items: Pipeline[]; totalItems: number }> => {
  try {
    const validatedOptions = FetchPipelinesOptionsSchema.parse(options);
    const { page = 1, perPage = 50, filter, sort = '-created' } = validatedOptions;
    const result = await pb.collection(COLLECTIONS.PIPELINES).getList<Pipeline>(page, perPage, {
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
      throw new ValidationError('Bad Request: Invalid fetch options', error.errors);
    }
    throw error;
  }
};
export const createPipeline = async (data: CreatePipelineDTO): Promise<Pipeline> => {
  // Apply validation schema to Pipeline POST controller
  try {
    const validatedData = CreatePipelineSchema.parse(data);
    return await pb.collection(COLLECTIONS.PIPELINES).create<Pipeline>(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline payload', error.errors);
    }
    throw error;
  }
};
export const updatePipeline = async (id: string, data: UpdatePipelineDTO): Promise<Pipeline> => {
  try {
    const validatedData = UpdatePipelineSchema.parse(data);
    return await pb.collection(COLLECTIONS.PIPELINES).update<Pipeline>(id, validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline payload', error.errors);
    }
    throw error;
  }
};
export const deletePipeline = async (id: string): Promise<boolean> => {
  try {
    const validatedId = DeletePipelineIdSchema.parse(id);
    return await pb.collection(COLLECTIONS.PIPELINES).delete(validatedId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline ID', error.errors);
    }
    throw error;
  }
};
