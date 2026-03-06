import { pb } from '../pocketbase';
import { AXReport } from '../../types/models';
import { COLLECTIONS } from '../../constants/collections';

export interface FetchReportsOptions {
  page?: number;
  perPage?: number;
  filter?: string;
  sort?: string;
}

export const fetchReports = async (options: FetchReportsOptions = {}): Promise<{ items: AXReport[]; totalItems: number }> => {
  const { page = 1, perPage = 50, filter, sort = '-created' } = options;
  
  const result = await pb.collection(COLLECTIONS.AX_REPORTS).getList<AXReport>(page, perPage, {
    filter,
    sort,
    requestKey: null,
  });

  return {
    items: result.items,
    totalItems: result.totalItems,
  };
};
