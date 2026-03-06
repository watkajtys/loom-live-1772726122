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
  Search,
  ListFilter,
  LayoutGrid,
  type LucideIcon
} from 'lucide-react';
import { DiscordIcon, GitHubIcon, XIcon } from './icons/BrandIcons';

const IconMap = {
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
  Search,
  ListFilter,
  LayoutGrid,
} as const;

// Allow using semantic names (like Google Material names or logical roles) mapping to Lucide
const SemanticMap = {
  'home': 'Home',
  'smart_toy': 'Bot',
  'article': 'FileText',
  'analytics': 'LineChart',
  'settings_input_component': 'Database',
  'terminal': 'Terminal',
  'schedule': 'Clock',
  'notifications': 'Bell',
  'hub': 'Network',
  'code': 'Code',
  'alternate_email': 'AtSign',
  'error': 'AlertCircle',
  'database': 'Database',
  'settings': 'Settings',
  'search': 'Search',
  'sort': 'ListFilter',
  'apps': 'LayoutGrid',
  'refresh': 'RefreshCw'
} as const satisfies Record<string, keyof typeof IconMap>;

export type IconName = keyof typeof IconMap | keyof typeof SemanticMap | 'discord' | 'github' | 'x' | 'twitter';

type IconProps = {
  name: IconName;
  className?: string;
};

export const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  if (name === 'discord') return <DiscordIcon className={className} />;
  if (name === 'github') return <GitHubIcon className={className} />;
  if (name === 'x' || name === 'twitter') return <XIcon className={className} />;

  const semanticName = name as keyof typeof SemanticMap;
  const lucideName = (SemanticMap[semanticName] || name) as keyof typeof IconMap;
  const LucideComponent = IconMap[lucideName] as LucideIcon | undefined;

  if (!LucideComponent) {
    console.warn(`Icon '${name}' not found.`);
    return null;
  }

  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <LucideComponent size="1em" />
    </span>
  );
};
