import { configureStore, type ConfigureStoreOptions } from '@reduxjs/toolkit'
import layoutReducer from './features/layout/layoutSlice'
import appApi from '@pims-frontend/apis/lib/appApi'
import userManagementReducer from '../app/(auth)/user-management/user/_query/userManagementSlice'
import projectReducer from '../app/(auth)/project-management/project/_query/projectSlice'
import adminApi from '@pims-frontend/apis/lib/adminApi'
import codeMgtReducer from '../app/(auth)/project-management/code/_query/codeMgtSlice'


export const makeStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined,
) => {
  return configureStore({
    reducer: {
      [appApi.reducerPath]: appApi.reducer,
      [adminApi.reducerPath]: adminApi.reducer,
      layout: layoutReducer,
      userMgt: userManagementReducer,
      project: projectReducer,
      codeMgt: codeMgtReducer,
    },
    middleware: getDefaultMiddleware => [
      ...getDefaultMiddleware(),
      appApi.middleware,
      adminApi.middleware,
    ],
    ...options,
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
