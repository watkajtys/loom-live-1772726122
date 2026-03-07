import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Icon } from './Icon';
import { useExecution } from '../providers/ExecutionProvider';
import { UTILITY_ACTIONS } from '../constants/utilityConfig';

export const Sidebar: React.FC = () => {
  const { routes } = useExecution();
  const sidebarRoutes = routes.filter(route => route.showInSidebar);

  return (
    <aside className="w-16 flex flex-col items-center py-6 border-r border-accent/20 bg-black z-20">
      <div className="mb-10 text-accent">
        <Icon name="terminal" className="text-3xl" />
      </div>
      
      <nav className="flex flex-col gap-8 flex-1">
        {sidebarRoutes.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group relative flex items-center justify-center p-2 rounded-lg transition-colors ${
                isActive ? 'bg-accent/10 text-accent' : 'text-slate-400 hover:text-accent'
              }`
            }
          >
            <Icon name={item.icon} />
            <span className="absolute left-14 hidden group-hover:block bg-black border border-accent/20 px-2 py-1 text-xs rounded whitespace-nowrap z-50 font-mono tracking-widest text-accent uppercase shadow-[0_0_10px_rgba(0,242,255,0.1)]">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="flex flex-col gap-6">
        {UTILITY_ACTIONS.map((utility) => {
          if (utility.isAvatar) {
            return (
              <Link key={utility.id} to={utility.path || '#'} className="size-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-[10px] font-bold text-accent font-mono tracking-widest shadow-[0_0_10px_rgba(0,242,255,0.1)] hover:bg-accent/20 transition-colors">
                {utility.label}
              </Link>
            );
          }
          return (
            <Link key={utility.id} to={utility.path || '#'} className="text-slate-400 hover:text-accent transition-colors flex justify-center items-center">
              <Icon name={utility.icon} />
            </Link>
          );
        })}
      </div>
    </aside>
  );
};
