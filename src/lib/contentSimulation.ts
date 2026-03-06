import { ContentPipeline } from '../types/models';
import { SemanticIconName } from '../components/Icon';

export type TransformedContentPipeline = ContentPipeline & {
  agentId: string;
  platformIcon: SemanticIconName;
};

export const MOCK_CONTENT_ITEMS: TransformedContentPipeline[] = [
  {
    id: 'mock_doc_1',
    collectionId: 'mock',
    collectionName: 'content_pipeline',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    title: 'Advoloom Architecture V2 Documentation',
    markdown_body: 'Comprehensive overview of the new distributed architecture and agent coordination protocols.',
    status: 'published',
    agentId: 'NEXUS_01',
    platformIcon: 'file-text',
  },
  {
    id: 'mock_doc_2',
    collectionId: 'mock',
    collectionName: 'content_pipeline',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    title: 'Agent Execution Reports Analysis Q1',
    markdown_body: 'Summary of autonomous agent performance metrics and incident resolution times for Q1.',
    status: 'drafting',
    agentId: 'ECHO_04',
    platformIcon: 'line-chart',
  },
  {
    id: 'mock_doc_3',
    collectionId: 'mock',
    collectionName: 'content_pipeline',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    title: 'Community Guidelines Update',
    markdown_body: 'Revised guidelines for community participation and automated moderation thresholds.',
    status: 'review',
    agentId: 'NEXUS_01',
    platformIcon: 'message-square',
  },
  {
    id: 'mock_doc_4',
    collectionId: 'mock',
    collectionName: 'content_pipeline',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    title: 'System Deployment Changelog',
    markdown_body: 'Patch notes for version 2.4.1, including security fixes and performance improvements.',
    status: 'published',
    agentId: 'SYSTEM',
    platformIcon: 'terminal',
  }
];

export const getMockContentPipelineItems = (filter?: string): { items: TransformedContentPipeline[]; totalItems: number } => {
  let filteredItems = MOCK_CONTENT_ITEMS;
  if (filter) {
    if (filter.includes('status="published"')) {
      filteredItems = MOCK_CONTENT_ITEMS.filter(item => item.status === 'published');
    } else if (filter.includes('status="drafting"')) {
      filteredItems = MOCK_CONTENT_ITEMS.filter(item => item.status === 'drafting' || item.status === 'review');
    } else if (filter.includes('status="draft"')) {
      filteredItems = MOCK_CONTENT_ITEMS.filter(item => item.status === 'drafting');
    }
  }

  return {
    items: filteredItems,
    totalItems: filteredItems.length,
  };
};
