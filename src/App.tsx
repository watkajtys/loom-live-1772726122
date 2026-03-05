import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Home } from './views/Home';
import { CommunityQueue } from './views/CommunityQueue';
import { ContentPipeline } from './views/ContentPipeline';
import { AxReports } from './views/AxReports';
import { KnowledgeBase } from './views/KnowledgeBase';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden text-slate-900 dark:text-slate-100 font-display selection:bg-accent/30 selection:text-accent bg-background-light dark:bg-background-dark">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden bg-radial-glow">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/community-queue" element={<CommunityQueue />} />
            <Route path="/content-pipeline" element={<ContentPipeline />} />
            <Route path="/ax-reports" element={<AxReports />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
