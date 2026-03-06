import { useSearchParams } from 'react-router-dom';
import { useContentPipeline } from './useContentPipeline';
import { ContentPipeline } from '../types/models';
import { SemanticIconName } from '../components/Icon';

export interface TransformedContentPipeline extends ContentPipeline {
  agentId: string;
  platformIcon: SemanticIconName;
}

export const useContentPipelineView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || '';
  const agentFilter = searchParams.get('agent') || '';
  const viewMode = searchParams.get('view') || 'standard';
  
  const filterString = [
    search ? `title ~ "${search}" || markdown_body ~ "${search}"` : '',
    statusFilter === 'live' ? 'status="published"' : statusFilter === 'progress' ? 'status="drafting" || status="review"' : statusFilter === 'draft' ? 'status="draft"' : '',
  ].filter(Boolean).join(' && ');

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

  const icons: SemanticIconName[] = ['terminal', 'alternate_email', 'forum', 'article'];

  const transformedData: TransformedContentPipeline[] = data.map(item => {
    // Transformer logic for Agent assignment
    const agentId = (item.id.charCodeAt(0) % 2 === 0) ? 'NEXUS_01' : 'ECHO_04';
    
    // Transformer logic for platform icon
    const iconIndex = item.id ? item.id.charCodeAt(0) % icons.length : 3;
    const platformIcon = icons[iconIndex];

    return {
      ...item,
      agentId,
      platformIcon
    };
  });

  const draftingData = transformedData.filter((item) => item.status === 'drafting');
  const reviewData = transformedData.filter((item) => item.status === 'review');
  const liveData = transformedData.filter((item) => item.status === 'published');

  return {
    search,
    statusFilter,
    agentFilter,
    viewMode,
    collapsedStages,
    toggleCollapse,
    data: transformedData,
    draftingData,
    reviewData,
    liveData,
    loading,
    error,
  };
};
