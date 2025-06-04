// components/AuthProvider.tsx
'use client';

import { useMeQuery } from '@/features/auth/api/auth-api';
import { setCredentials, setInitialized } from '@/features/auth/model/auth-slice';
import { TopLoader } from '@/shared/components/top-loader';
import { Spinner } from '@/shared/components/ui/spinner';
import { useAuth } from '@/shared/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const { isInitialized } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Проверяем токен в localStorage и cookies
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('token') || getCookieValue('authToken')
    : null;

  const { data, isLoading } = useMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (token && data?.resultCode === 0) {
      dispatch(setCredentials({
        token,
        userId: data.data.id,
      }));

      // Синхронизируем cookies и localStorage
      if (typeof document !== 'undefined' && !getCookieValue('authToken')) {
        document.cookie = `authToken=${token}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Strict`;
      }
    }

    if (!isLoading) {
      dispatch(setInitialized());
    }
  }, [data, token, isLoading, dispatch]);
  if (!mounted) {
    return <>{children}</>;
  }

  if (isLoading && token) {
    return <div className="flex items-center justify-center h-screen w-[200px] mx-auto">
      <TopLoader />
    </div>;
  }
  if (!isInitialized) {
    return <Spinner size={64} />;
  }


  return <>{children}</>;
};

// Утилита для получения значения cookie
function getCookieValue(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}