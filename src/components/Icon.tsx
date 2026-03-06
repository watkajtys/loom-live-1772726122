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
} from 'lucide-react';
import { DiscordIcon, GitHubIcon, XIcon } from './icons/BrandIcons';

export type SemanticIconName = 
  | 'home'
  | 'smart_toy'
  | 'article'
  | 'analytics'
  | 'settings_input_component'
  | 'terminal'
  | 'schedule'
  | 'notifications'
  | 'hub'
  | 'code'
  | 'alternate_email'
  | 'error'
  | 'database'
  | 'settings'
  | 'search'
  | 'sort'
  | 'apps'
  | 'refresh'
  | 'forum'
  // Support original components names and platform names for backward compatibility if needed, 
  // or restrict strictly. Based on usage in components like DataViewLayout ('Bot', 'Database', etc) 
  // and Sidebar routes ('Home', 'FileText', 'LineChart', 'Database')
  | 'Home'
  | 'Bot'
  | 'FileText'
  | 'LineChart'
  | 'Database'
  | 'Terminal'
  | 'Clock'
  | 'Bell'
  | 'AlertCircle'
  | 'RefreshCw'
  | 'discord'
  | 'github'
  | 'x'
  | 'twitter';

export type IconName = SemanticIconName;

type IconProps = {
  name: IconName;
  className?: string;
};

// Normalize names internally to avoid redundant casing map entries
const iconMap: Record<string, React.ElementType> = {
  discord: DiscordIcon,
  github: GitHubIcon,
  x: XIcon,
  twitter: XIcon,
  home: Home,
  smart_toy: Bot,
  bot: Bot,
  article: FileText,
  filetext: FileText,
  analytics: LineChart,
  linechart: LineChart,
  settings_input_component: Database,
  database: Database,
  terminal: Terminal,
  schedule: Clock,
  clock: Clock,
  notifications: Bell,
  bell: Bell,
  hub: Network,
  code: Code,
  alternate_email: AtSign,
  error: AlertCircle,
  alertcircle: AlertCircle,
  settings: Settings,
  search: Search,
  sort: ListFilter,
  apps: LayoutGrid,
  refresh: RefreshCw,
  refreshcw: RefreshCw,
  forum: MessageSquare
};

export const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  const normalizedName = name.toLowerCase();
  const IconComponent = iconMap[normalizedName];

  if (!IconComponent) {
    console.warn(`Icon '${name}' not found.`);
    return null;
  }

  // Brand icons have their own wrappers, others need the inline-flex wrapper and sizing
  if (['discord', 'github', 'x', 'twitter'].includes(normalizedName)) {
    return <span className={className}><IconComponent /></span>;
  }

  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <IconComponent size="1em" />
    </span>
  );
};
