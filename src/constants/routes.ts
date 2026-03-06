import * as LucideIcons from 'lucide-react';

export interface AppRoute {
  path: string;
  id: string;
  icon: keyof typeof LucideIcons;
  label: string;
  showInSidebar: boolean;
}

export const APP_ROUTES: AppRoute[] = [
  { path: '/', id: 'Root::Command_Center', icon: 'Home', label: 'Home', showInSidebar: true },
  { path: '/queue', id: 'Root::Community_Queue', icon: 'Bot', label: 'Community Queue', showInSidebar: true },
  { path: '/content', id: 'Root::Content_Pipeline', icon: 'FileText', label: 'Content Pipeline', showInSidebar: true },
  { path: '/reports', id: 'Root::AX_Reports', icon: 'LineChart', label: 'AX Reports', showInSidebar: true },
  { path: '/knowledge', id: 'Root::Knowledge_Base', icon: 'Database', label: 'Knowledge Base', showInSidebar: true },
];

export const getRouteById = (path: string): AppRoute | undefined => {
  return APP_ROUTES.find(route => route.path === path);
};

export const getRouteName = (pathname: string): string => {
  const route = getRouteById(pathname);
  return route ? route.id : `Root::${pathname.replace('/', '').toUpperCase()}`;
};
