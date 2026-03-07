import { useMemo } from 'react';
import { usePocketBase } from './usePocketBase';
import { COLLECTIONS } from '../constants/collections';
import { SocialMention, ContentPipeline, AXReport, KnowledgeSource } from '../types/models';

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

export function useOrchestratorFeed() {
  const { data: mentions, loading: loadingMentions } = usePocketBase<SocialMention>(COLLECTIONS.SOCIAL_MENTIONS, { subscribe: true });
  const { data: pipelines, loading: loadingPipelines } = usePocketBase<ContentPipeline>(COLLECTIONS.CONTENT_PIPELINE, { subscribe: true });
  const { data: sources, loading: loadingSources } = usePocketBase<KnowledgeSource>(COLLECTIONS.KNOWLEDGE_SOURCES, { subscribe: true });
  const { data: reports, loading: loadingReports } = usePocketBase<AXReport>(COLLECTIONS.AX_REPORTS, { subscribe: true });

  const feed = useMemo(() => {
    const items: FeedItem[] = [];

    // Map Scout (Social Mentions)
    mentions.forEach((m) => {
      items.push({
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
      });
    });

    // Map Scribe (Content Pipeline)
    pipelines.forEach((p) => {
      items.push({
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
      });
    });

    // Map Ingester (Knowledge Sources)
    sources.forEach((s) => {
      items.push({
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
      });
    });

    // Map Critic (AX Reports)
    reports.forEach((r) => {
      items.push({
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
      });
    });

    // Sort descending by timestamp
    return items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [mentions, pipelines, sources, reports]);

  const loading = loadingMentions || loadingPipelines || loadingSources || loadingReports;

  return { feed, loading };
}
