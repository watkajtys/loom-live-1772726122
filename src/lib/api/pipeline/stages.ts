import { pb } from '../../pocketbase';
import { PipelineStage, CreatePipelineStageDTO, UpdatePipelineStageDTO } from '../../../types/models';
import { COLLECTIONS } from '../../../constants/collections';

export interface FetchPipelineStagesOptions {
  pipeline_id: string;
  page?: number;
  perPage?: number;
  sort?: string;
}

export const fetchPipelineStages = async (options: FetchPipelineStagesOptions): Promise<{ items: PipelineStage[]; totalItems: number }> => {
  const { pipeline_id, page = 1, perPage = 50, sort = 'position' } = options;
  
  const result = await pb.collection(COLLECTIONS.PIPELINE_STAGES).getList<PipelineStage>(page, perPage, {
    filter: `pipeline_id="${pipeline_id}"`,
    sort,
    requestKey: null,
  });

  return {
    items: result.items,
    totalItems: result.totalItems,
  };
};

export const createPipelineStage = async (data: CreatePipelineStageDTO): Promise<PipelineStage> => {
  return await pb.collection(COLLECTIONS.PIPELINE_STAGES).create<PipelineStage>(data);
};

export const updatePipelineStage = async (id: string, data: UpdatePipelineStageDTO): Promise<PipelineStage> => {
  return await pb.collection(COLLECTIONS.PIPELINE_STAGES).update<PipelineStage>(id, data);
};

export const deletePipelineStage = async (id: string): Promise<boolean> => {
  return await pb.collection(COLLECTIONS.PIPELINE_STAGES).delete(id);
};
