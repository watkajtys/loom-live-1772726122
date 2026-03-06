import { AXReport } from '../types/models';
import { COLLECTIONS } from '../constants/collections';
import { fetchReports, type FetchReportsOptions } from '../lib/api/reports';
import { usePocketBase } from './usePocketBase';

export interface ReportsFetchOptions extends FetchReportsOptions {
  subscribe?: boolean;
}

export interface ReportsDataResponse {
  data: AXReport[];
  loading: boolean;
  error: Error | null;
}

const fetcher = async ([_, options]: readonly [string, ReportsFetchOptions]) => {
  const result = await fetchReports(options);
  return result.items;
};

export function useAgentExecutionReports(options: ReportsFetchOptions = { subscribe: true }): ReportsDataResponse {
  const { data, loading, error } = usePocketBase<AXReport, ReportsFetchOptions>(
    COLLECTIONS.AX_REPORTS,
    options,
    fetcher
  );

  return {
    data: data as AXReport[],
    loading,
    error: error || null,
  };
}
