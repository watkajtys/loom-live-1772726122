import { useState, useEffect } from 'react';
import PocketBase, { RecordModel } from 'pocketbase';

const pb = new PocketBase(`http://${window.location.hostname}:8090`);

export function usePocketBase<T extends RecordModel>(collectionName: string, queryParams: any = {}) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Using getList to support pagination/limits as required
        const result = await pb.collection(collectionName).getList<T>(1, 50, {
          sort: '-created',
          ...queryParams,
        });

        if (isMounted) {
          setData(result.items);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    // Setup realtime subscription
    pb.collection(collectionName).subscribe<T>('*', (e) => {
      if (!isMounted) return;

      if (e.action === 'create') {
        setData((prev) => [e.record, ...prev]);
      } else if (e.action === 'update') {
        setData((prev) => prev.map((item) => (item.id === e.record.id ? e.record : item)));
      } else if (e.action === 'delete') {
        setData((prev) => prev.filter((item) => item.id !== e.record.id));
      }
    });

    return () => {
      isMounted = false;
      pb.collection(collectionName).unsubscribe('*');
    };
  }, [collectionName, JSON.stringify(queryParams)]);

  return { data, isLoading, error };
}
