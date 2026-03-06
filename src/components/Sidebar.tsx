import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from './Icon';
import { useExecution } from '../providers/ExecutionProvider';

export const Sidebar: React.FC = () => {
  const { routes } = useExecution();
  const sidebarRoutes = routes.filter(route => route.showInSidebar);

  return (
    <aside className="w-16 flex flex-col items-center py-6 border-r border-primary/20 bg-background-dark z-20">
      <div className="mb-10 text-accent">
        <Icon name="Terminal" className="text-3xl" />
      </div>
      
      <nav className="flex flex-col gap-8 flex-1">
        {sidebarRoutes.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group relative flex items-center justify-center p-2 rounded-lg transition-colors ${
                isActive ? 'bg-primary/20 text-accent' : 'text-slate-400 hover:text-accent'
              }`
            }
          >
            <Icon name={item.icon} />
            <span className="absolute left-14 hidden group-hover:block bg-background-dark border border-primary/20 px-2 py-1 text-xs rounded whitespace-nowrap z-50">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="flex flex-col gap-6">
        <button className="text-slate-400 hover:text-accent transition-colors">
          <Icon name="Settings" />
        </button>
        <div className="size-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-[10px] font-bold text-accent">
          AV
        </div>
      </div>
    </aside>
  );
};
