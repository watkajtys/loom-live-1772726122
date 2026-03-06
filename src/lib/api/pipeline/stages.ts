import { ValidationError } from '../errors';
import { z } from 'zod';
import { pb } from '../../pocketbase';
import { PipelineStage, CreatePipelineStageDTO, UpdatePipelineStageDTO } from '../../../types/models';
import { COLLECTIONS } from '../../../constants/collections';
import { CreatePipelineStageSchema, UpdatePipelineStageSchema } from '../../../schema/pipeline';

export interface FetchPipelineStagesOptions {
  pipeline_id: string;
  page?: number;
  perPage?: number;
  sort?: string;
}

export const fetchPipelineStages = async (options: FetchPipelineStagesOptions): Promise<{ items: PipelineStage[]; totalItems: number }> => {
  const { pipeline_id, page = 1, perPage = 50, sort = 'position' } = options;
  
  const result = await pb.collection(COLLECTIONS.PIPELINE_STAGES).getList<PipelineStage>(page, perPage, {
    filter: `pipeline_id="${pipeline_id}"`,
    sort,
    requestKey: null,
  });

  return {
    items: result.items,
    totalItems: result.totalItems,
  };
};

export const createPipelineStage = async (data: CreatePipelineStageDTO): Promise<PipelineStage> => {
  try {
    const validatedData = CreatePipelineStageSchema.parse(data);
    return await pb.collection(COLLECTIONS.PIPELINE_STAGES).create<PipelineStage>(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline stage payload', error.errors);
    }
    throw error;
  }
};

export const updatePipelineStage = async (id: string, data: UpdatePipelineStageDTO): Promise<PipelineStage> => {
  try {
    const validatedData = UpdatePipelineStageSchema.parse(data);
    return await pb.collection(COLLECTIONS.PIPELINE_STAGES).update<PipelineStage>(id, validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline stage payload', error.errors);
    }
    throw error;
  }
};

export const deletePipelineStage = async (id: string): Promise<boolean> => {
  return await pb.collection(COLLECTIONS.PIPELINE_STAGES).delete(id);
};
