import { ValidationError } from '../errors';
import { z } from 'zod';
import { pb } from '../../pocketbase';
import { PipelineStage, CreatePipelineStageDTO, UpdatePipelineStageDTO } from '../../../types/models';
import { COLLECTIONS } from '../../../constants/collections';
import { 
  CreatePipelineStageSchema, 
  UpdatePipelineStageSchema,
  FetchPipelineStagesOptionsSchema,
  DeletePipelineStageIdSchema,
  FetchPipelineStagesOptionsDTO
} from '../../../schema/pipeline';

export interface FetchPipelineStagesOptions extends FetchPipelineStagesOptionsDTO {}

export const fetchPipelineStages = async (options: FetchPipelineStagesOptions): Promise<{ items: PipelineStage[]; totalItems: number }> => {
  try {
    const validatedOptions = FetchPipelineStagesOptionsSchema.parse(options);
    const { pipeline_id, page = 1, perPage = 50, sort = 'position' } = validatedOptions;
    
    const result = await pb.collection(COLLECTIONS.PIPELINE_STAGES).getList<PipelineStage>(page, perPage, {
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
  try {
    const validatedId = DeletePipelineStageIdSchema.parse(id);
    return await pb.collection(COLLECTIONS.PIPELINE_STAGES).delete(validatedId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline stage ID', error.errors);
    }
    throw error;
  }
};
