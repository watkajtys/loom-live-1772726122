import React, { lazy, Suspense } from 'react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { DiscordIcon, GitHubIcon, XIcon } from './icons/BrandIcons';

const brandIconMap = {
  discord: DiscordIcon,
  github: GitHubIcon,
  x: XIcon,
  twitter: XIcon,
} as const;

// Semantic mapping for non-brand icons that don't directly match Lucide names
const semanticMap: Record<string, keyof typeof dynamicIconImports> = {
  smart_toy: 'bot',
  article: 'file-text',
  filetext: 'file-text',
  analytics: 'line-chart',
  linechart: 'line-chart',
  settings_input_component: 'database',
  schedule: 'clock',
  notifications: 'bell',
  hub: 'network',
  alternate_email: 'at-sign',
  error: 'alert-circle',
  alertcircle: 'alert-circle',
  sort: 'list-filter',
  apps: 'layout-grid',
  refresh: 'refresh-cw',
  refreshcw: 'refresh-cw',
  forum: 'message-square',
  edit_note: 'file-edit',
  keyboard_double_arrow_left: 'chevrons-left',
  keyboard_double_arrow_right: 'chevrons-right',
  share: 'share-2',
  priority_high: 'alert-circle',
  checklist: 'check-square',
  sensors: 'radio',
  grid_view: 'layout-grid',
  show_chart: 'trending-up',
};

export type SemanticIconName = keyof typeof brandIconMap | keyof typeof semanticMap | keyof typeof dynamicIconImports;
export type IconName = SemanticIconName | string;

type IconProps = {
  name: IconName;
  className?: string;
};

export const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  const normalizedName = name.toLowerCase();

  // Handle brand icons immediately (synchronous rendering)
  if (normalizedName in brandIconMap) {
    const BrandComponent = brandIconMap[normalizedName as keyof typeof brandIconMap];
    return <span className={className}><BrandComponent /></span>;
  }

  // Resolve semantic alias or use normalized name directly
  const lucideName = semanticMap[normalizedName] || normalizedName;

  // Render Lucide dynamically
  if (lucideName in dynamicIconImports) {
    const LucideIcon = lazy(dynamicIconImports[lucideName as keyof typeof dynamicIconImports]);
    
    return (
      <Suspense fallback={<span className={`inline-flex items-center justify-center ${className}`} style={{ width: '1em', height: '1em' }} />}>
        <span className={`inline-flex items-center justify-center ${className}`}>
          <LucideIcon size="1em" />
        </span>
      </Suspense>
    );
  }

  console.warn(`Icon '${name}' not found.`);
  return null;
};
