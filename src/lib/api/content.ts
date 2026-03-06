import { pb } from '../pocketbase';
import { ContentPipeline, CreateContentPipelineDTO, UpdateContentPipelineDTO } from '../../types/models';
import { COLLECTIONS } from '../../constants/collections';


export interface FetchContentOptions {
  page?: number;
  perPage?: number;
  filter?: string;
  sort?: string;
}

import { SemanticIconName } from '../../components/Icon';

export type TransformedContentPipeline = ContentPipeline & {
  agentId: string;
  platformIcon: SemanticIconName;
};

export const fetchContentPipeline = async (options: FetchContentOptions = {}): Promise<{ items: TransformedContentPipeline[]; totalItems: number }> => {
  const { page = 1, perPage = 50, filter, sort = '-created' } = options;
  
  const result = await pb.collection(COLLECTIONS.CONTENT_PIPELINE).getList<ContentPipeline>(page, perPage, {
    filter,
    sort,
    requestKey: null,
  });

  const icons: SemanticIconName[] = ['terminal', 'alternate_email', 'forum', 'article'];

  const transformedItems = result.items.map((item) => {
    // Transformer logic for Agent assignment
    const agentId = (item.id.charCodeAt(0) % 2 === 0) ? 'NEXUS_01' : 'ECHO_04';
    
    // Transformer logic for platform icon
    const iconIndex = item.id ? item.id.charCodeAt(0) % icons.length : 3;
    const platformIcon = icons[iconIndex];

    return {
      ...item,
      agentId,
      platformIcon
    };
  });

  return {
    items: transformedItems,
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
