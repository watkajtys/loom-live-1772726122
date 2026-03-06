import { type IconName } from '../components/Icon';

export interface AppRoute {
  path: string;
  id: string;
  icon: IconName;
  label: string;
  showInSidebar: boolean;
}

export const APP_ROUTES: AppRoute[] = [
  { path: '/dashboard', id: 'Root::Command_Center', icon: 'Home', label: 'Command Center', showInSidebar: true },
  { path: '/', id: 'Root::Community_Queue', icon: 'Bot', label: 'Community Queue', showInSidebar: true },
  { path: '/content', id: 'Root::Content_Pipeline', icon: 'FileText', label: 'Content Pipeline', showInSidebar: true },
  { path: '/reports', id: 'Root::Agent_Execution_Reports', icon: 'LineChart', label: 'Agent Execution Reports', showInSidebar: true },
  { path: '/knowledge', id: 'Root::Knowledge_Base', icon: 'Database', label: 'Knowledge Base', showInSidebar: true },
];

export const getRouteById = (path: string): AppRoute | undefined => {
  return APP_ROUTES.find(route => route.path === path);
};

export const getRouteName = (pathname: string): string => {
  const route = getRouteById(pathname);
  return route ? route.id : `Root::${pathname.replace('/', '').toUpperCase()}`;
};
