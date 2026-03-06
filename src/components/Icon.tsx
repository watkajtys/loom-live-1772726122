import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type IconProps = {
  name: keyof typeof LucideIcons;
  className?: string;
};

export const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  const LucideComponent = LucideIcons[name] as LucideIcon;

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
