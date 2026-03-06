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
  | 'discord'
  | 'github'
  | 'x'
  | 'twitter'
  | 'home'
  | 'smart_toy'
  | 'bot'
  | 'article'
  | 'filetext'
  | 'analytics'
  | 'linechart'
  | 'settings_input_component'
  | 'database'
  | 'terminal'
  | 'schedule'
  | 'clock'
  | 'notifications'
  | 'bell'
  | 'hub'
  | 'code'
  | 'alternate_email'
  | 'error'
  | 'alertcircle'
  | 'settings'
  | 'search'
  | 'sort'
  | 'apps'
  | 'refresh'
  | 'refreshcw'
  | 'forum';

// We map components that might be passed in differently (e.g., 'Bot' or 'smart_toy')
// directly by normalizing the input type.
export type IconName = SemanticIconName | string;

type IconProps = {
  name: IconName;
  className?: string;
};

// Strongly-typed mapping object
const iconMap: Record<SemanticIconName, React.ElementType> = {
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
  const normalizedName = name.toLowerCase() as SemanticIconName;
  const IconComponent = iconMap[normalizedName];

  if (!IconComponent) {
    console.warn(`Icon '${name}' not found.`);
    return null;
  }

  const isBrandIcon = ['discord', 'github', 'x', 'twitter'].includes(normalizedName);

  if (isBrandIcon) {
    return <span className={className}><IconComponent /></span>;
  }

  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <IconComponent size="1em" />
    </span>
  );
};
