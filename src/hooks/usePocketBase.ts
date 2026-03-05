import { useState, useEffect } from 'react';
import { pb } from '../lib/pb';
import { BaseModel } from '../types';

export function usePocketBase<T extends BaseModel>(collectionName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const records = await pb.collection(collectionName).getFullList<T>();
        if (isMounted) {
          setData(records);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err);
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
        setData((prev) => [...prev, e.record]);
      } else if (e.action === 'update') {
        setData((prev) => prev.map(item => item.id === e.record.id ? e.record : item));
      } else if (e.action === 'delete') {
        setData((prev) => prev.filter(item => item.id !== e.record.id));
      }
    });

    return () => {
      isMounted = false;
      pb.collection(collectionName).unsubscribe('*');
    };
  }, [collectionName]);

  return { data, loading, error };
}
