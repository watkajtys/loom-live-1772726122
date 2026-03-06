import useSWR from 'swr';
import { useEffect } from 'react';
import { pb } from '../lib/pocketbase';
import { SocialMention } from '../types/models';
import { COLLECTIONS } from '../constants/collections';
import { useQueueTelemetry, QueueTelemetry } from './useQueueTelemetry';

export type { QueueTelemetry };

export interface QueueFetchOptions {
  page?: number;
  perPage?: number;
  filter?: string;
  sort?: string;
  subscribe?: boolean;
}

export interface QueueDataResponse {
  data: SocialMention[] | undefined;
  loading: boolean;
  error: Error | null;
  telemetry: QueueTelemetry;
}

const fetcher = async ([collection, options]: [string, QueueFetchOptions]) => {
  const records = await pb.collection(collection).getList<SocialMention>(
    options.page || 1,
    options.perPage || 50,
    {
      filter: options.filter,
      sort: options.sort || '-created',
    }
  );
  return records.items;
};

export function useQueueData(options: QueueFetchOptions = {}): QueueDataResponse {
  const { subscribe = true, ...fetchOptions } = options;
  const swrKey = [COLLECTIONS.SOCIAL_MENTIONS, fetchOptions] as const;

  const { data, error, isLoading, mutate } = useSWR<SocialMention[], Error>(
    swrKey,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    let isMounted = true;
    let unsubscribeFunc: (() => void) | undefined;

    if (subscribe) {
      pb.collection(COLLECTIONS.SOCIAL_MENTIONS).subscribe<SocialMention>('*', (e) => {
        mutate((prevData) => {
          if (!prevData) return prevData;
          if (e.action === 'create') {
            return [e.record, ...prevData];
          } else if (e.action === 'update') {
            return prevData.map((item) => (item.id === e.record.id ? e.record : item));
          } else if (e.action === 'delete') {
            return prevData.filter((item) => item.id !== e.record.id);
          }
          return prevData;
        }, false);
      }, { filter: fetchOptions.filter }).then((unsub) => {
        if (!isMounted) {
          unsub();
        } else {
          unsubscribeFunc = unsub;
        }
      }).catch(console.error);
    }

    return () => {
      isMounted = false;
      if (unsubscribeFunc) {
        unsubscribeFunc();
      }
    };
  }, [subscribe, fetchOptions.filter, mutate]);

  const telemetry = useQueueTelemetry(data?.length || 0);

  return {
    data,
    loading: isLoading,
    error: error || null,
    telemetry,
  };
}
