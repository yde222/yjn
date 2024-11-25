import { configureStore, type ConfigureStoreOptions } from '@reduxjs/toolkit';
import layoutReducer from './features/layout/layoutSlice';
import projectReducer from './features/project/projectSlice';

export const makeStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined,
) => {
  return configureStore({
    reducer: {
      layout: layoutReducer,
      project: projectReducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
    ...options,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
