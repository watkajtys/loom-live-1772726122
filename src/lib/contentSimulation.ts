import { ContentPipeline } from '../types/models';

export const generateMockContentData = (overrides: Partial<ContentPipeline> = {}, index: number = 0): ContentPipeline => {
  return {
    id: `mock_content_id_${index}`,
    collectionId: 'content_pipeline_col',
    collectionName: 'content_pipeline',
    created: '2024-03-01T12:00:00.000Z',
    updated: '2024-03-01T12:00:00.000Z',
    title: 'Default Mock Content Deck Title',
    markdown_body: 'This is a mock body for the content deck. It contains some basic text to demonstrate how the content will be rendered within the pipeline card. The card should truncate this text gracefully.',
    status: 'drafting',
    ...overrides
  };
};

export const simulateFetchContentPipeline = (options: { filter?: string; sort?: string; page?: number; perPage?: number }) => {
  const { filter } = options;
  let items = [...MOCK_CONTENT_ITEMS];
  
  if (filter) {
    if (filter.includes('status="published"')) items = items.filter(i => i.status === 'published');
    if (filter.includes('status="drafting"')) items = items.filter(i => i.status === 'drafting' || i.status === 'review');
    if (filter.includes('status="draft"')) items = items.filter(i => false); // Mock empty state
    
    // Simple mock search simulation
    const searchMatch = filter.match(/~ "([^"]+)"/);
    if (searchMatch && searchMatch[1]) {
      const searchTerm = searchMatch[1].toLowerCase();
      items = items.filter(i => 
        i.title.toLowerCase().includes(searchTerm) || 
        i.markdown_body.toLowerCase().includes(searchTerm)
      );
    }
  }
  
  return {
    items,
    totalItems: items.length,
  };
};

export const MOCK_CONTENT_ITEMS: ContentPipeline[] = [
  generateMockContentData({
    id: 'mock_content_nexus_1',
    title: 'Advoloom Architecture V2 Documentation',
    markdown_body: 'Comprehensive guide covering the new terminal-inspired UI, data layer separation, and SWR caching strategy for robust asynchronous operations.',
    status: 'published'
  }, 1),
  generateMockContentData({
    id: 'mock_content_echo_2',
    title: 'Community Queue Automation Rules',
    markdown_body: 'Outlines the heuristic rules used by Agent Echo_04 to prioritize and route social mentions from Discord and X/Twitter into the Community Queue.',
    status: 'review'
  }, 2),
  generateMockContentData({
    id: 'mock_content_nexus_3',
    title: 'Agent Execution Reports Analysis Q1',
    markdown_body: 'Statistical breakdown of agent success rates, common failure points, and optimization strategies for the upcoming quarter.',
    status: 'drafting'
  }, 3),
  generateMockContentData({
    id: 'mock_content_echo_4',
    title: 'Knowledge Base Vectorization Pipeline',
    markdown_body: 'Draft specification for integrating new embedding models and optimizing the vector search retrieval latency for the Knowledge Base.',
    status: 'drafting'
  }, 4)
];
