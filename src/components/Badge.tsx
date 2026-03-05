import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
  className?: string;
}

export function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  const variants = {
    primary: 'bg-primary/10 border-primary/20 text-primary-300',
    success: 'bg-green-500/10 border-green-500/20 text-green-400',
    warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
    error: 'bg-red-500/10 border-red-500/20 text-red-400',
    neutral: 'bg-accent/10 border-accent/20 text-accent',
  };

  return (
    <span className={`px-2 py-1 text-[10px] border rounded font-mono uppercase ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
