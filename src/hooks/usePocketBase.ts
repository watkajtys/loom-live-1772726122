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

  useRealtimeSubscription<T>({
    collectionName,
    subscribe,
    filter: fetchOptions.filter,
  }, mutate);

  return { data: data || [], loading: isLoading, error };
}
