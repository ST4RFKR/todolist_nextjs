'use client';
import React from 'react';
import { Button } from '@/shared/components/ui';
import { useTranslations } from 'next-intl';

import { todolistApi } from '@/entities/todolist/api/todolist-api';
import { DomainTodolist, FilterValues } from '@/entities/todolist/lib/types';
import { useAppDispatch } from '@/shared/hooks/hooks';

type Props = {
  todolist: DomainTodolist;
};

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist;
  const dispatch = useAppDispatch();
  const t = useTranslations('mainPage');

  const changeFilter = (newFilter: FilterValues) => {
    dispatch(
      todolistApi.util.updateQueryData('getTodolists', undefined, (draft) => {
        const item = draft.find((tl) => tl.id === id);
        if (item) {
          item.filter = newFilter;
        }
      })
    );
  };
  if (!todolist) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex items-center justify-center gap-2 w-full'>
      <Button
        variant={filter === 'all' ? 'default' : 'outline'}
        onClick={() => changeFilter('all')}
      >
        {t('filterButtons.all')}
      </Button>
      <Button
        variant={filter === 'active' ? 'default' : 'outline'}
        onClick={() => changeFilter('active')}
      >
        {t('filterButtons.active')}
      </Button>
      <Button
        variant={filter === 'completed' ? 'default' : 'outline'}
        onClick={() => changeFilter('completed')}
      >
        {t('filterButtons.completed')}
      </Button>
    </div>
  );
};
