import React from 'react';

type IconProps = {
  name: string;
  className?: string;
};

export const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  return (
    <span className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
};
