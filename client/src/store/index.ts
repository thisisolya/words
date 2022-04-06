import { configureStore } from '@reduxjs/toolkit';
import { appAPI } from './api';
import { cardSlice, userSlice } from './slices';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    card: cardSlice.reducer,
    [appAPI.reducerPath]: appAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appAPI.middleware),
});

export default store;
export type AppState = ReturnType<typeof store.getState>;
