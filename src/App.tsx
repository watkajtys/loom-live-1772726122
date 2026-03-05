import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Home } from './views/Home';
import { CommunityQueue } from './views/CommunityQueue';
import { ContentPipeline } from './views/ContentPipeline';
import { AxReports } from './views/AxReports';
import { KnowledgeBase } from './views/KnowledgeBase';

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home />;
      case 'community_queue':
        return <CommunityQueue />;
      case 'content_pipeline':
        return <ContentPipeline />;
      case 'ax_reports':
        return <AxReports />;
      case 'knowledge_base':
        return <KnowledgeBase />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden text-slate-900 dark:text-slate-100 font-display selection:bg-accent/30 selection:text-accent bg-background-light dark:bg-background-dark">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 flex flex-col overflow-hidden bg-radial-glow">
        <Header currentView={currentView} />
        {renderView()}
      </main>
    </div>
  );
}
