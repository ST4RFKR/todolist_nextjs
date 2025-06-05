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
  const { id } = todolist;
  const dispatch = useAppDispatch();
  const t = useTranslations('mainPage');

  // Получаем текущий фильтр (из props или localStorage)
  const getCurrentFilter = (): FilterValues => {
    const savedFilters = JSON.parse(localStorage.getItem('todolistFilters') || '{}');
    return savedFilters[id] || todolist.filter || 'all';
  };

  const currentFilter = getCurrentFilter();

  const changeFilter = (newFilter: FilterValues) => {
    // 1. Обновляем кэш RTK Query
    dispatch(
      todolistApi.util.updateQueryData('getTodolists', undefined, (draft) => {
        const item = draft.find((tl) => tl.id === id);
        if (item) item.filter = newFilter;
      }),
    );

    // 2. Сохраняем в localStorage
    const savedFilters = JSON.parse(localStorage.getItem('todolistFilters') || '{}');
    savedFilters[id] = newFilter;
    localStorage.setItem('todolistFilters', JSON.stringify(savedFilters));
  };

  return (
    <div className="flex items-center justify-center gap-2 w-full">
      <Button
        variant={currentFilter === 'all' ? 'default' : 'outline'}
        onClick={() => changeFilter('all')}>
        {t('filterButtons.all')}
      </Button>
      <Button
        variant={currentFilter === 'active' ? 'default' : 'outline'}
        onClick={() => changeFilter('active')}>
        {t('filterButtons.active')}
      </Button>
      <Button
        variant={currentFilter === 'completed' ? 'default' : 'outline'}
        onClick={() => changeFilter('completed')}>
        {t('filterButtons.completed')}
      </Button>
    </div>
  );
};
