import { SocialMention } from '../types/models';

export const generateMockQueueData = (overrides: Partial<SocialMention> = {}, index: number = 0): SocialMention => {
  return {
    id: `mock_queue_id_${index}`,
    collectionId: 'social_mentions_col',
    collectionName: 'social_mentions',
    created: '2024-03-01T12:00:00.000Z',
    updated: '2024-03-01T12:00:00.000Z',
    platform: 'DISCORD',
    query: 'Default mock query text',
    draft_reply: '',
    status: 'drafting',
    user: 'mock_user',
    priority: 50,
    ...overrides
  };
};

export const MOCK_QUEUE_ITEMS: SocialMention[] = [
  generateMockQueueData({
    id: 'mock_test_123',
    platform: 'DISCORD',
    query: 'Test query',
    user: 'test_user'
  }, 1)
];
