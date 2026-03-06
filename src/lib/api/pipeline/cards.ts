import { z } from 'zod';
import { pb } from '../../pocketbase';
import { PipelineCard, CreatePipelineCardDTO, UpdatePipelineCardDTO } from '../../../types/models';
import { COLLECTIONS } from '../../../constants/collections';
import { CreatePipelineCardSchema, UpdatePipelineCardSchema } from '../../../schema/pipeline';

export interface FetchPipelineCardsOptions {
  stage_id: string;
  page?: number;
  perPage?: number;
  sort?: string;
}

export const fetchPipelineCards = async (options: FetchPipelineCardsOptions): Promise<{ items: PipelineCard[]; totalItems: number }> => {
  const { stage_id, page = 1, perPage = 50, sort = 'position' } = options;
  
  const result = await pb.collection(COLLECTIONS.PIPELINE_CARDS).getList<PipelineCard>(page, perPage, {
    filter: `stage_id="${stage_id}"`,
    sort,
    requestKey: null,
  });

  return {
    items: result.items,
    totalItems: result.totalItems,
  };
};

export const createPipelineCard = async (data: CreatePipelineCardDTO): Promise<PipelineCard> => {
  try {
    const validatedData = CreatePipelineCardSchema.parse(data);
    return await pb.collection(COLLECTIONS.PIPELINE_CARDS).create<PipelineCard>(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = new Error('Bad Request: Invalid pipeline card payload');
      (validationError as any).status = 400;
      (validationError as any).errors = error.errors;
      throw validationError;
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
      const validationError = new Error('Bad Request: Invalid pipeline card payload');
      (validationError as any).status = 400;
      (validationError as any).errors = error.errors;
      throw validationError;
    }
    throw error;
  }
};

export const deletePipelineCard = async (id: string): Promise<boolean> => {
  return await pb.collection(COLLECTIONS.PIPELINE_CARDS).delete(id);
};
