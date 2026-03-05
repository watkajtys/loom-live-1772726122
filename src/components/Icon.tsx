import React from 'react';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  className?: string;
}

export function Icon({ name, className = '', ...props }: IconProps) {
  return (
    <span className={`material-symbols-outlined ${className}`} {...props}>
      {name}
    </span>
  );
}
