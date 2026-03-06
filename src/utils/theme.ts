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
