import { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase(`http://${window.location.hostname}:8090`);

export function useCollection<T = any>(collectionName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const fetchData = async () => {
      try {
        setLoading(true);
        const records = await pb.collection(collectionName).getFullList<T>({
          sort: '-created',
        });
        setData(records);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setLoading(false);
      }
    };

    const subscribeToRealtime = async () => {
      try {
        const authStore = pb.authStore;
        pb.collection(collectionName).subscribe<T>('*', function (e) {
          if (e.action === 'create') {
            setData((prev) => [e.record, ...prev]);
          } else if (e.action === 'update') {
            setData((prev) =>
              prev.map((item: any) => (item.id === e.record.id ? e.record : item))
            );
          } else if (e.action === 'delete') {
            setData((prev) => prev.filter((item: any) => item.id !== e.record.id));
          }
        });

        unsubscribe = () => {
          pb.collection(collectionName).unsubscribe('*');
        };
      } catch (err) {
        console.error('Failed to subscribe to realtime updates', err);
      }
    };

    fetchData();
    subscribeToRealtime();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [collectionName]);

  return { data, loading, error };
}
