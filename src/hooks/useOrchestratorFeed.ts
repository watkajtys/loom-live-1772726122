import { useMemo } from 'react';
import useSWR from 'swr';
import { pb } from '../lib/pocketbase';
import { COLLECTIONS } from '../constants/collections';
import { SocialMention, ContentPipeline, AXReport, KnowledgeSource } from '../types/models';
import { useRealtimeSubscription } from './useRealtimeSubscription';

export interface FeedItem {
  id: string;
  timestamp: string;
  agent: string;
  title: string;
  metadata: { label: string; value: string; isError?: boolean }[];
  decisionLog: string;
  status: string;
  statusColor: 'terminal-cyan' | 'terminal-green' | 'red-500' | 'slate-500' | 'text-red-500' | 'text-terminal-green' | 'text-terminal-cyan' | 'text-slate-500';
  isError?: boolean;
}

type FeedMapper<T> = (item: T) => FeedItem;

export interface FeedProviderConfig<T> {
  collection: string;
  mapFn: FeedMapper<T>;
}

export const FEED_PROVIDERS: FeedProviderConfig<any>[] = [
  {
    collection: COLLECTIONS.SOCIAL_MENTIONS,
    mapFn: (m: SocialMention) => ({
      id: m.id,
      timestamp: m.created || new Date().toISOString(),
      agent: 'SCOUT',
      title: 'SOCIAL_MENTION_DETECTED',
      metadata: [
        { label: 'PLATFORM', value: m.platform },
        { label: 'QUERY', value: m.query }
      ],
      decisionLog: m.draft_reply,
      status: m.status?.toUpperCase() || 'UNKNOWN',
      statusColor: m.status === 'pending_approval' || m.status === 'queued' ? 'text-terminal-cyan' : 'text-slate-500'
    })
  },
  {
    collection: COLLECTIONS.CONTENT_PIPELINE,
    mapFn: (p: ContentPipeline) => ({
      id: p.id,
      timestamp: p.created || new Date().toISOString(),
      agent: 'SCRIBE',
      title: 'CONTENT_GENERATION',
      metadata: [
        { label: 'TITLE', value: p.title }
      ],
      decisionLog: p.markdown_body ? (p.markdown_body.length > 100 ? p.markdown_body.substring(0, 100) + '...' : p.markdown_body) : '',
      status: p.status?.toUpperCase() || 'UNKNOWN',
      statusColor: p.status === 'published' ? 'text-terminal-green' : 'text-terminal-cyan'
    })
  },
  {
    collection: COLLECTIONS.KNOWLEDGE_SOURCES,
    mapFn: (s: KnowledgeSource) => ({
      id: s.id,
      timestamp: s.created || new Date().toISOString(),
      agent: 'INGESTER',
      title: 'KNOWLEDGE_INGESTION',
      metadata: [
        { label: 'SOURCE', value: s.source_type },
        { label: 'URL', value: s.url }
      ],
      decisionLog: `Vectorization status: ${s.vectorization_status}. Last synced: ${s.last_synced}`,
      status: s.vectorization_status?.toUpperCase() || 'UNKNOWN',
      statusColor: s.vectorization_status === 'vectorized' ? 'text-terminal-green' : (s.vectorization_status === 'failed' ? 'text-red-500' : 'text-terminal-cyan'),
      isError: s.vectorization_status === 'failed'
    })
  },
  {
    collection: COLLECTIONS.AX_REPORTS,
    mapFn: (r: AXReport) => ({
      id: r.id,
      timestamp: r.created || new Date().toISOString(),
      agent: 'CRITIC',
      title: 'SYSTEM_ANALYSIS',
      metadata: [
        { label: 'ISSUE', value: 'ERROR_LOG_DETECTED', isError: true }
      ],
      decisionLog: `Analyzed: ${r.error_log}\nSuggested Fix: ${r.suggested_fix}`,
      status: r.status?.toUpperCase() || 'UNKNOWN',
      statusColor: 'text-red-500',
      isError: true
    })
  }
];

const fetchMultiFeeds = async (): Promise<FeedItem[]> => {
  const promises = FEED_PROVIDERS.map(async (config) => {
    try {
      const records = await pb.collection(config.collection).getList(1, 50, { requestKey: null });
      return records.items.map(config.mapFn);
    } catch (e) {
      console.error(`Failed to fetch feed from ${config.collection}`, e);
      return [];
    }
  });
  
  const results = await Promise.all(promises);
  const items = results.flat();
  return items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export function useOrchestratorFeed() {
  const { data, isLoading, mutate } = useSWR<FeedItem[]>('orchestrator_feed', fetchMultiFeeds, {
    keepPreviousData: true,
  });

  // Use a custom realtime hook logic to revalidate the single SWR key whenever any of the collections update
  FEED_PROVIDERS.forEach((config) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRealtimeSubscription(config.collection, true, () => {
      mutate();
    });
  });

  return { feed: data || [], loading: isLoading };
}
