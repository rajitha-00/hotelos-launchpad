export type AppCategory =
  | 'ALL'
  | 'OPERATIONS'
  | 'DINING'
  | 'ADMIN'
  | 'ANALYTICS'
  | 'PUBLIC'
  | 'DEVELOPER'
  | 'INTEGRATION';

export type AppStatus = 'OPERATIONAL' | 'DEGRADED' | 'MAINTENANCE' | 'BETA' | 'DEVELOPMENT';

export interface IAppMetrics {
  label: string;
  value: string;
}

export interface IAppItem {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  category: AppCategory;
  status: AppStatus;
  port: number;
  url: string;
  devCommand: string;
  iconBg: string;
  iconColor: string;
  gradientBorder: string;
  badge?: string;
  badgeColor?: string;
  badgeText: string;
  metrics: IAppMetrics;
  roles: string[];
  features: string[];
  isFavorite: boolean;
  docUrl: string;
  lordIconSrc: string;
  lordIconTrigger?: string;
}

export interface ITenantInfo {
  id: string;
  name: string;
  city: string;
  country: string;
  roomsCount: number;
  tier: string;
}

export interface ISystemMetrics {
  activeAppsCount: number;
  totalRoomsManaged: number;
  apiLatencyMs: number;
  systemUptime: string;
  activeStaffCount: number;
  activeOrdersCount: number;
}

export interface ILaunchpadData {
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
    avatarUrl?: string;
  };
  activeTenant: ITenantInfo;
  tenants: ITenantInfo[];
  apps: IAppItem[];
  metrics: ISystemMetrics;
}

export interface ILaunchpadResponse {
  status: 'success' | 'fail' | 'error';
  data: ILaunchpadData;
}
