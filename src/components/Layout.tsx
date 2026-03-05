import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Icon } from './Icon';

export function Layout() {
  const location = useLocation();
  const getRouteName = (pathname: string) => {
    switch (pathname) {
      case '/': return 'Home';
      case '/community-queue': return 'Community Queue';
      case '/content-pipeline': return 'Content Pipeline';
      case '/ax-reports': return 'AX Reports';
      case '/knowledge-base': return 'Knowledge Base';
      default: return 'Unknown';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden text-slate-900 dark:text-slate-100 font-display selection:bg-accent/30 selection:text-accent bg-background-light dark:bg-background-dark">
      {/* Slim Sidebar */}
      <aside className="w-16 flex flex-col items-center py-6 border-r border-primary/20 bg-background-dark z-20">
        <div className="mb-10 text-accent">
          <Icon name="terminal" className="text-3xl" />
        </div>
        <nav className="flex flex-col gap-8 flex-1">
          <NavItem to="/" icon="home" label="Home" />
          <NavItem to="/community-queue" icon="forum" label="Community" />
          <NavItem to="/content-pipeline" icon="article" label="Content" />
          <NavItem to="/ax-reports" icon="bug_report" label="AX Reports" />
          <NavItem to="/knowledge-base" icon="library_books" label="Knowledge" />
        </nav>
        <div className="flex flex-col gap-6">
          <button className="text-slate-400 hover:text-accent transition-colors">
            <Icon name="settings" />
          </button>
          <div className="size-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-[10px] font-bold text-accent">
            AV
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_50%,_rgba(37,106,244,0.05)_0%,_transparent_100%)]">
        {/* Top Bar */}
        <header className="h-14 border-b border-primary/20 flex items-center justify-between px-6 bg-background-dark/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <span className="text-accent text-xs font-mono tracking-widest uppercase">Root::{getRouteName(location.pathname).replace(' ', '_')}</span>
            <div className="h-4 w-px bg-primary/20"></div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-green-500">SYSTEM_NOMINAL</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
              <Icon name="schedule" className="text-sm" />
              <span>UTC {new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' })}</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-accent">
                <Icon name="notifications" />
              </button>
              <div className="h-6 w-px bg-primary/20"></div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-tighter text-slate-500">Uptime</p>
                  <p className="text-xs font-mono text-accent">99.982%</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content area */}
        <Outlet />
      </main>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group relative flex items-center justify-center p-2 rounded-lg transition-colors ${
          isActive ? 'bg-primary/20 text-accent' : 'text-slate-400 hover:text-accent'
        }`
      }
    >
      <Icon name={icon} />
      <span className="absolute left-14 hidden group-hover:block bg-background-dark border border-primary/20 px-2 py-1 text-xs rounded whitespace-nowrap z-50">
        {label}
      </span>
    </NavLink>
  );
}
