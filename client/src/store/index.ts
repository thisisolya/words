import { configureStore } from '@reduxjs/toolkit';
import { appAPI } from './api';
import appSlice from './slice';

const store = configureStore({
  reducer: {
    users: appSlice.reducer,
    [appAPI.reducerPath]: appAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appAPI.middleware),
});

export default store;
export type AppState = ReturnType<typeof store.getState>;
