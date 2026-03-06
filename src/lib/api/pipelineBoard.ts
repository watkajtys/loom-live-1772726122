import { pb } from '../pocketbase';
import { 
  Pipeline, 
  CreatePipelineDTO, 
  UpdatePipelineDTO,
  PipelineStage,
  CreatePipelineStageDTO,
  UpdatePipelineStageDTO,
  PipelineCard,
  CreatePipelineCardDTO,
  UpdatePipelineCardDTO
} from '../../types/models';
import { COLLECTIONS } from '../../constants/collections';

// Pipeline API

export interface FetchPipelinesOptions {
  page?: number;
  perPage?: number;
  filter?: string;
  sort?: string;
}

export const fetchPipelines = async (options: FetchPipelinesOptions = {}): Promise<{ items: Pipeline[]; totalItems: number }> => {
  const { page = 1, perPage = 50, filter, sort = '-created' } = options;
  
  const result = await pb.collection(COLLECTIONS.PIPELINES).getList<Pipeline>(page, perPage, {
    filter,
    sort,
    requestKey: null,
  });

  return {
    items: result.items,
    totalItems: result.totalItems,
  };
};

export const createPipeline = async (data: CreatePipelineDTO): Promise<Pipeline> => {
  return await pb.collection(COLLECTIONS.PIPELINES).create<Pipeline>(data);
};

export const updatePipeline = async (id: string, data: UpdatePipelineDTO): Promise<Pipeline> => {
  return await pb.collection(COLLECTIONS.PIPELINES).update<Pipeline>(id, data);
};

export const deletePipeline = async (id: string): Promise<boolean> => {
  return await pb.collection(COLLECTIONS.PIPELINES).delete(id);
};

// Pipeline Stage API

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

// Pipeline Card API

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
