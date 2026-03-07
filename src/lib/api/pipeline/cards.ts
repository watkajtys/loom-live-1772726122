import { ValidationError } from '../errors';
import { z } from 'zod';
import { pb } from '../../pocketbase';
import { PipelineCard } from '../../../types/models';
import { COLLECTIONS } from '../../../constants/collections';
import { 
  CreatePipelineCardSchema, 
  UpdatePipelineCardSchema,
  FetchPipelineCardsOptionsSchema,
  DeletePipelineCardIdSchema,
  FetchPipelineCardsOptionsDTO,
  CreatePipelineCardDTO,
  UpdatePipelineCardDTO
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
      throw new ValidationError('Bad Request: Invalid fetch options', error.issues);
    }
    throw error;
  }
};

// Implement POST, PUT/PATCH, and DELETE endpoints for managing Pipeline Board cards/items.
export const createPipelineCard = async (data: CreatePipelineCardDTO): Promise<PipelineCard> => {
  try {
    // Validate the incoming DTO against our rigid schema constraints
    const validatedData = CreatePipelineCardSchema.parse(data);
    
    // Execute POST request via PocketBase SDK
    const newRecord = await pb.collection(COLLECTIONS.PIPELINE_CARDS).create<PipelineCard>(validatedData);
    return newRecord;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline card payload', error.issues);
    }
    throw error; // Standard bubbling for network errors
  }
};

export const updatePipelineCard = async (id: string, data: UpdatePipelineCardDTO): Promise<PipelineCard> => {
  try {
    // Enforce total parameter governance via Zod validation
    const validatedData = UpdatePipelineCardSchema.parse(data);
    
    // Execute PUT/PATCH request
    const updatedRecord = await pb.collection(COLLECTIONS.PIPELINE_CARDS).update<PipelineCard>(id, validatedData);
    return updatedRecord;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline card payload', error.issues);
    }
    throw error;
  }
};

export const deletePipelineCard = async (id: string): Promise<boolean> => {
  try {
    // Strict schema-driven validation for the parameter
    const validatedId = DeletePipelineCardIdSchema.parse(id);
    
    // Execute DELETE request against the backend
    const isDeleted = await pb.collection(COLLECTIONS.PIPELINE_CARDS).delete(validatedId);
    return isDeleted;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline card ID', error.issues);
    }
    throw error;
  }
};
