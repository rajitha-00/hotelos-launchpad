import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppCategory } from '../../interfaces';

interface LaunchpadState {
  activeTenantId: string | null;
  selectedCategory: AppCategory;
  searchQuery: string;
  starredAppIds: string[];
  inspectAppId: string | null;
}

const INITIAL_STARRED_APPS = [
  'stay-os',
  'dine-os',
  'people-hr',
  'super-admin',
  'payments-os',
  'inventory-os',
];

const initialState: LaunchpadState = {
  activeTenantId: null,
  selectedCategory: 'ALL',
  searchQuery: '',
  starredAppIds: INITIAL_STARRED_APPS,
  inspectAppId: null,
};

export const launchpadSlice = createSlice({
  name: 'launchpad',
  initialState,
  reducers: {
    setActiveTenantId: (state, action: PayloadAction<string>) => {
      state.activeTenantId = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<AppCategory>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleFavoriteApp: (state, action: PayloadAction<string>) => {
      const appId = action.payload;
      if (state.starredAppIds.includes(appId)) {
        state.starredAppIds = state.starredAppIds.filter((id) => id !== appId);
      } else {
        state.starredAppIds.push(appId);
      }
    },
    setInspectAppId: (state, action: PayloadAction<string | null>) => {
      state.inspectAppId = action.payload;
    },
  },
});

export const {
  setActiveTenantId,
  setSelectedCategory,
  setSearchQuery,
  toggleFavoriteApp,
  setInspectAppId,
} = launchpadSlice.actions;

export default launchpadSlice.reducer;
