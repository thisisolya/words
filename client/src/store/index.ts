import { configureStore } from '@reduxjs/toolkit';
import cardApi from './api/cardApi';
import userApi from './api/userApi';
import { cardSlice, userSlice } from './slices';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    card: cardSlice.reducer,
    [cardApi.reducerPath]: cardApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    cardApi.middleware,
    userApi.middleware,
  ),
});

export default store;
export type AppState = ReturnType<typeof store.getState>;
