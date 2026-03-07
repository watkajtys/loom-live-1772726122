import { type IconName } from '../components/Icon';

export interface UtilityAction {
  id: string;
  icon: IconName;
  label: string;
  action?: () => void;
  path?: string;
  isAvatar?: boolean;
}

export const UTILITY_ACTIONS: UtilityAction[] = [
  { id: 'settings', icon: 'settings', label: 'Settings', path: '/?view=settings' },
  { id: 'profile', icon: 'user', label: 'AV', isAvatar: true, path: '/?modal=profile' },
];
