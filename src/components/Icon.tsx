import React from 'react';
import AlertCircle from 'lucide-react/dist/esm/icons/alert-circle';
import AtSign from 'lucide-react/dist/esm/icons/at-sign';
import Bell from 'lucide-react/dist/esm/icons/bell';
import Bot from 'lucide-react/dist/esm/icons/bot';
import CheckSquare from 'lucide-react/dist/esm/icons/check-square';
import ChevronsLeft from 'lucide-react/dist/esm/icons/chevrons-left';
import ChevronsRight from 'lucide-react/dist/esm/icons/chevrons-right';
import Clock from 'lucide-react/dist/esm/icons/clock';
import Code from 'lucide-react/dist/esm/icons/code';
import Database from 'lucide-react/dist/esm/icons/database';
import FileEdit from 'lucide-react/dist/esm/icons/file-edit';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import Home from 'lucide-react/dist/esm/icons/home';
import LayoutGrid from 'lucide-react/dist/esm/icons/layout-grid';
import LineChart from 'lucide-react/dist/esm/icons/line-chart';
import ListFilter from 'lucide-react/dist/esm/icons/list-filter';
import MessageSquare from 'lucide-react/dist/esm/icons/message-square';
import Network from 'lucide-react/dist/esm/icons/network';
import Radio from 'lucide-react/dist/esm/icons/radio';
import RefreshCw from 'lucide-react/dist/esm/icons/refresh-cw';
import Search from 'lucide-react/dist/esm/icons/search';
import Settings from 'lucide-react/dist/esm/icons/settings';
import Share2 from 'lucide-react/dist/esm/icons/share-2';
import Terminal from 'lucide-react/dist/esm/icons/terminal';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';

import { DiscordIcon, GitHubIcon, XIcon } from './icons/BrandIcons';

export const iconMap = {
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

export type SemanticIconName = keyof typeof iconMap;
export type IconName = SemanticIconName | string;

type IconProps = {
  name: IconName;
  className?: string;
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
