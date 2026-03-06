import { pb } from '../../pocketbase';
import { PipelineRun, CreatePipelineRunDTO, UpdatePipelineRunDTO } from '../../../types/models';
import { COLLECTIONS } from '../../../constants/collections';

export interface FetchPipelineRunsOptions {
  pipeline_id: string;
  page?: number;
  perPage?: number;
  sort?: string;
}

export const fetchPipelineRuns = async (options: FetchPipelineRunsOptions): Promise<{ items: PipelineRun[]; totalItems: number }> => {
  const { pipeline_id, page = 1, perPage = 50, sort = '-started_at' } = options;
  
  const result = await pb.collection(COLLECTIONS.PIPELINE_RUNS).getList<PipelineRun>(page, perPage, {
    filter: `pipeline_id="${pipeline_id}"`,
    sort,
    requestKey: null,
  });

  return {
    items: result.items,
    totalItems: result.totalItems,
  };
};

export const createPipelineRun = async (data: CreatePipelineRunDTO): Promise<PipelineRun> => {
  return await pb.collection(COLLECTIONS.PIPELINE_RUNS).create<PipelineRun>(data);
};

export const updatePipelineRun = async (id: string, data: UpdatePipelineRunDTO): Promise<PipelineRun> => {
  return await pb.collection(COLLECTIONS.PIPELINE_RUNS).update<PipelineRun>(id, data);
};

export const deletePipelineRun = async (id: string): Promise<boolean> => {
  return await pb.collection(COLLECTIONS.PIPELINE_RUNS).delete(id);
};
