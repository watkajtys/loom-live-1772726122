import { pb } from '../pocketbase';
import { SocialMention } from '../../types/models';
import { COLLECTIONS } from '../../constants/collections';

export interface FetchQueueOptions {
  page?: number;
  perPage?: number;
  filter?: string;
  sort?: string;
}

export const fetchQueueItems = async (options: FetchQueueOptions = {}): Promise<{ items: SocialMention[]; totalItems: number }> => {
  const { page = 1, perPage = 50, filter, sort = '-created' } = options;
  
  const result = await pb.collection(COLLECTIONS.SOCIAL_MENTIONS).getList<SocialMention>(page, perPage, {
    filter,
    sort,
    requestKey: null,
  });

  return {
    items: result.items,
    totalItems: result.totalItems,
  };
};

export const fetchQueueItemById = async (id: string): Promise<SocialMention> => {
  return await pb.collection(COLLECTIONS.SOCIAL_MENTIONS).getOne<SocialMention>(id, { requestKey: null });
};

export const updateQueueItem = async (id: string, data: Partial<SocialMention>): Promise<SocialMention> => {
  return await pb.collection(COLLECTIONS.SOCIAL_MENTIONS).update<SocialMention>(id, data);
};

export const createQueueItem = async (data: Omit<SocialMention, 'id' | 'created' | 'updated' | 'collectionId' | 'collectionName'>): Promise<SocialMention> => {
  return await pb.collection(COLLECTIONS.SOCIAL_MENTIONS).create<SocialMention>(data);
};

export const deleteQueueItem = async (id: string): Promise<boolean> => {
  return await pb.collection(COLLECTIONS.SOCIAL_MENTIONS).delete(id);
};
