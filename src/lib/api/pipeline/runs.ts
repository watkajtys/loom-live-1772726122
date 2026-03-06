import { z } from 'zod';
import { pb } from '../../pocketbase';
import { PipelineRun, CreatePipelineRunDTO, UpdatePipelineRunDTO } from '../../../types/models';
import { COLLECTIONS } from '../../../constants/collections';
import { CreatePipelineRunSchema, UpdatePipelineRunSchema } from '../../../schema/pipeline';

export interface FetchPipelineRunsOptions {
  pipeline_id: string;
  page?: number;
  perPage?: number;
  sort?: string;
}

export const fetchPipelineRuns = async (options: FetchPipelineRunsOptions): Promise<{ items: PipelineRun[]; totalItems: number }> => {
  const { pipeline_id, page = 1, perPage = 50, sort = '-started_at' } = options;
  
  const result = await pb.collection(COLLECTIONS.PIPELINE_RUNS).getList<PipelineRun>(page, perPage, {
    filter: `pipeline_id="${pipeline_id}"`,
    sort,
    requestKey: null,
  });

  return {
    items: result.items,
    totalItems: result.totalItems,
  };
};

export const createPipelineRun = async (data: CreatePipelineRunDTO): Promise<PipelineRun> => {
  try {
    const validatedData = CreatePipelineRunSchema.parse(data);
    return await pb.collection(COLLECTIONS.PIPELINE_RUNS).create<PipelineRun>(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = new Error('Bad Request: Invalid pipeline run payload');
      (validationError as any).status = 400;
      (validationError as any).errors = error.errors;
      throw validationError;
    }
    throw error;
  }
};

export const updatePipelineRun = async (id: string, data: UpdatePipelineRunDTO): Promise<PipelineRun> => {
  try {
    const validatedData = UpdatePipelineRunSchema.parse(data);
    return await pb.collection(COLLECTIONS.PIPELINE_RUNS).update<PipelineRun>(id, validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = new Error('Bad Request: Invalid pipeline run payload');
      (validationError as any).status = 400;
      (validationError as any).errors = error.errors;
      throw validationError;
    }
    throw error;
  }
};

export const deletePipelineRun = async (id: string): Promise<boolean> => {
  return await pb.collection(COLLECTIONS.PIPELINE_RUNS).delete(id);
};
