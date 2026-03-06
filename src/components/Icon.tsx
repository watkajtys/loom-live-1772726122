import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type IconProps = {
  name: string;
  className?: string;
};

const mapIconName = (name: string): LucideIcon | null => {
  const map: Record<string, keyof typeof LucideIcons> = {
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
    'settings': 'Settings'
  };

  const iconName = map[name];
  if (!iconName) return null;
  return LucideIcons[iconName] as LucideIcon;
};

export const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  const LucideComponent = mapIconName(name);

  if (!LucideComponent) {
    console.warn(`Icon ${name} not found`);
    return null;
  }

  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <LucideComponent size="1em" />
    </span>
  );
};
