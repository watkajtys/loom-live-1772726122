import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { CommunityQueue } from './pages/CommunityQueue';
import { ContentPipeline } from './pages/ContentPipeline';
import { AgentExecutionReports } from './pages/AgentExecutionReports';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { ExecutionProvider } from './providers/ExecutionProvider';
import { TelemetryProvider } from './providers/TelemetryProvider';

export default function App() {
  return (
    <TelemetryProvider>
      <ExecutionProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/queue" element={<CommunityQueue />} />
            <Route path="/" element={<ContentPipeline />} />
            <Route path="/reports" element={<AgentExecutionReports />} />
            <Route path="/knowledge" element={<KnowledgeBase />} />
          </Route>
        </Routes>
      </ExecutionProvider>
    </TelemetryProvider>
  );
}
