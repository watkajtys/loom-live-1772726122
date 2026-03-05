import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import CommunityQueue from './pages/CommunityQueue';
import ContentPipeline from './pages/ContentPipeline';
import AXReports from './pages/AXReports';
import KnowledgeBase from './pages/KnowledgeBase';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="community-queue" element={<CommunityQueue />} />
          <Route path="content-pipeline" element={<ContentPipeline />} />
          <Route path="ax-reports" element={<AXReports />} />
          <Route path="knowledge-base" element={<KnowledgeBase />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
