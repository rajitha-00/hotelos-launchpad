import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { launchpadApi } from '../features/launchpad/launchpadApi';
import launchpadReducer from '../features/launchpad/launchpadSlice';

export const store = configureStore({
  reducer: {
    [launchpadApi.reducerPath]: launchpadApi.reducer,
    launchpad: launchpadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(launchpadApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
