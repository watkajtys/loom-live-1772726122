import { pb } from './pocketbase';
import { COLLECTIONS } from '../constants/collections';
import { SocialMention } from '../types/models';
import { MOCK_SOCIAL_MENTIONS } from './mockData';

export const fetchQueueData = async (page = 1, perPage = 50): Promise<SocialMention[]> => {
  try {
    const records = await pb.collection(COLLECTIONS.SOCIAL_MENTIONS).getList<SocialMention>(page, perPage, {
      sort: '-created',
    });
    
    // Simulate empty state check or fallback to mock
    if (records.items.length === 0) {
      console.warn('No records found in real DB, falling back to mock data.');
      return MOCK_SOCIAL_MENTIONS;
    }
    
    return records.items;
  } catch (err) {
    console.error('Failed to fetch from real DB, falling back to mock data.', err);
    return MOCK_SOCIAL_MENTIONS;
  }
};
