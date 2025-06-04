
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './baseApi';
import { authReducer, authSlice } from '@/features/auth/model/auth-slice';


export const makeStore = () => {
  return configureStore({
    reducer: {
      [authSlice.name]: authReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
