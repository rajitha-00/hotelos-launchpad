import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { firebaseAuth } from '../../app/firebase';
import { ILaunchpadData, IAppItem, ITenantInfo } from '../../interfaces';

export const launchpadApi = createApi({
  reducerPath: 'launchpadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: async (headers, { getState }) => {
      try {
        const currentUser = firebaseAuth.currentUser;
        if (currentUser) {
          const token = await currentUser.getIdToken();
          headers.set('authorization', `Bearer ${token}`);
        }
      } catch {
        // Fallback if auth token resolution fails
      }

      const state = getState() as any;
      const activeTenantId =
        state?.launchpad?.activeTenantId || localStorage.getItem('hotelos.org_id');
      if (activeTenantId) {
        headers.set('x-organization-id', activeTenantId);
      }

      return headers;
    },
  }),
  tagTypes: ['LaunchpadData', 'Tenants', 'AppDetails'],
  endpoints: (builder) => ({
    getLaunchpadData: builder.query<ILaunchpadData, { tenantId?: string } | void>({
      query: (arg) => {
        const tenantId = arg?.tenantId;
        return tenantId ? `/portal/launchpad?tenantId=${tenantId}` : '/portal/launchpad';
      },
      transformResponse: (response: { status: string; data: ILaunchpadData }) => response.data,
      providesTags: ['LaunchpadData'],
    }),

    getAppDetails: builder.query<IAppItem, string>({
      query: (appId) => `/portal/launchpad/apps/${appId}`,
      transformResponse: (response: { status: string; data: { app: IAppItem } }) => response.data.app,
      providesTags: (_result, _error, id) => [{ type: 'AppDetails', id }],
    }),

    getTenants: builder.query<ITenantInfo[], void>({
      query: () => '/portal/launchpad/tenants',
      transformResponse: (response: { status: string; data: { tenants: ITenantInfo[] } }) => response.data.tenants,
      providesTags: ['Tenants'],
    }),
  }),
});

export const {
  useGetLaunchpadDataQuery,
  useGetAppDetailsQuery,
  useGetTenantsQuery,
} = launchpadApi;
