import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { CommunityQueue } from './pages/CommunityQueue';
import { ContentPipeline } from './pages/ContentPipeline';
import { AXReports } from './pages/AXReports';
import { KnowledgeBase } from './pages/KnowledgeBase';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/queue" element={<CommunityQueue />} />
        <Route path="/content" element={<ContentPipeline />} />
        <Route path="/reports" element={<AXReports />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
      </Route>
    </Routes>
  );
}
