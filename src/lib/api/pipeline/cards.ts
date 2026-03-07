import { ValidationError } from '../errors';
import { z } from 'zod';
import { pb } from '../../pocketbase';
import { PipelineCard, CreatePipelineCardDTO, UpdatePipelineCardDTO } from '../../../types/models';
import { COLLECTIONS } from '../../../constants/collections';
import { 
  CreatePipelineCardSchema, 
  UpdatePipelineCardSchema,
  FetchPipelineCardsOptionsSchema,
  DeletePipelineCardIdSchema,
  FetchPipelineCardsOptionsDTO
} from '../../../schema/pipeline';

export interface FetchPipelineCardsOptions extends FetchPipelineCardsOptionsDTO {}

export const fetchPipelineCards = async (options: FetchPipelineCardsOptions): Promise<{ items: PipelineCard[]; totalItems: number }> => {
  try {
    const validatedOptions = FetchPipelineCardsOptionsSchema.parse(options);
    const { stage_id, page = 1, perPage = 50, sort = 'position' } = validatedOptions;
    
    const result = await pb.collection(COLLECTIONS.PIPELINE_CARDS).getList<PipelineCard>(page, perPage, {
      filter: pb.filter('stage_id={:stage_id}', { stage_id }),
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

export const createPipelineCard = async (data: CreatePipelineCardDTO): Promise<PipelineCard> => {
  try {
    const validatedData = CreatePipelineCardSchema.parse(data);
    return await pb.collection(COLLECTIONS.PIPELINE_CARDS).create<PipelineCard>(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline card payload', error.errors);
    }
    throw error;
  }
};

export const updatePipelineCard = async (id: string, data: UpdatePipelineCardDTO): Promise<PipelineCard> => {
  try {
    const validatedData = UpdatePipelineCardSchema.parse(data);
    return await pb.collection(COLLECTIONS.PIPELINE_CARDS).update<PipelineCard>(id, validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline card payload', error.errors);
    }
    throw error;
  }
};

export const deletePipelineCard = async (id: string): Promise<boolean> => {
  try {
    const validatedId = DeletePipelineCardIdSchema.parse(id);
    return await pb.collection(COLLECTIONS.PIPELINE_CARDS).delete(validatedId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline card ID', error.errors);
    }
    throw error;
  }
};
