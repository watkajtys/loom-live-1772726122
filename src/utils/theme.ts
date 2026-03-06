export const getQueueItemStatusColor = (status: string): string => {
  if (status === 'drafting') return 'text-terminal-green';
  if (status === 'pending_approval') return 'text-primary';
  if (status === 'queued') return 'text-yellow-500';
  if (status === 'approved') return 'text-terminal-green';
  if (status === 'rejected') return 'text-red-500';
  return 'text-slate-400';
};

export const getSystemStatusColor = (status: string): { text: string; bg: string } => {
  switch (status) {
    case 'nominal': return { text: 'text-green-500', bg: 'bg-green-500' };
    case 'degraded': return { text: 'text-yellow-500', bg: 'bg-yellow-500' };
    case 'offline': return { text: 'text-red-500', bg: 'bg-red-500' };
    default: return { text: 'text-green-500', bg: 'bg-green-500' };
  }
};

export type PipelineStatusState = 
  | { status: 'published'; tagClass: 'status-live'; label: 'Live'; borderClass: 'border-l-terminal-green' }
  | { status: 'drafting'; tagClass: 'status-progress'; label: 'In Progress'; borderClass: 'border-l-accent' }
  | { status: 'review'; tagClass: 'status-progress'; label: 'Review'; borderClass: 'border-l-accent' }
  | { status: string; tagClass: 'status-draft'; label: string; borderClass: 'border-l-slate-800' }; // fallback

export const getPipelineStatusDisplay = (status: string): PipelineStatusState => {
  switch (status) {
    case 'published':
      return { status: 'published', tagClass: 'status-live', label: 'Live', borderClass: 'border-l-terminal-green' };
    case 'drafting':
      return { status: 'drafting', tagClass: 'status-progress', label: 'In Progress', borderClass: 'border-l-accent' };
    case 'review':
      return { status: 'review', tagClass: 'status-progress', label: 'Review', borderClass: 'border-l-accent' };
    default:
      return { status, tagClass: 'status-draft', label: status, borderClass: 'border-l-slate-800' };
  }
};

export type CompactPipelineStatusState = 
  | { status: 'published'; borderClass: 'border-l-terminal-green'; textColor: 'text-terminal-green'; showSparkline: true; showProgress: false; label: 'LIVE' }
  | { status: 'drafting'; borderClass: 'border-l-accent'; textColor: 'text-accent'; showSparkline: false; showProgress: true; label: 'PROGRESS' }
  | { status: 'review'; borderClass: 'border-l-accent'; textColor: 'text-accent'; showSparkline: false; showProgress: true; label: 'PROGRESS' }
  | { status: string; borderClass: 'border-l-slate-700'; textColor: 'text-slate-500'; showSparkline: false; showProgress: false; label: 'DRAFT' }; // fallback

export const getCompactPipelineStatusDisplay = (status: string): CompactPipelineStatusState => {
  switch (status) {
    case 'published':
      return { status: 'published', borderClass: 'border-l-terminal-green', textColor: 'text-terminal-green', showSparkline: true, showProgress: false, label: 'LIVE' };
    case 'drafting':
      return { status: 'drafting', borderClass: 'border-l-accent', textColor: 'text-accent', showSparkline: false, showProgress: true, label: 'PROGRESS' };
    case 'review':
      return { status: 'review', borderClass: 'border-l-accent', textColor: 'text-accent', showSparkline: false, showProgress: true, label: 'PROGRESS' };
    default:
      return { status, borderClass: 'border-l-slate-700', textColor: 'text-slate-500', showSparkline: false, showProgress: false, label: 'DRAFT' };
  }
};
