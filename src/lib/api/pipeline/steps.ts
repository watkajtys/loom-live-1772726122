import { ValidationError } from '../errors';
import { z } from 'zod';
import { pb } from '../../pocketbase';
import { PipelineStep, CreatePipelineStepDTO, UpdatePipelineStepDTO } from '../../../types/models';
import { COLLECTIONS } from '../../../constants/collections';
import { CreatePipelineStepSchema, UpdatePipelineStepSchema } from '../../../schema/pipeline';

export interface FetchPipelineStepsOptions {
  card_id: string;
  page?: number;
  perPage?: number;
  sort?: string;
}

export const fetchPipelineSteps = async (options: FetchPipelineStepsOptions): Promise<{ items: PipelineStep[]; totalItems: number }> => {
  const { card_id, page = 1, perPage = 50, sort = 'position' } = options;
  
  const result = await pb.collection(COLLECTIONS.PIPELINE_STEPS).getList<PipelineStep>(page, perPage, {
    filter: `card_id="${card_id}"`,
    sort,
    requestKey: null,
  });

  return {
    items: result.items,
    totalItems: result.totalItems,
  };
};

export const createPipelineStep = async (data: CreatePipelineStepDTO): Promise<PipelineStep> => {
  try {
    const validatedData = CreatePipelineStepSchema.parse(data);
    return await pb.collection(COLLECTIONS.PIPELINE_STEPS).create<PipelineStep>(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline step payload', error.errors);
    }
    throw error;
  }
};

export const updatePipelineStep = async (id: string, data: UpdatePipelineStepDTO): Promise<PipelineStep> => {
  try {
    const validatedData = UpdatePipelineStepSchema.parse(data);
    return await pb.collection(COLLECTIONS.PIPELINE_STEPS).update<PipelineStep>(id, validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline step payload', error.errors);
    }
    throw error;
  }
};

export const deletePipelineStep = async (id: string): Promise<boolean> => {
  return await pb.collection(COLLECTIONS.PIPELINE_STEPS).delete(id);
};
