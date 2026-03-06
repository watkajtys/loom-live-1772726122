import { pb } from '../pocketbase';
import { ContentPipeline, CreateContentPipelineDTO, UpdateContentPipelineDTO } from '../../types/models';
import { COLLECTIONS } from '../../constants/collections';
import { SemanticIconName } from '../../components/Icon';
import { getMockContentPipelineItems, TransformedContentPipeline } from '../contentSimulation';

export interface FetchContentOptions {
  page?: number;
  perPage?: number;
  filter?: string;
  sort?: string;
}

export type { TransformedContentPipeline };

export const fetchContentPipeline = async (options: FetchContentOptions = {}): Promise<{ items: TransformedContentPipeline[]; totalItems: number }> => {
  const { page = 1, perPage = 50, filter, sort = '-created' } = options;
  
  try {
    const result = await pb.collection(COLLECTIONS.CONTENT_PIPELINE).getList<ContentPipeline>(page, perPage, {
      filter,
      sort,
      requestKey: null,
    });

    const transformedItems = result.items.map((item) => {
      // Relying on data from DB if available, otherwise safely defaulting 
      // to prevent magic string operations here
      return {
        ...item,
        agentId: item.agentId || 'SYSTEM',
        platformIcon: item.platformIcon as SemanticIconName || 'terminal'
      };
    });

    return {
      items: transformedItems,
      totalItems: result.totalItems,
    };
  } catch (error) {
    console.warn('Using fallback data for ContentPipeline.', error);
    return getMockContentPipelineItems(filter);
  }
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
