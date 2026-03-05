import React from 'react';

type SidebarProps = {
  currentView: string;
  setCurrentView: (view: string) => void;
};

export function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const navItems = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'community_queue', icon: 'smart_toy', label: 'Community Queue' },
    { id: 'content_pipeline', icon: 'article', label: 'Content Pipeline' },
    { id: 'ax_reports', icon: 'analytics', label: 'AX Reports' },
    { id: 'knowledge_base', icon: 'settings_input_component', label: 'Knowledge Base' },
  ];

  return (
    <aside className="w-16 flex flex-col items-center py-6 border-r border-primary/20 bg-background-dark z-20">
      <div className="mb-10 text-accent">
        <span className="material-symbols-outlined text-3xl">terminal</span>
      </div>
      <nav className="flex flex-col gap-8 flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`group relative flex items-center justify-center p-2 rounded-lg transition-colors ${
              currentView === item.id
                ? 'bg-primary/20 text-accent'
                : 'text-slate-400 hover:text-accent'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="absolute left-14 hidden group-hover:block bg-background-dark border border-primary/20 px-2 py-1 text-xs rounded whitespace-nowrap z-50">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
      <div className="flex flex-col gap-6">
        <button className="text-slate-400 hover:text-accent transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="size-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-[10px] font-bold text-accent">
          AV
        </div>
      </div>
    </aside>
  );
}
