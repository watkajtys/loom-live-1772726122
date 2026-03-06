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

export const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  let renderedIcon = null;

  switch (name) {
    case 'discord':
      renderedIcon = <DiscordIcon className={className} />;
      break;
    case 'github':
      renderedIcon = <GitHubIcon className={className} />;
      break;
    case 'x':
    case 'twitter':
      renderedIcon = <XIcon className={className} />;
      break;
    case 'home':
    case 'Home':
      renderedIcon = <Home size="1em" />;
      break;
    case 'smart_toy':
    case 'Bot':
      renderedIcon = <Bot size="1em" />;
      break;
    case 'article':
    case 'FileText':
      renderedIcon = <FileText size="1em" />;
      break;
    case 'analytics':
    case 'LineChart':
      renderedIcon = <LineChart size="1em" />;
      break;
    case 'settings_input_component':
    case 'database':
    case 'Database':
      renderedIcon = <Database size="1em" />;
      break;
    case 'terminal':
    case 'Terminal':
      renderedIcon = <Terminal size="1em" />;
      break;
    case 'schedule':
    case 'Clock':
      renderedIcon = <Clock size="1em" />;
      break;
    case 'notifications':
    case 'Bell':
      renderedIcon = <Bell size="1em" />;
      break;
    case 'hub':
      renderedIcon = <Network size="1em" />;
      break;
    case 'code':
      renderedIcon = <Code size="1em" />;
      break;
    case 'alternate_email':
      renderedIcon = <AtSign size="1em" />;
      break;
    case 'error':
    case 'AlertCircle':
      renderedIcon = <AlertCircle size="1em" />;
      break;
    case 'settings':
      renderedIcon = <Settings size="1em" />;
      break;
    case 'search':
      renderedIcon = <Search size="1em" />;
      break;
    case 'sort':
      renderedIcon = <ListFilter size="1em" />;
      break;
    case 'apps':
      renderedIcon = <LayoutGrid size="1em" />;
      break;
    case 'refresh':
    case 'RefreshCw':
      renderedIcon = <RefreshCw size="1em" />;
      break;
    case 'forum':
      renderedIcon = <MessageSquare size="1em" />;
      break;
    default:
      console.warn(`Icon '${name}' not found.`);
      return null;
  }

  // Brand icons have their own wrappers, others need the inline-flex wrapper
  if (['discord', 'github', 'x', 'twitter'].includes(name)) {
    return renderedIcon;
  }

  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      {renderedIcon}
    </span>
  );
};
