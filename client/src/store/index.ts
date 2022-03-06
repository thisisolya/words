import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user-slice';
import wordSlice from './slices/word-slice';

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    words: wordSlice.reducer,
  },
});

export default store;
