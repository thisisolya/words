import { configureStore } from '@reduxjs/toolkit'
import usersSlice from './slices/users-slice';
import cardsSlice from './slices/cards-slice';

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    words: cardsSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
