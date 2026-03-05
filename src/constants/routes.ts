export const ROUTE_NAMES: Record<string, string> = {
  '/': 'Root::Command_Center',
  '/queue': 'Root::Community_Queue',
  '/content': 'Root::Content_Pipeline',
  '/reports': 'Root::AX_Reports',
  '/knowledge': 'Root::Knowledge_Base',
};

export const getRouteName = (pathname: string): string => {
  return ROUTE_NAMES[pathname] || `Root::${pathname.replace('/', '').toUpperCase()}`;
};
