import { pb } from '../pocketbase';
import { ContentPipeline, CreateContentPipelineDTO, UpdateContentPipelineDTO } from '../../types/models';
import { COLLECTIONS } from '../../constants/collections';
import { MOCK_CONTENT_ITEMS } from '../contentSimulation';


export interface FetchContentOptions {
  page?: number;
  perPage?: number;
  filter?: string;
  sort?: string;
}

export const fetchContentPipeline = async (options: FetchContentOptions = {}): Promise<{ items: ContentPipeline[]; totalItems: number }> => {
  const { page = 1, perPage = 50, filter, sort = '-created' } = options;
  
  try {
    const result = await pb.collection(COLLECTIONS.CONTENT_PIPELINE).getList<ContentPipeline>(page, perPage, {
      filter,
      sort,
      requestKey: null,
    });

    return {
      items: result.items,
      totalItems: result.totalItems,
    };
  } catch (error) {
    console.warn('Using mock data for Content Pipeline due to error:', error);
    // Basic mock filtering to allow UI to function
    let items = [...MOCK_CONTENT_ITEMS];
    if (filter) {
      if (filter.includes('status="published"')) items = items.filter(i => i.status === 'published');
      if (filter.includes('status="drafting"')) items = items.filter(i => i.status === 'drafting' || i.status === 'review');
      if (filter.includes('status="draft"')) items = items.filter(i => false); // Mock empty state
      if (filter.includes('~')) items = items.filter(i => filter.includes(i.title) || filter.includes(i.markdown_body)); // simple search
    }
    return {
      items,
      totalItems: items.length,
    };
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
