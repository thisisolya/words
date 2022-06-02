import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import cardApi from './apis/card-api';
import userApi from './apis/user-api';
import { cardSlice, userSlice, utilitySlice } from './slices';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    card: cardSlice.reducer,
    utility: utilitySlice.reducer,
    [cardApi.reducerPath]: cardApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
    .concat(cardApi.middleware)
    .concat(userApi.middleware)
    .concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
export type AppState = ReturnType<typeof store.getState>;
