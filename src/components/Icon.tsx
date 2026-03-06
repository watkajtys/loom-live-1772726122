import React from 'react';
import {
  AlertCircle,
  AtSign,
  Bell,
  Bot,
  Clock,
  Code,
  Database,
  FileText,
  Home,
  LineChart,
  MessageSquare,
  Network,
  RefreshCw,
  Settings,
  Terminal,
  type LucideIcon
} from 'lucide-react';

export const IconMap = {
  AlertCircle,
  AtSign,
  Bell,
  Bot,
  Clock,
  Code,
  Database,
  FileText,
  Home,
  LineChart,
  MessageSquare,
  Network,
  RefreshCw,
  Settings,
  Terminal,
} as const;

export type IconName = keyof typeof IconMap;

type IconProps = {
  name: IconName;
  className?: string;
};

export const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  const LucideComponent = IconMap[name] as LucideIcon;

  if (!LucideComponent) {
    console.warn(`Icon ${name} not found`);
    return null;
  }

  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <LucideComponent size="1em" />
    </span>
  );
};
