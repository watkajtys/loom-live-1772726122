import { useUrlState } from './useUrlState';
import { useContentPipeline } from './useContentPipeline';
import { pb } from '../lib/pocketbase';

export const useContentPipelineView = () => {
  const { searchParams, setSearchParams } = useUrlState();
  const search = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || '';
  const agentFilter = searchParams.get('agent') || '';
  const viewMode = searchParams.get('view') || 'standard';
  
  let filterString = '';
  const filters: string[] = [];

  if (search) {
    filters.push(pb.filter('(title ~ {:search} || markdown_body ~ {:search})', { search }));
  }

  if (statusFilter === 'live') {
    filters.push(pb.filter('status="published"'));
  } else if (statusFilter === 'progress') {
    filters.push(pb.filter('(status="drafting" || status="review")'));
  } else if (statusFilter === 'draft') {
    filters.push(pb.filter('status="draft"'));
  }

  if (filters.length > 0) {
    filterString = filters.join(' && ');
  }

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

  const { data, loading, error } = useContentPipeline({
    sort: '-created',
    filter: filterString || undefined,
    subscribe: true,
  });

  const draftingData = data.filter((item) => item.status === 'drafting');
  const reviewData = data.filter((item) => item.status === 'review');
  const liveData = data.filter((item) => item.status === 'published');

  return {
    search,
    statusFilter,
    agentFilter,
    viewMode,
    collapsedStages,
    toggleCollapse,
    data,
    draftingData,
    reviewData,
    liveData,
    loading,
    error,
  };
};
