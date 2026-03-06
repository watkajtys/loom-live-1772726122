import { useSWRConfig } from 'swr';
import { pb } from '../lib/pocketbase';
import { COLLECTIONS } from '../constants/collections';
import { SocialMention } from '../types/models';

export function useQueueMutations() {
  const { mutate } = useSWRConfig();

  // Matcher function to identify all queue data SWR keys
  const matchQueueKeys = (key: any) => Array.isArray(key) && key[0] === COLLECTIONS.SOCIAL_MENTIONS;

  const updateStatus = async (id: string, status: SocialMention['status']) => {
    const updateFn = (currentData: SocialMention[] | undefined) => {
      if (!currentData) return currentData;
      return currentData.map((item) => (item.id === id ? { ...item, status } : item));
    };

    // Optimistically update the UI
    mutate(matchQueueKeys, updateFn, {
      optimisticData: updateFn,
      rollbackOnError: true,
      revalidate: false,
    });

    try {
      const updatedRecord = await pb.collection(COLLECTIONS.SOCIAL_MENTIONS).update<SocialMention>(id, { status });
      
      // Update with exact server record after mutation
      mutate(matchQueueKeys, (currentData: SocialMention[] | undefined) => {
        if (!currentData) return currentData;
        return currentData.map((item) => (item.id === id ? updatedRecord : item));
      }, { revalidate: false });

      return updatedRecord;
    } catch (error) {
      mutate(matchQueueKeys); // Force revalidation on error to rollback
      throw error;
    }
  };

  const updateItem = async (id: string, data: Partial<SocialMention>) => {
    const updateFn = (currentData: SocialMention[] | undefined) => {
      if (!currentData) return currentData;
      return currentData.map((item) => (item.id === id ? { ...item, ...data } : item));
    };

    mutate(matchQueueKeys, updateFn, {
      optimisticData: updateFn,
      rollbackOnError: true,
      revalidate: false,
    });

    try {
      const updatedRecord = await pb.collection(COLLECTIONS.SOCIAL_MENTIONS).update<SocialMention>(id, data);
      
      mutate(matchQueueKeys, (currentData: SocialMention[] | undefined) => {
        if (!currentData) return currentData;
        return currentData.map((item) => (item.id === id ? updatedRecord : item));
      }, { revalidate: false });

      return updatedRecord;
    } catch (error) {
      mutate(matchQueueKeys);
      throw error;
    }
  };

  const deleteItem = async (id: string) => {
    const deleteFn = (currentData: SocialMention[] | undefined) => {
      if (!currentData) return currentData;
      return currentData.filter((item) => item.id !== id);
    };

    mutate(matchQueueKeys, deleteFn, {
      optimisticData: deleteFn,
      rollbackOnError: true,
      revalidate: false,
    });

    try {
      await pb.collection(COLLECTIONS.SOCIAL_MENTIONS).delete(id);
      
      mutate(matchQueueKeys, deleteFn, { revalidate: false });
      return true;
    } catch (error) {
      mutate(matchQueueKeys);
      throw error;
    }
  };

  return { updateStatus, updateItem, deleteItem };
}
