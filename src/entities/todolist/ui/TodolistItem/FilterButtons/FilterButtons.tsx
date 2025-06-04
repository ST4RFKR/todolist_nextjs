'use client';
import React from 'react';
import { Button } from '@/shared/components/ui';
import { useTranslations } from 'next-intl';

export const FilterButtons = () => {
  const t = useTranslations("mainPage");
  return (
    <div className='flex items-center justify-center gap-2 w-full'>
      <Button>{t('filterButtons.all')}</Button>
      <Button>{t('filterButtons.active')}</Button>
      <Button>{t('filterButtons.completed')}</Button>
    </div>
  );
};