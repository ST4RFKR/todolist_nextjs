import { DomainTodolist } from '@/entities/todolist/lib/types';
import { Badge } from '@/shared/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';
import React, { useMemo, useState } from 'react';

export const PriyoriteBadge = ({ todolist }: { todolist: DomainTodolist }) => {
  const t = useTranslations('mainPage');
  const priorityMap = useMemo(
    () => ({
      0: { label: t('pryority.low'), color: 'bg-yellow-500' },
      1: { label: t('pryority.medium'), color: 'bg-green-500' },
      2: { label: t('pryority.high'), color: 'bg-red-500' },
    }),
    [t],
  );
  const [priority, setPriority] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('todolistPriorities') || '{}');
    return stored[todolist.id] ?? todolist.priyorite ?? 1;
  });

  const onSelectPriority = (newPriority: number) => {
    setPriority(newPriority);

    // Получаем существующий объект из localStorage или создаём пустой
    const stored = JSON.parse(localStorage.getItem('todolistPriorities') || '{}');

    // Обновляем приоритет для текущего todolist.id
    stored[todolist.id] = newPriority;

    // Записываем обратно
    localStorage.setItem('todolistPriorities', JSON.stringify(stored));
  };

  const current = priorityMap[priority as keyof typeof priorityMap] || priorityMap[1];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          variant="outline"
          className={`cursor-pointer ${current.color}`}
          aria-label={`Current priority is ${current.label}`}>
          {current.label}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Priority change</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.entries(priorityMap).map(([key, { label, color }]) => (
          <DropdownMenuItem
            key={key}
            className={priority === Number(key) ? 'font-bold' : ''}
            onSelect={() => onSelectPriority(Number(key))}>
            <span className={`mr-2 inline-block w-3 h-3 rounded-full ${color}`}></span>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
