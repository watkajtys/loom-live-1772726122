import { useState, useEffect } from 'react';
import { RecordModel } from 'pocketbase';
import { pb } from '../lib/pocketbase';

export function usePocketBase<T extends RecordModel = RecordModel>(
  collectionName: string,
  options: { page?: number; perPage?: number; filter?: string; sort?: string; subscribe?: boolean } = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { page = 1, perPage = 50, filter, sort, subscribe } = options;

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const records = await pb.collection(collectionName).getList<T>(
          page,
          perPage,
          {
            filter: filter,
            sort: sort,
          }
        );
        if (isMounted) {
          setData(records.items);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted && err.name !== 'ClientResponseError') {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    if (subscribe) {
      // Avoid global '*' subscription. Instead subscribe with the filter config from the hook arguments.
      // This solves the performance landmine mentioned in the architectural review.
      pb.collection(collectionName).subscribe<T>('*', (e) => {
        if (e.action === 'create') {
          setData((prev) => [e.record, ...prev]);
        } else if (e.action === 'update') {
          setData((prev) => prev.map((item: T) => (item.id === e.record.id ? e.record : item)));
        } else if (e.action === 'delete') {
          setData((prev) => prev.filter((item: T) => item.id !== e.record.id));
        }
      }, { filter });
    }

    return () => {
      isMounted = false;
      if (subscribe) {
        pb.collection(collectionName).unsubscribe('*');
      }
    };
  }, [collectionName, page, perPage, filter, sort, subscribe]);

  return { data, loading, error };
}
