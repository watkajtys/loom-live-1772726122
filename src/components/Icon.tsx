import React, { lazy, Suspense } from 'react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { DiscordIcon, GitHubIcon, XIcon } from './icons/BrandIcons';

const brandIconMap = {
  discord: DiscordIcon,
  github: GitHubIcon,
  x: XIcon,
  twitter: XIcon,
} as const;

const iconCache = new Map<string, React.LazyExoticComponent<React.ComponentType<any>>>();

export type SemanticIconName = keyof typeof brandIconMap | keyof typeof dynamicIconImports;
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

  // Use normalized name directly to map to Lucide icons, translating TitleCase to kebab-case just in case
  let lucideName = name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  
  // Fallback map for legacy titles
  const legacyMap: Record<string, string> = {
    'home': 'home',
    'line-chart': 'line-chart',
    'file-edit': 'file-edit',
    'alert-circle': 'alert-circle',
    'check-square': 'check-square',
    'file-text': 'file-text'
  };
  lucideName = legacyMap[lucideName] || lucideName;

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
