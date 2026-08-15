import { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import {
  AppCategory,
  IAppItem,
  ITenantInfo,
  ISystemMetrics,
} from '../interfaces';
import { HOTEL_OS_APPS, DEFAULT_TENANTS } from '../constants';
import { getCategoryFilters, ICategoryFilterItem } from '../functions';
import {
  useGetLaunchpadDataQuery,
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

  const {
    activeTenantId,
    selectedCategory,
    searchQuery,
    starredAppIds,
    inspectAppId,
  } = useSelector((state: RootState) => state.launchpad);

  // RTK Query endpoint hook
  const { data, isLoading, isError, refetch } = useGetLaunchpadDataQuery(
    activeTenantId ? { tenantId: activeTenantId } : undefined
  );

  // Fallback to constants if backend API is not yet loaded or unreachable
  const appsFromData = data?.apps || HOTEL_OS_APPS;
  const tenants = data?.tenants || DEFAULT_TENANTS;
  const activeTenant =
    data?.activeTenant ||
    tenants.find((t) => t.id === activeTenantId) ||
    tenants[0];

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
    if (data?.metrics) return data.metrics;
    return {
      activeAppsCount: apps.filter((a) => a.status === 'OPERATIONAL').length,
      totalRoomsManaged: activeTenant.roomsCount,
      apiLatencyMs: 28,
      systemUptime: '99.99%',
      activeStaffCount: 34,
      activeOrdersCount: 18,
    };
  }, [data, apps, activeTenant]);

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
    isError,
    refetch,
  };
};

export default useLaunchpad;
