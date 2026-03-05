import React from 'react';

interface DataViewLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function DataViewLayout({ title, children }: DataViewLayoutProps) {
  return (
    <div className="flex-1 p-6 overflow-hidden flex flex-col gap-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold font-mono text-accent uppercase">{title}</h2>
      </div>
      <div className="flex-1 overflow-auto glass-panel rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}