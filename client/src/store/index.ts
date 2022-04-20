import { configureStore } from '@reduxjs/toolkit';
import cardApi from './apis/card-api';
import userApi from './apis/user-api';
import { cardSlice, userSlice } from './slices';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    card: cardSlice.reducer,
    [cardApi.reducerPath]: cardApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
    .concat(cardApi.middleware)
    .concat(userApi.middleware),
});

export default store;
export type AppState = ReturnType<typeof store.getState>;
