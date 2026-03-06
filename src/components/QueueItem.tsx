import React from 'react';
import { SocialMention } from '../types/models';
import { Icon, type IconName } from './Icon';
import { getQueueItemStatusColor } from '../utils/theme';

interface QueueItemProps {
  mention: SocialMention;
}

const getPlatformIcon = (platform: string): IconName => {
  const p = platform.toLowerCase();
  if (p === 'discord') return 'discord';
  if (p === 'github') return 'github';
  if (p === 'x' || p === 'twitter') return 'x';
  return 'forum';
};

export const QueueItem: React.FC<QueueItemProps> = ({ mention }) => {
  const iconName = getPlatformIcon(mention.platform);
  const statusColor = getQueueItemStatusColor(mention.status);
  
  const isPulseActive = mention.status === 'drafting' || mention.status === 'queued';
  const isIdle = mention.status === 'approved' || mention.status === 'rejected';

  return (
    <div className={`queue-row group ${isIdle ? 'opacity-60' : ''}`}>
      <div className="flex items-center gap-4 min-w-[60px]">
        <div className="relative">
          <div className="size-10 rounded-sm bg-slate-900/80 flex items-center justify-center border border-slate-800 group-hover:border-accent/40 transition-colors">
            <Icon name={iconName} className="text-slate-400 group-hover:text-accent" />
          </div>
          <div className={`absolute -top-1 -right-1 status-pulse ${isPulseActive ? 'opacity-100' : 'opacity-50'}`}></div>
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 font-mono text-[11px] mb-1">
          <span className="text-accent">ID: {mention.id ? mention.id.slice(0, 5) : '0x000'}</span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-300">USER: {mention.user}</span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-500 uppercase">PLATFORM: {mention.platform}</span>
        </div>
        <p className="text-sm text-slate-400 font-mono line-clamp-1">
          {mention.query}
        </p>
      </div>
      
      <div className="flex items-center gap-10">
        <div className="text-right">
          <p className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">Agent_State</p>
          <p className={`text-xs font-mono uppercase ${statusColor}`}>{mention.status}</p>
        </div>
        <div className="text-right min-w-[80px]">
          <p className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">Priority</p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-accent">{mention.priority}</span>
            <div className="w-12 h-1 bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-accent shadow-[0_0_8px_theme(colors.accent/50%)]" style={{ width: `${mention.priority}%` }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 ml-4">
        <button className="micro-btn text-terminal-green/80 hover:text-terminal-green">Approve</button>
        <button className="micro-btn">Edit</button>
      </div>
    </div>
  );
};
