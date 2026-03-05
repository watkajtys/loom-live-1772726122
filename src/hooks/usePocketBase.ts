import { useState, useEffect, useCallback } from 'react';
import PocketBase, { RecordModel } from 'pocketbase';

const pb = new PocketBase(`http://${window.location.hostname}:8090`);

interface UsePocketBaseListOptions {
    page?: number;
    perPage?: number;
    sort?: string;
    filter?: string;
    expand?: string;
    fields?: string;
    requestKey?: string | null;
}

interface UsePocketBaseListResult<T> {
    data: T[];
    totalItems: number;
    totalPages: number;
    isLoading: boolean;
    error: Error | null;
    fetchData: () => Promise<void>;
}

export function usePocketBaseList<T extends RecordModel>(
    collectionName: string,
    options: UsePocketBaseListOptions = {}
): UsePocketBaseListResult<T> {
    const [data, setData] = useState<T[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await pb.collection(collectionName).getList<T>(
                options.page || 1,
                options.perPage || 50,
                {
                    sort: options.sort,
                    filter: options.filter,
                    expand: options.expand,
                    fields: options.fields,
                    requestKey: options.requestKey,
                }
            );
            setData(result.items);
            setTotalItems(result.totalItems);
            setTotalPages(result.totalPages);
        } catch (err: any) {
            // Filter out auto-cancellation errors if requestKey is provided
            if (err.isAbort) {
                 return;
            }
            setError(err instanceof Error ? err : new Error(err?.message || 'Failed to fetch data'));
        } finally {
            setIsLoading(false);
        }
    }, [collectionName, JSON.stringify(options)]);

    useEffect(() => {
        fetchData();
        
        // Subscribe to real-time updates
        const setupSubscription = async () => {
             try {
                 await pb.collection(collectionName).subscribe<T>('*', (e) => {
                     // For simplicity, just refetch on any change to keep sorting/filtering accurate
                     fetchData();
                 });
             } catch (err) {
                 console.error("Failed to subscribe to PocketBase:", err);
             }
        };
        
        setupSubscription();

        return () => {
            pb.collection(collectionName).unsubscribe('*');
        };
    }, [fetchData, collectionName]);

    return { data, totalItems, totalPages, isLoading, error, fetchData };
}

export const usePocketBase = () => {
    return pb;
};
