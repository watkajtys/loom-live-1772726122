import React, { lazy, Suspense } from 'react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { DiscordIcon, GitHubIcon, XIcon } from './icons/BrandIcons';

const brandIconMap = {
  discord: DiscordIcon,
  github: GitHubIcon,
  x: XIcon,
  twitter: XIcon,
} as const;

// Provide an explicit mapping to prevent brittle string manipulation.
// Maps our Semantic or legacy names directly to exact keys in dynamicIconImports.
const semanticIconMap: Record<string, keyof typeof dynamicIconImports> = {
  // Navigation / Shell
  'home': 'house',
  'settings': 'settings',
  'terminal': 'terminal',
  'line-chart': 'chart-line',
  
  // Content Pipeline / Queue
  'file-edit': 'file-pen',
  'file-text': 'file-text',
  'message-square': 'message-square',
  'radio': 'radio',
  'layout-grid': 'layout-grid',
  'trending-up': 'trending-up',
  'bell': 'bell',
  'code': 'code',
  'share': 'share',
  'check-square': 'square-check',
  'alert-circle': 'circle-alert',
  
  // Knowledge Base / Reports
  'database': 'database',
  'refresh-cw': 'refresh-cw',
  'search': 'search',
  'filter': 'filter',
  'arrow-up': 'arrow-up',
  'arrow-down': 'arrow-down',
  'clock': 'clock',
  'check-circle': 'circle-check',
  'x-circle': 'circle-x',
  'more-vertical': 'more-vertical',
  'more-horizontal': 'more-horizontal',
  'plus': 'plus',
  'minus': 'minus',
  'trash-2': 'trash-2',
  'edit-2': 'pen',
  'edit-3': 'pen-line',
  'circle-dashed': 'circle-dashed',
};

const iconCache = new Map<string, React.LazyExoticComponent<React.ComponentType<any>>>();

export type SemanticIconName = keyof typeof brandIconMap | keyof typeof semanticIconMap | keyof typeof dynamicIconImports;
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

  // Resolve Lucide name either through our strict semantic map, or check if it matches exactly
  const lucideName = semanticIconMap[normalizedName] || normalizedName;

  // Render Lucide dynamically
  if (lucideName in dynamicIconImports) {
    // Cache lazy imports to prevent visual pop-in / remounting on every render
    if (!iconCache.has(lucideName)) {
      iconCache.set(lucideName, lazy(dynamicIconImports[lucideName as keyof typeof dynamicIconImports]));
    }
    const LucideIcon = iconCache.get(lucideName)!;
    
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
