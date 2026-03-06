import React from 'react';
import {
  AlertCircle,
  AtSign,
  Bell,
  Bot,
  CheckSquare,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Code,
  Database,
  FileEdit,
  FileText,
  Home,
  LayoutGrid,
  LineChart,
  ListFilter,
  MessageSquare,
  Network,
  Radio,
  RefreshCw,
  Search,
  Settings,
  Share2,
  Terminal,
  TrendingUp
} from 'lucide-react';
import { DiscordIcon, GitHubIcon, XIcon } from './icons/BrandIcons';

export type SemanticIconName = 
  | 'alertcircle'
  | 'alternate_email'
  | 'analytics'
  | 'apps'
  | 'article'
  | 'bell'
  | 'bot'
  | 'checklist'
  | 'clock'
  | 'code'
  | 'database'
  | 'discord'
  | 'edit_note'
  | 'error'
  | 'filetext'
  | 'forum'
  | 'github'
  | 'grid_view'
  | 'home'
  | 'hub'
  | 'keyboard_double_arrow_left'
  | 'keyboard_double_arrow_right'
  | 'linechart'
  | 'notifications'
  | 'priority_high'
  | 'refresh'
  | 'refreshcw'
  | 'schedule'
  | 'search'
  | 'sensors'
  | 'settings'
  | 'settings_input_component'
  | 'share'
  | 'show_chart'
  | 'smart_toy'
  | 'sort'
  | 'terminal'
  | 'twitter'
  | 'x';

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
  forum: MessageSquare,
  edit_note: FileEdit,
  keyboard_double_arrow_left: ChevronsLeft,
  keyboard_double_arrow_right: ChevronsRight,
  share: Share2,
  priority_high: AlertCircle,
  checklist: CheckSquare,
  sensors: Radio,
  grid_view: LayoutGrid,
  show_chart: TrendingUp,
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
