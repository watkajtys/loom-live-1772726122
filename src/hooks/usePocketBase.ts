import useSWR from 'swr';
import { useEffect } from 'react';
import { RecordModel } from 'pocketbase';
import { pb } from '../lib/pocketbase';

export interface UsePocketBaseOptions {
  page?: number;
  perPage?: number;
  filter?: string;
  sort?: string;
  subscribe?: boolean;
}

const fetcher = async <T extends RecordModel>([collectionName, options]: readonly [string, UsePocketBaseOptions]) => {
  const { page = 1, perPage = 50, filter, sort } = options;
  const records = await pb.collection(collectionName).getList<T>(page, perPage, {
    filter,
    sort,
    requestKey: null,
  });
  return records.items;
};

export function usePocketBase<T extends RecordModel = RecordModel>(
  collectionName: string,
  options: UsePocketBaseOptions = {}
) {
  const { subscribe = false, ...fetchOptions } = options;
  const swrKey = [collectionName, fetchOptions] as const;

  const { data, error, isLoading, mutate } = useSWR<T[], Error>(
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
      // Avoid global '*' subscription. Instead subscribe with the filter config from the hook arguments.
      // This solves the performance landmine mentioned in the architectural review.
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
  }, [collectionName, subscribe, fetchOptions.filter, mutate]);

  return { data: data || [], loading: isLoading, error };
}
