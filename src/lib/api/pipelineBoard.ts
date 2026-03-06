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
  UpdatePipelineCardDTO,
  PipelineStep,
  CreatePipelineStepDTO,
  UpdatePipelineStepDTO,
  PipelineRun,
  CreatePipelineRunDTO,
  UpdatePipelineRunDTO
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

// Pipeline Step API

export interface FetchPipelineStepsOptions {
  card_id: string;
  page?: number;
  perPage?: number;
  sort?: string;
}

export const fetchPipelineSteps = async (options: FetchPipelineStepsOptions): Promise<{ items: PipelineStep[]; totalItems: number }> => {
  const { card_id, page = 1, perPage = 50, sort = 'position' } = options;
  
  const result = await pb.collection(COLLECTIONS.PIPELINE_STEPS).getList<PipelineStep>(page, perPage, {
    filter: `card_id="${card_id}"`,
    sort,
    requestKey: null,
  });

  return {
    items: result.items,
    totalItems: result.totalItems,
  };
};

export const createPipelineStep = async (data: CreatePipelineStepDTO): Promise<PipelineStep> => {
  return await pb.collection(COLLECTIONS.PIPELINE_STEPS).create<PipelineStep>(data);
};

export const updatePipelineStep = async (id: string, data: UpdatePipelineStepDTO): Promise<PipelineStep> => {
  return await pb.collection(COLLECTIONS.PIPELINE_STEPS).update<PipelineStep>(id, data);
};

export const deletePipelineStep = async (id: string): Promise<boolean> => {
  return await pb.collection(COLLECTIONS.PIPELINE_STEPS).delete(id);
};

// Pipeline Run API

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
