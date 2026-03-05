import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shell from './components/layout/Shell';
import Dashboard from './views/Dashboard';
import CommunityQueue from './views/CommunityQueue';
import ContentPipeline from './views/ContentPipeline';
import AXReports from './views/AXReports';
import KnowledgeBase from './views/KnowledgeBase';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shell />}>
          <Route index element={<Dashboard />} />
          <Route path="community" element={<CommunityQueue />} />
          <Route path="content" element={<ContentPipeline />} />
          <Route path="ax-reports" element={<AXReports />} />
          <Route path="knowledge-base" element={<KnowledgeBase />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
