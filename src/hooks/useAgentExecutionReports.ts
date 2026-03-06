import useSWR from 'swr';
import { AXReport } from '../types/models';
import { COLLECTIONS } from '../constants/collections';
import { fetchReports, type FetchReportsOptions } from '../lib/api/reports';
import { useRealtimeSubscription } from './useRealtimeSubscription';

export interface ReportsFetchOptions extends FetchReportsOptions {
  subscribe?: boolean;
}

export interface ReportsDataResponse {
  data: AXReport[];
  loading: boolean;
  error: Error | null;
}

const fetcher = async ([collection, options]: readonly [string, ReportsFetchOptions]) => {
  const result = await fetchReports(options);
  return result.items;
};

export function useAgentExecutionReports(options: ReportsFetchOptions = {}): ReportsDataResponse {
  const { subscribe = true, ...fetchOptions } = options;
  const swrKey = [COLLECTIONS.AX_REPORTS, fetchOptions] as const;

  const { data, error, isLoading, mutate } = useSWR<AXReport[], Error>(
    swrKey,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  useRealtimeSubscription<AXReport>({
    collectionName: COLLECTIONS.AX_REPORTS,
    subscribe,
    filter: fetchOptions.filter,
  }, mutate);

  return {
    data: data || [],
    loading: isLoading,
    error: error || null,
  };
}
