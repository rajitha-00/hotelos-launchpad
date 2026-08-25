import { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../features/auth/AuthContext';
import { RootState } from '../app/store';
import {
  AppCategory,
  IAppItem,
  ITenantInfo,
  ISystemMetrics,
} from '../interfaces';
import { HOTEL_OS_APPS } from '../constants';
import { getCategoryFilters, ICategoryFilterItem } from '../functions';
import {
  setActiveTenantId,
  setSelectedCategory as setCategoryAction,
  setSearchQuery as setSearchAction,
  toggleFavoriteApp,
  setInspectAppId as setInspectAppAction,
} from '../features/launchpad';

export interface IUseLaunchpadReturn {
  apps: IAppItem[];
  filteredApps: IAppItem[];
  favoriteApps: IAppItem[];
  categories: ICategoryFilterItem[];
  selectedCategory: AppCategory;
  setSelectedCategory: (category: AppCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTenant: ITenantInfo;
  tenants: ITenantInfo[];
  setActiveTenant: (tenant: ITenantInfo) => void;
  inspectApp: IAppItem | null;
  setInspectApp: (app: IAppItem | null) => void;
  toggleFavorite: (id: string) => void;
  metrics: ISystemMetrics;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export const useLaunchpad = (): IUseLaunchpadReturn => {
  const dispatch = useDispatch();
  const { user, isLoading, refreshContext } = useAuth();

  const {
    activeTenantId,
    selectedCategory,
    searchQuery,
    starredAppIds,
    inspectAppId,
  } = useSelector((state: RootState) => state.launchpad);

  // The API returns authorization IDs only. Presentation metadata stays in the
  // frontend registry and an empty ID list intentionally renders no apps.
  const appsFromData = useMemo(() => {
    const allowedIds = new Set(user?.accessibleAppIds || []);
    return HOTEL_OS_APPS.filter((app) => allowedIds.has(app.id));
  }, [user?.accessibleAppIds]);
  const isSuperAdmin = user?.role?.toLowerCase() === 'super_admin';
  const assignedProperty: ITenantInfo | null = user?.property
    ? {
        id: user.property.id,
        name: user.property.name,
        city: user.property.city || '',
        country: user.property.country || '',
        roomsCount: user.property.roomsCount,
        tier: user.property.tier,
      }
    : null;
  const tenants = isSuperAdmin
    ? user?.properties || []
    : assignedProperty
      ? [assignedProperty]
      : [];
  const activeTenant =
    (isSuperAdmin ? tenants.find((tenant) => tenant.id === activeTenantId) : null) ||
    assignedProperty ||
    tenants[0] || {
      id: '',
      name: 'No property assigned',
      city: '',
      country: '',
      roomsCount: 0,
      tier: '',
    };

  // Map favorite status dynamically
  const apps = useMemo(() => {
    return appsFromData.map((app) => ({
      ...app,
      isFavorite: starredAppIds.includes(app.id),
    }));
  }, [appsFromData, starredAppIds]);

  // Set selected category dispatch
  const setSelectedCategory = useCallback(
    (category: AppCategory) => {
      dispatch(setCategoryAction(category));
    },
    [dispatch]
  );

  // Set search query dispatch
  const setSearchQuery = useCallback(
    (query: string) => {
      dispatch(setSearchAction(query));
    },
    [dispatch]
  );

  // Set active tenant dispatch
  const setActiveTenant = useCallback(
    (tenant: ITenantInfo) => {
      dispatch(setActiveTenantId(tenant.id));
    },
    [dispatch]
  );

  // Toggle favorite star status dispatch
  const toggleFavorite = useCallback(
    (id: string) => {
      dispatch(toggleFavoriteApp(id));
    },
    [dispatch]
  );

  // Selected app for inspection
  const inspectApp = useMemo(() => {
    if (!inspectAppId) return null;
    return apps.find((a) => a.id === inspectAppId) || null;
  }, [apps, inspectAppId]);

  const setInspectApp = useCallback(
    (app: IAppItem | null) => {
      dispatch(setInspectAppAction(app ? app.id : null));
    },
    [dispatch]
  );

  // Category filters with dynamic counts
  const categories = useMemo(() => getCategoryFilters(apps), [apps]);

  // Starred shortcut apps
  const favoriteApps = useMemo(
    () => apps.filter((app) => app.isFavorite),
    [apps]
  );

  // Filtered applications based on category and search query
  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesCategory =
        selectedCategory === 'ALL' || app.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        app.name.toLowerCase().includes(q) ||
        app.shortName.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q) ||
        app.tagline.toLowerCase().includes(q) ||
        app.port.toString().includes(q) ||
        app.features.some((f) => f.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [apps, selectedCategory, searchQuery]);

  // Computed metrics from API or fallback
  const metrics: ISystemMetrics = useMemo(() => {
    if (user?.metrics) return user.metrics;
    return {
      activeAppsCount: apps.length,
      totalRoomsManaged: activeTenant.roomsCount,
      apiLatencyMs: 0,
      systemUptime: '—',
      activeStaffCount: 0,
      activeOrdersCount: 0,
    };
  }, [user, apps, activeTenant]);

  const refetch = useCallback(() => {
    void refreshContext();
  }, [refreshContext]);

  return {
    apps,
    filteredApps,
    favoriteApps,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    activeTenant,
    tenants,
    setActiveTenant,
    inspectApp,
    setInspectApp,
    toggleFavorite,
    metrics,
    isLoading,
    isError: !isLoading && (!user || !assignedProperty),
    refetch,
  };
};

export default useLaunchpad;
