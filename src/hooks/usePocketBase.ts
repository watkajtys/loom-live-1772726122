import { useState, useEffect } from 'react';
import { pb } from '../lib/pb';
import { BaseModel } from '../types';

interface UsePocketBaseOptions {
  page?: number;
  perPage?: number;
  sort?: string;
  filter?: string;
}

export function usePocketBase<T extends BaseModel>(
  collectionName: string,
  options: UsePocketBaseOptions = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  const { page = 1, perPage = 50, sort = '-created', filter = '' } = options;

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await pb.collection(collectionName).getList<T>(page, perPage, {
          sort,
          filter,
        });
        if (isMounted) {
          setData(result.items);
          setTotalItems(result.totalItems);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error(`Error fetching ${collectionName}:`, err);
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    pb.collection(collectionName).subscribe<T>('*', function (e) {
      if (!isMounted) return;
      if (e.action === 'create') {
        setData((prev) => [e.record, ...prev].slice(0, perPage));
        setTotalItems((prev) => prev + 1);
      } else if (e.action === 'update') {
        setData((prev) => prev.map(item => item.id === e.record.id ? e.record : item));
      } else if (e.action === 'delete') {
        setData((prev) => prev.filter(item => item.id !== e.record.id));
        setTotalItems((prev) => Math.max(0, prev - 1));
      }
    });

    return () => {
      isMounted = false;
      pb.collection(collectionName).unsubscribe('*');
    };
  }, [collectionName, page, perPage, sort, filter]);

  return { data, loading, error, totalItems };
}
