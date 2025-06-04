'use client';
import { ListTodo } from 'lucide-react';
import React from 'react';

import { ModeToggle } from './theme-mode-toggle';
import { cn } from '../lib/utils';
import { useTranslations } from 'next-intl';
import { Button } from './ui';
import { LocaleSwitcher } from '.';
import { useLogoutMutation } from '@/features/auth/api/auth-api';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../hooks/hooks';


interface Props {
  className?: string;
}

export const Header = ({ className }: Props) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [logout, { isLoading }] = useLogoutMutation();
  const router = useRouter();

  const handleLogout = () => {
    logout().unwrap().then(() => {
      router.push('/sign-in');
    });
  }
  const isLoggedIn = true;
  const t = useTranslations('Header');
  return (
    <header className={cn('flex items-center justify-between p-4', className)}>
      <div className="flex items-center gap-2">
        <ListTodo />
        {t('logo')}
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <LocaleSwitcher />

        {isAuthenticated && (
          <Button disabled={isLoading} onClick={handleLogout}>
            {t('logOut')}
          </Button>
        )}
      </div>
    </header>
  );
};
