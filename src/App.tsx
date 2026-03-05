import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './views/Home';
import { CommunityQueue } from './views/CommunityQueue';
import { ContentPipeline } from './views/ContentPipeline';
import { AXReports } from './views/AXReports';
import { KnowledgeBase } from './views/KnowledgeBase';

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