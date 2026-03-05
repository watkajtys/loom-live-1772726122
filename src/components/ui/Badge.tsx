import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'processing';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  animate?: boolean;
}

export function Badge({ children, variant = 'neutral', className = '', animate = false }: BadgeProps) {
  const baseStyle = "px-2 py-1 rounded text-[10px] uppercase font-mono tracking-wider w-fit border";
  
  const variants: Record<BadgeVariant, string> = {
    success: "bg-green-500/10 text-green-400 border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    error: "bg-red-500/10 text-red-400 border-red-500/20",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    processing: "bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse",
    neutral: "bg-slate-500/10 text-slate-400 border-slate-500/20"
  };

  const animationClass = animate ? 'animate-pulse' : '';

  return (
    <span className={`${baseStyle} ${variants[variant]} ${animationClass} ${className}`}>
      {children}
    </span>
  );
}

export function StatusBadge({ status, className = '' }: { status: string, className?: string }) {
  let variant: BadgeVariant = 'neutral';
  let animate = false;

  switch (status.toLowerCase()) {
    case 'approved':
    case 'published':
    case 'vectorized':
    case 'submitted':
      variant = 'success';
      break;
    case 'rejected':
    case 'failed':
      variant = 'error';
      break;
    case 'review':
    case 'pending':
      variant = 'warning';
      break;
    case 'drafting':
      variant = 'info';
      break;
    case 'processing':
      variant = 'processing';
      break;
    default:
      variant = 'neutral';
  }

  return <Badge variant={variant} className={className} animate={animate}>{status}</Badge>;
}
