import React from 'react';
import { SocialMention } from '../types/models';
import { Icon } from './Icon';

interface QueueItemProps {
  mention: SocialMention;
}

const getPlatformIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p === 'discord') return 'hub';
  if (p === 'github') return 'code';
  if (p === 'x' || p === 'twitter') return 'alternate_email';
  return 'forum';
};

const getStatusColor = (status: string) => {
  if (status === 'approved') return 'text-terminal-green';
  if (status === 'pending') return 'text-primary';
  if (status === 'rejected') return 'text-red-500';
  return 'text-yellow-500';
};

export const QueueItem: React.FC<QueueItemProps> = ({ mention }) => {
  const iconName = getPlatformIcon(mention.platform);
  const statusColor = getStatusColor(mention.status);
  
  // Generating a fake priority based on ID or string length just to populate the design's progress bar visually
  const priority = mention.id ? (mention.id.charCodeAt(0) % 100) : 50;

  return (
    <div className="queue-row group">
      <div className="flex items-center gap-4 min-w-[100px]">
        <div className="relative">
          <div className="size-10 rounded-sm bg-slate-800/50 flex items-center justify-center border border-slate-700 group-hover:border-accent/40 transition-colors">
            <Icon name={iconName} className="text-slate-400 group-hover:text-accent" />
          </div>
          <div className={`absolute -top-1 -right-1 status-pulse ${mention.status === 'approved' ? 'opacity-100' : 'opacity-50'}`}></div>
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 font-mono text-[11px] mb-1">
          <span className="text-accent">ID: {mention.id ? mention.id.slice(0, 6) : '0x000'}</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 uppercase">USER: @user</span>
          <span className="text-slate-600">|</span>
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
        <div className="text-right">
          <p className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">Priority</p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-accent">{priority}</span>
            <div className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-accent" style={{ width: `${priority}%` }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 ml-4">
        {mention.status === 'pending' && (
          <button className="micro-btn text-terminal-green/80 hover:text-terminal-green">Approve</button>
        )}
        <button className="micro-btn">Edit</button>
      </div>
    </div>
  );
};
