import { SocialMention } from '../types/models';
import { COLLECTIONS } from '../constants/collections';

export const MOCK_SOCIAL_MENTIONS: SocialMention[] = [
  {
    id: '0x421',
    platform: 'DISCORD',
    query: '"How do I implement the new Webhooks API for real-time ingestions? I\'m getting a 403 error on..."',
    draft_reply: '',
    status: 'drafting',
    user: '@dev_guru',
    priority: 88,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    collectionId: 'mock1',
    collectionName: COLLECTIONS.SOCIAL_MENTIONS,
  },
  {
    id: '0x422',
    platform: 'GITHUB',
    query: 'INGEST: Pull Request #992 - Update documentation for multi-tenant architecture support...',
    draft_reply: '',
    status: 'pending_approval',
    user: 'octocat_42',
    priority: 45,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    collectionId: 'mock1',
    collectionName: COLLECTIONS.SOCIAL_MENTIONS,
  },
  {
    id: '0x425',
    platform: 'X',
    query: '"Excited to see the autonomous agent features! Any plans for supporting local LLM deployments?"',
    draft_reply: '',
    status: 'queued',
    user: '@tech_lead_x',
    priority: 92,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    collectionId: 'mock1',
    collectionName: COLLECTIONS.SOCIAL_MENTIONS,
  },
];
