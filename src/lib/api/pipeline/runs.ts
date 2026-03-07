import { ValidationError } from '../errors';
import { z } from 'zod';
import { pb } from '../../pocketbase';
import { PipelineRun } from '../../../types/models';
import { COLLECTIONS } from '../../../constants/collections';
import { 
  CreatePipelineRunSchema, 
  UpdatePipelineRunSchema,
  UpdatePipelineRunStatusPayloadSchema,
  UpdatePipelineRunStatusPayload,
  FetchPipelineRunsOptionsSchema,
  DeletePipelineRunIdSchema,
  FetchPipelineRunsOptionsDTO,
  CreatePipelineRunDTO,
  UpdatePipelineRunDTO
} from '../../../schema/pipeline';

export interface FetchPipelineRunsOptions extends FetchPipelineRunsOptionsDTO {}

export const fetchPipelineRuns = async (options: FetchPipelineRunsOptions): Promise<{ items: PipelineRun[]; totalItems: number }> => {
  try {
    const validatedOptions = FetchPipelineRunsOptionsSchema.parse(options);
    const { pipeline_id, page = 1, perPage = 50, sort = '-started_at' } = validatedOptions;
    
    const result = await pb.collection(COLLECTIONS.PIPELINE_RUNS).getList<PipelineRun>(page, perPage, {
      filter: pb.filter('pipeline_id={:pipeline_id}', { pipeline_id }),
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

export const createPipelineRun = async (data: CreatePipelineRunDTO): Promise<PipelineRun> => {
  try {
    const validatedData = CreatePipelineRunSchema.parse(data);
    return await pb.collection(COLLECTIONS.PIPELINE_RUNS).create<PipelineRun>(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline run payload', error.errors);
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
      throw new ValidationError('Bad Request: Invalid pipeline run payload', error.errors);
    }
    throw error;
  }
};

export const updatePipelineRunStatus = async (id: string, data: UpdatePipelineRunStatusPayload): Promise<PipelineRun> => {
  try {
    const validatedData = UpdatePipelineRunStatusPayloadSchema.parse(data);
    return await pb.collection(COLLECTIONS.PIPELINE_RUNS).update<PipelineRun>(id, validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline run status payload', error.errors);
    }
    throw error;
  }
};

export const deletePipelineRun = async (id: string): Promise<boolean> => {
  try {
    const validatedId = DeletePipelineRunIdSchema.parse(id);
    return await pb.collection(COLLECTIONS.PIPELINE_RUNS).delete(validatedId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline run ID', error.errors);
    }
    throw error;
  }
};
