import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

export const createStore = () =>
  configureStore({
    reducer: rootReducer,
  });

const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
