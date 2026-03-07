import { ValidationError } from '../errors';
import { z } from 'zod';
import { pb } from '../../pocketbase';
import { PipelineRequest } from '../../../types/models';
import { 
  CreatePipelineRequestSchema, 
  UpdatePipelineRequestSchema,
  FetchPipelineRequestsOptionsSchema,
  DeletePipelineRequestIdSchema,
  FetchPipelineRequestsOptionsDTO,
  CreatePipelineRequestDTO,
  UpdatePipelineRequestDTO
} from '../../../schema/pipeline';

const COLLECTION = 'pipeline_requests';

/**
 * Fetches a paginated and filtered list of Pipeline Requests.
 * Enforces URL parameter governance by strictly validating search queries.
 */
export async function fetchPipelineRequests(options?: FetchPipelineRequestsOptionsDTO): Promise<{ items: PipelineRequest[] }> {
  try {
    const validatedOptions = FetchPipelineRequestsOptionsSchema.parse(options || {});
    
    const filters: string[] = [];
    if (validatedOptions.pipeline_id) filters.push(pb.filter('pipeline_id = {:pipeline_id}', { pipeline_id: validatedOptions.pipeline_id }));
    if (validatedOptions.requester_id) filters.push(pb.filter('requester_id = {:requester_id}', { requester_id: validatedOptions.requester_id }));
    if (validatedOptions.status) filters.push(pb.filter('status = {:status}', { status: validatedOptions.status }));

    const filterString = filters.length > 0 ? filters.join(' && ') : '';

    const records = await pb.collection(COLLECTION).getFullList<PipelineRequest>({
      filter: filterString,
      sort: '-created',
      requestKey: null,
    });
    return { items: records };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid fetch options', error.issues);
    }
    throw error;
  }
}

/**
 * Retrieves a single Pipeline Request by its ID.
 */
export async function fetchPipelineRequest(id: string): Promise<PipelineRequest> {
  try {
    return await pb.collection(COLLECTION).getOne<PipelineRequest>(id, {
      requestKey: null,
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Creates a new Pipeline Request.
 * Validates the request body payload against the designated schema.
 */
export async function createPipelineRequest(data: CreatePipelineRequestDTO): Promise<PipelineRequest> {
  try {
    const validatedData = CreatePipelineRequestSchema.parse(data);
    return await pb.collection(COLLECTION).create<PipelineRequest>(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(`Bad Request: Invalid ${COLLECTION} payload`, error.issues);
    }
    throw error;
  }
}

/**
 * Updates an existing Pipeline Request.
 * Validates the partial payload against the designated schema.
 */
export async function updatePipelineRequest(id: string, data: UpdatePipelineRequestDTO): Promise<PipelineRequest> {
  try {
    const validatedData = UpdatePipelineRequestSchema.parse(data);
    return await pb.collection(COLLECTION).update<PipelineRequest>(id, validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(`Bad Request: Invalid ${COLLECTION} payload`, error.issues);
    }
    throw error;
  }
}

/**
 * Deletes a Pipeline Request by its ID.
 * Validates the ID parameter before executing the deletion.
 */
export async function deletePipelineRequest(id: string): Promise<void> {
  try {
    const validatedId = DeletePipelineRequestIdSchema.parse(id);
    await pb.collection(COLLECTION).delete(validatedId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Bad Request: Invalid pipeline request ID', error.issues);
    }
    throw error;
  }
}
