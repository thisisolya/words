import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/user-slice';
import wordSlice from './reducers/word-slice';

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    words: wordSlice.reducer,
  },
});

export default store;
