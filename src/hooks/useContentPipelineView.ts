import { useContentFilters } from './useContentFilters';
import { useUrlState } from './useUrlState';
import { useContentPipeline } from './useContentPipeline';
import { mapStagePositionToStatus, updateContentPipeline } from '../lib/api/content';
import { pb } from '../lib/pocketbase';

export const useContentPipelineView = () => {
  const { searchParams, setSearchParams } = useUrlState();
  const {
    platformFilter,
    agentFilter,
    statusFilter,
    searchQuery: search,
    viewMode,
  } = useContentFilters();
  
  let filterString = '';
  const filters: string[] = [];

  if (search) {
    filters.push(pb.filter('(title ~ {:search} || markdown_body ~ {:search})', { search }));
  }

  const normalizedStatus = statusFilter.toLowerCase();
  if (normalizedStatus === 'live') {
    filters.push(pb.filter('status="published"'));
  } else if (normalizedStatus === 'progress') {
    filters.push(pb.filter('(status="drafting" || status="review")'));
  } else if (normalizedStatus === 'draft') {
    filters.push(pb.filter('status="draft"'));
  }

  if (platformFilter !== 'all' && platformFilter) {
    // The underlying ContentPipeline might not have a platform filter out of the box, 
    // but typically we'd use 'platformIcon' or similar if they relate. 
    // Omitted to prevent invalid schema requests if 'platform' doesn't exist, as per previous state.
  }

  if (agentFilter && agentFilter.toLowerCase() !== 'all') {
    filters.push(pb.filter('agentId={:agent}', { agent: agentFilter }));
  }

  if (filters.length > 0) {
    filterString = filters.join(' && ');
  }

  const activeStageId = searchParams.get('stage') || '';

  const setActiveStageId = (stage: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (stage) {
      newParams.set('stage', stage);
    } else {
      newParams.delete('stage');
    }
    setSearchParams(newParams);
  };

  const collapsedStages = searchParams.get('collapsed')?.split(',') || [];

  const toggleCollapse = (stage: string) => {
    const newParams = new URLSearchParams(searchParams);
    let currentCollapsed = newParams.get('collapsed')?.split(',') || [];
    if (currentCollapsed.includes(stage)) {
      currentCollapsed = currentCollapsed.filter((s) => s !== stage);
    } else {
      currentCollapsed.push(stage);
    }
    
    if (currentCollapsed.length > 0) {
      newParams.set('collapsed', currentCollapsed.join(','));
    } else {
      newParams.delete('collapsed');
    }
    setSearchParams(newParams);
  };

  const { data, loading, error, mutate } = useContentPipeline({
    sort: '-created',
    filter: filterString || undefined,
    subscribe: true,
  });

  const updateContentStatus = async (cardId: string, newStagePosition: number) => {
    const newStatus = mapStagePositionToStatus(newStagePosition);
    
    // Optimistic UI update
    const previousData = [...data];
    mutate(
      data.map((item) => 
        item.id === cardId ? { ...item, status: newStatus } : item
      ),
      false
    );

    try {
      await updateContentPipeline(cardId, { status: newStatus });
      // Revalidate to ensure server state matches
      mutate();
    } catch (err) {
      console.error("Failed to update status", err);
      // Revert optimistic update
      mutate(previousData, false);
    }
  };

  return {
    search,
    statusFilter,
    agentFilter,
    viewMode,
    activeStageId,
    setActiveStageId,
    collapsedStages,
    toggleCollapse,
    data,
    loading,
    error,
    updateContentStatus,
  };
};
