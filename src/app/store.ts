import { configureStore } from '@reduxjs/toolkit';
import launchpadReducer from '../features/launchpad/launchpadSlice';

export const store = configureStore({
  reducer: {
    launchpad: launchpadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
