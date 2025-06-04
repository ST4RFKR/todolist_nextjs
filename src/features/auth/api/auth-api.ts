import { baseApi } from '@/shared/lib/baseApi';
import { logout, setCredentials } from '../model/auth-slice';

export type FieldError = {
  error: string;
  field: string;
};

export type BaseResponse<T = {}> = {
  data: T;
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
};
export type LoginArgs = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => 'auth/me',
    }),
    login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginArgs>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.resultCode === 0) {
            // Сохраняем в localStorage
            if (typeof window !== 'undefined') {
              localStorage.setItem('token', data.data.token);
            }
            
            // Сохраняем в cookies для middleware
            if (typeof document !== 'undefined') {
              document.cookie = `authToken=${data.data.token}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Strict`;
            }
            
            // Обновляем Redux
            dispatch(setCredentials({
              token: data.data.token,
              userId: data.data.userId,
            }));
          }
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => ({
        url: 'auth/login',
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // Очищаем данные
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        if (typeof document !== 'undefined') {
          document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
        dispatch(logout());
        
        try {
          await queryFulfilled;
        } catch (error) {
          // Игнорируем ошибки logout
        }
      },
    }),
  }),
});

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi;