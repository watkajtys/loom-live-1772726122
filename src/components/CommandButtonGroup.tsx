import React from 'react';

export interface CommandButtonGroupProps {
  label: string;
  items: string[];
  activeValue: string;
  onSelect: (value: string) => void;
  isLastGroup?: boolean;
}

export const CommandButtonGroup: React.FC<CommandButtonGroupProps> = ({
  label,
  items,
  activeValue,
  onSelect,
  isLastGroup,
}) => (
  <div className={`filter-group ${isLastGroup ? 'border-r-0' : ''}`}>
    <span className="command-label">{label}</span>
    <div className="flex gap-1">
      {items.map(item => {
        const value = item.toLowerCase();
        const isActive = activeValue === value;
        return (
          <button
            key={item}
            onClick={() => onSelect(value)}
            className={`command-btn ${isActive ? 'active' : ''}`}
          >
            {item}
          </button>
        );
      })}
    </div>
  </div>
);
