import React from 'react';
import { iconMap, SemanticIconName, IconName } from '../config/icons';

export type { SemanticIconName, IconName };

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
