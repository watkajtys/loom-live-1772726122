import useSWR from 'swr';
import { RecordModel } from 'pocketbase';
import { pb } from '../lib/pocketbase';
import { useRealtimeSubscription } from './useRealtimeSubscription';

export interface UsePocketBaseOptions {
  page?: number;
  perPage?: number;
  filter?: string;
  sort?: string;
  subscribe?: boolean;
}

const defaultFetcher = async <T extends RecordModel>([collectionName, options]: readonly [string, UsePocketBaseOptions]) => {
  const { page = 1, perPage = 50, filter, sort } = options;
  const records = await pb.collection(collectionName).getList<T>(page, perPage, {
    filter,
    sort,
    requestKey: null,
  });
  return records.items;
};

export function usePocketBase<T extends RecordModel = RecordModel, O extends UsePocketBaseOptions = UsePocketBaseOptions>(
  collectionName: string,
  options: O = {} as O,
  customFetcher?: (args: readonly [string, O]) => Promise<T[]>
) {
  const { subscribe = false, ...fetchOptions } = options;
  const swrKey = [collectionName, fetchOptions] as const;

  const activeFetcher = customFetcher || defaultFetcher as unknown as (args: readonly [string, O]) => Promise<T[]>;

  const { data, error, isLoading, mutate } = useSWR<T[], Error>(
    swrKey,
    activeFetcher,
    {
      keepPreviousData: true,
    }
  );

  useRealtimeSubscription<T>({
    collectionName,
    subscribe,
    filter: fetchOptions.filter,
  }, mutate);

  return { data: data || [], loading: isLoading, error: error || null, mutate };
}
