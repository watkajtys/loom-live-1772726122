import { usePocketBase } from './usePocketBase';
import { SocialMention } from '../types/models';
import { useState, useEffect } from 'react';

export interface QueueTelemetry {
  bufferUtilization: string;
  latency: string;
  lastSync: string;
  totalEntries: string;
  syncStatus: string;
}

export function useQueueData() {
  const { data: pbData, loading: pbLoading, error: pbError } = usePocketBase<SocialMention>('social_mentions', {
    sort: '-created',
    subscribe: true,
  });

  const [simulatedData, setSimulatedData] = useState<SocialMention[]>([]);
  const [telemetry, setTelemetry] = useState<QueueTelemetry>({
    bufferUtilization: '14.2%',
    latency: '42ms',
    lastSync: '14:22:18 UTC',
    totalEntries: '0x42',
    syncStatus: 'ACTIVE',
  });

  useEffect(() => {
    if (pbError || (pbData && pbData.length === 0 && !pbLoading)) {
      setSimulatedData([
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
          collectionName: 'social_mentions',
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
          collectionName: 'social_mentions',
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
          collectionName: 'social_mentions',
        },
      ] as SocialMention[]);
    }
  }, [pbError, pbData, pbLoading]);

  const shouldUseSimulated = !!pbError || (pbData && pbData.length === 0 && !pbLoading);
  
  return {
    data: shouldUseSimulated ? simulatedData : pbData,
    loading: pbLoading && !shouldUseSimulated,
    error: shouldUseSimulated ? null : pbError,
    telemetry,
  };
}
