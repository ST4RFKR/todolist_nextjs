import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

export const baseApi = createApi({
  reducerPath: 'todolistApi',
  tagTypes: ['Task', 'Todolist', 'Auth'],
  
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://social-network.samuraijs.com/api/1.1/',
    credentials: 'include',
      prepareHeaders: (headers, { getState }) => {
        headers.set('API-KEY', process.env.NEXT_PUBLIC_API_KEY || '');
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
