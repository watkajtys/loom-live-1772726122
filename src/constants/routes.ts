import { type IconName } from '../components/Icon';

export interface AppRoute {
  path: string;
  id: string;
  icon: IconName;
  label: string;
  showInSidebar: boolean;
}

// Task: Integrate Knowledge Base into application routing and navigation
export const APP_ROUTES: AppRoute[] = [
  { path: '/dashboard', id: 'Root::Command_Center', icon: 'home', label: 'Command Center', showInSidebar: true },
  { path: '/orchestrator', id: 'Root::Orchestrator', icon: 'hub', label: 'Orchestrator', showInSidebar: true },
  { path: '/dashboard/logs', id: 'Root::Execution_Logs', icon: 'terminal', label: 'Execution Logs', showInSidebar: true },
  { path: '/queue', id: 'Root::Community_Queue', icon: 'bot', label: 'Community Queue', showInSidebar: true },
  { path: '/', id: 'Root::Knowledge_Base', icon: 'database', label: 'Knowledge Base', showInSidebar: true },
  { path: '/pipeline', id: 'Root::Content_Pipeline', icon: 'file-text', label: 'Content Pipeline', showInSidebar: true },
  { path: '/reports', id: 'Root::Agent_Execution_Reports', icon: 'line-chart', label: 'Agent Execution Reports', showInSidebar: true },
];

export const getRouteById = (path: string): AppRoute | undefined => {
  return APP_ROUTES.find(route => route.path === path);
};

export const getRouteName = (pathname: string): string => {
  const route = getRouteById(pathname);
  return route ? route.id : `Root::${pathname.replace('/', '').toUpperCase()}`;
};
