import { pb } from '../pocketbase';
import { ContentPipeline, CreateContentPipelineDTO, UpdateContentPipelineDTO } from '../../types/models';
import { COLLECTIONS } from '../../constants/collections';

export interface FetchContentOptions {
  page?: number;
  perPage?: number;
  filter?: string;
  sort?: string;
}

export const fetchContentPipeline = async (options: FetchContentOptions = {}): Promise<{ items: ContentPipeline[]; totalItems: number }> => {
  const { page = 1, perPage = 50, filter, sort = '-created' } = options;
  
  const result = await pb.collection(COLLECTIONS.CONTENT_PIPELINE).getList<ContentPipeline>(page, perPage, {
    filter,
    sort,
    requestKey: null,
  });

  return {
    items: result.items,
    totalItems: result.totalItems,
  };
};

export const createContentPipeline = async (data: CreateContentPipelineDTO): Promise<ContentPipeline> => {
  return await pb.collection(COLLECTIONS.CONTENT_PIPELINE).create<ContentPipeline>(data);
};

export const updateContentPipeline = async (id: string, data: UpdateContentPipelineDTO): Promise<ContentPipeline> => {
  return await pb.collection(COLLECTIONS.CONTENT_PIPELINE).update<ContentPipeline>(id, data);
};

export const deleteContentPipeline = async (id: string): Promise<boolean> => {
  return await pb.collection(COLLECTIONS.CONTENT_PIPELINE).delete(id);
};
