import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Slim Sidebar */}
      <aside className="w-16 flex flex-col items-center py-6 border-r border-primary/20 bg-background-dark z-20">
        <div className="mb-10 text-accent">
          <span className="material-symbols-outlined text-3xl">terminal</span>
        </div>
        <nav className="flex flex-col gap-8 flex-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `group relative flex items-center justify-center p-2 rounded-lg transition-colors ${
                isActive ? 'bg-primary/20 text-accent' : 'text-slate-400 hover:text-accent'
              }`
            }
          >
            <span className="material-symbols-outlined">home</span>
            <span className="absolute left-14 hidden group-hover:block bg-background-dark border border-primary/20 px-2 py-1 text-xs rounded whitespace-nowrap z-50">
              Home
            </span>
          </NavLink>

          <NavLink
            to="/community-queue"
            className={({ isActive }) =>
              `group relative flex items-center justify-center p-2 rounded-lg transition-colors ${
                isActive ? 'bg-primary/20 text-accent' : 'text-slate-400 hover:text-accent'
              }`
            }
          >
            <span className="material-symbols-outlined">smart_toy</span>
            <span className="absolute left-14 hidden group-hover:block bg-background-dark border border-primary/20 px-2 py-1 text-xs rounded whitespace-nowrap z-50">
              Community Queue
            </span>
          </NavLink>

          <NavLink
            to="/content-pipeline"
            className={({ isActive }) =>
              `group relative flex items-center justify-center p-2 rounded-lg transition-colors ${
                isActive ? 'bg-primary/20 text-accent' : 'text-slate-400 hover:text-accent'
              }`
            }
          >
            <span className="material-symbols-outlined">article</span>
            <span className="absolute left-14 hidden group-hover:block bg-background-dark border border-primary/20 px-2 py-1 text-xs rounded whitespace-nowrap z-50">
              Content Pipeline
            </span>
          </NavLink>

          <NavLink
            to="/ax-reports"
            className={({ isActive }) =>
              `group relative flex items-center justify-center p-2 rounded-lg transition-colors ${
                isActive ? 'bg-primary/20 text-accent' : 'text-slate-400 hover:text-accent'
              }`
            }
          >
            <span className="material-symbols-outlined">analytics</span>
            <span className="absolute left-14 hidden group-hover:block bg-background-dark border border-primary/20 px-2 py-1 text-xs rounded whitespace-nowrap z-50">
              AX Reports
            </span>
          </NavLink>

          <NavLink
            to="/knowledge-base"
            className={({ isActive }) =>
              `group relative flex items-center justify-center p-2 rounded-lg transition-colors ${
                isActive ? 'bg-primary/20 text-accent' : 'text-slate-400 hover:text-accent'
              }`
            }
          >
            <span className="material-symbols-outlined">settings_input_component</span>
            <span className="absolute left-14 hidden group-hover:block bg-background-dark border border-primary/20 px-2 py-1 text-xs rounded whitespace-nowrap z-50">
              Knowledge Base
            </span>
          </NavLink>
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

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_50%,_rgba(37,106,244,0.05)_0%,_transparent_100%)]">
        {/* Top Bar */}
        <header className="h-14 border-b border-primary/20 flex items-center justify-between px-6 bg-background-dark/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <span className="text-accent text-xs font-mono tracking-widest uppercase">Root::Command_Center</span>
            <div className="h-4 w-px bg-primary/20"></div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-green-500">SYSTEM_NOMINAL</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>UTC 14:22:09</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="material-symbols-outlined text-slate-400 hover:text-accent">notifications</button>
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

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-hidden flex flex-col">
           <Outlet />
        </div>
      </main>
    </div>
  );
}
