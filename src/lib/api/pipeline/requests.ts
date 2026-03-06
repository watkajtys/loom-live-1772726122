import { ValidationError } from '../errors';
import { z } from 'zod';
import { pb } from '../../pocketbase';
import { 
  PipelineRequest, 
  CreatePipelineRequestDTO, 
  UpdatePipelineRequestDTO 
} from '../../../types/models';
import { 
  CreatePipelineRequestSchema, 
  UpdatePipelineRequestSchema 
} from '../../../schema/pipeline';

const COLLECTION = 'pipeline_requests';

export async function fetchPipelineRequests(options?: {
  pipeline_id?: string;
  requester_id?: string;
  status?: string;
}): Promise<{ items: PipelineRequest[] }> {
  try {
    const filters: string[] = [];
    if (options?.pipeline_id) filters.push(pb.filter('pipeline_id = {:pipeline_id}', { pipeline_id: options.pipeline_id }));
    if (options?.requester_id) filters.push(pb.filter('requester_id = {:requester_id}', { requester_id: options.requester_id }));
    if (options?.status) filters.push(pb.filter('status = {:status}', { status: options.status }));

    const filterString = filters.length > 0 ? filters.join(' && ') : '';

    const records = await pb.collection(COLLECTION).getFullList<PipelineRequest>({
      filter: filterString,
      sort: '-created',
      requestKey: null,
    });
    return { items: records };
  } catch (error) {
    console.error(`Error fetching ${COLLECTION}:`, error);
    throw error;
  }
}

export async function fetchPipelineRequest(id: string): Promise<PipelineRequest> {
  try {
    return await pb.collection(COLLECTION).getOne<PipelineRequest>(id, {
      requestKey: null,
    });
  } catch (error) {
    console.error(`Error fetching ${COLLECTION} item ${id}:`, error);
    throw error;
  }
}

export async function createPipelineRequest(data: CreatePipelineRequestDTO): Promise<PipelineRequest> {
  try {
    const validatedData = CreatePipelineRequestSchema.parse(data);
    return await pb.collection(COLLECTION).create<PipelineRequest>(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(`Bad Request: Invalid ${COLLECTION} payload`, error.errors);
    }
    console.error(`Error creating ${COLLECTION}:`, error);
    throw error;
  }
}

export async function updatePipelineRequest(id: string, data: UpdatePipelineRequestDTO): Promise<PipelineRequest> {
  try {
    const validatedData = UpdatePipelineRequestSchema.parse(data);
    return await pb.collection(COLLECTION).update<PipelineRequest>(id, validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(`Bad Request: Invalid ${COLLECTION} payload`, error.errors);
    }
    console.error(`Error updating ${COLLECTION} item ${id}:`, error);
    throw error;
  }
}

export async function deletePipelineRequest(id: string): Promise<void> {
  try {
    await pb.collection(COLLECTION).delete(id);
  } catch (error) {
    console.error(`Error deleting ${COLLECTION} item ${id}:`, error);
    throw error;
  }
}
