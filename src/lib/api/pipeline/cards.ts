import { pb } from '../../pocketbase';
import { PipelineCard, CreatePipelineCardDTO, UpdatePipelineCardDTO } from '../../../types/models';
import { COLLECTIONS } from '../../../constants/collections';

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
  return await pb.collection(COLLECTIONS.PIPELINE_CARDS).create<PipelineCard>(data);
};

export const updatePipelineCard = async (id: string, data: UpdatePipelineCardDTO): Promise<PipelineCard> => {
  return await pb.collection(COLLECTIONS.PIPELINE_CARDS).update<PipelineCard>(id, data);
};

export const deletePipelineCard = async (id: string): Promise<boolean> => {
  return await pb.collection(COLLECTIONS.PIPELINE_CARDS).delete(id);
};
