import { ValidationError } from '../errors';
import { z } from 'zod';
import { pb } from '../../pocketbase';
import { PipelineStep } from '../../../types/models';
import { COLLECTIONS } from '../../../constants/collections';
import { 
  CreatePipelineStepSchema, 
  UpdatePipelineStepSchema,
  FetchPipelineStepsOptionsSchema,
  DeletePipelineStepIdSchema,
  FetchPipelineStepsOptionsDTO,
  CreatePipelineStepDTO,
  UpdatePipelineStepDTO
} from '../../../schema/pipeline';

export interface FetchPipelineStepsOptions extends FetchPipelineStepsOptionsDTO {}

export const fetchPipelineSteps = async (options: FetchPipelineStepsOptions): Promise<{ items: PipelineStep[]; totalItems: number }> => {
  try {
    const validatedOptions = FetchPipelineStepsOptionsSchema.parse(options);
    const { card_id, page = 1, perPage = 50, sort = 'position' } = validatedOptions;
    
    const result = await pb.collection(COLLECTIONS.PIPELINE_STEPS).getList<PipelineStep>(page, perPage, {
      filter: pb.filter('card_id={:card_id}', { card_id }),
      sort,
      requestKey: null,
    });

    return {
      items: result.items,
      totalItems: result.totalItems,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid fetch options', error.issues);
    }
    throw error;
  }
};

export const createPipelineStep = async (data: CreatePipelineStepDTO): Promise<PipelineStep> => {
  try {
    const validatedData = CreatePipelineStepSchema.parse(data);
    return await pb.collection(COLLECTIONS.PIPELINE_STEPS).create<PipelineStep>(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline step payload', error.issues);
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
      throw new ValidationError('Bad Request: Invalid pipeline step payload', error.issues);
    }
    throw error;
  }
};

export const deletePipelineStep = async (id: string): Promise<boolean> => {
  try {
    const validatedId = DeletePipelineStepIdSchema.parse(id);
    return await pb.collection(COLLECTIONS.PIPELINE_STEPS).delete(validatedId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline step ID', error.issues);
    }
    throw error;
  }
};
