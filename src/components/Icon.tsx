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
const iconMap: Record<string, React.ReactNode> = {
  discord: <DiscordIcon />,
  github: <GitHubIcon />,
  x: <XIcon />,
  twitter: <XIcon />,
  home: <Home size="1em" />,
  smart_toy: <Bot size="1em" />,
  bot: <Bot size="1em" />,
  article: <FileText size="1em" />,
  filetext: <FileText size="1em" />,
  analytics: <LineChart size="1em" />,
  linechart: <LineChart size="1em" />,
  settings_input_component: <Database size="1em" />,
  database: <Database size="1em" />,
  terminal: <Terminal size="1em" />,
  schedule: <Clock size="1em" />,
  clock: <Clock size="1em" />,
  notifications: <Bell size="1em" />,
  bell: <Bell size="1em" />,
  hub: <Network size="1em" />,
  code: <Code size="1em" />,
  alternate_email: <AtSign size="1em" />,
  error: <AlertCircle size="1em" />,
  alertcircle: <AlertCircle size="1em" />,
  settings: <Settings size="1em" />,
  search: <Search size="1em" />,
  sort: <ListFilter size="1em" />,
  apps: <LayoutGrid size="1em" />,
  refresh: <RefreshCw size="1em" />,
  refreshcw: <RefreshCw size="1em" />,
  forum: <MessageSquare size="1em" />
};

export const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  const normalizedName = name.toLowerCase();
  const renderedIcon = iconMap[normalizedName];

  if (!renderedIcon) {
    console.warn(`Icon '${name}' not found.`);
    return null;
  }

  // Brand icons have their own wrappers, others need the inline-flex wrapper
  if (['discord', 'github', 'x', 'twitter'].includes(normalizedName)) {
    return <span className={className}>{renderedIcon}</span>;
  }

  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      {renderedIcon}
    </span>
  );
};
