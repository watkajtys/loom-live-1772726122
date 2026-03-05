import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const Layout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_50%,_rgba(37,106,244,0.05)_0%,_transparent_100%)]">
        <TopBar />
        <Outlet />
      </main>
    </div>
  );
};
