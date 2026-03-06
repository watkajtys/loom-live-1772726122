import { useEffect } from 'react';
import { RecordModel } from 'pocketbase';
import { KeyedMutator } from 'swr';
import { pb } from '../lib/pocketbase';

export interface UseRealtimeSubscriptionOptions {
  collectionName: string;
  subscribe?: boolean;
  filter?: string;
}

export function useRealtimeSubscription<T extends RecordModel>(
  options: UseRealtimeSubscriptionOptions,
  mutate: KeyedMutator<T[]>
) {
  const { collectionName, subscribe = false, filter } = options;

  useEffect(() => {
    let isMounted = true;
    let unsubscribeFunc: (() => void) | undefined;

    if (subscribe) {
      pb.collection(collectionName).subscribe<T>('*', (e) => {
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
      }, { filter }).then((unsub) => {
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
  }, [collectionName, subscribe, filter, mutate]);
}
