'use client';
import { Card } from '@/shared/components/ui/card';
import { TodolistItem } from './TodolistItem/TodolistItem';

import { DomainTodolist } from '../lib/types';
import { cn } from '@/shared/lib/utils';

interface TodolistProps {
  todolist: DomainTodolist;
  className?: string;
  dragHandleProps?: {
    attributes: React.HTMLAttributes<HTMLElement>;
    listeners?: React.DOMAttributes<HTMLElement>;
  };
}

export const Todolist = ({ todolist, className, dragHandleProps }: TodolistProps) => {
  return (
    <Card className={cn('my-2 p-3 w-[350px]', className)}>
      <TodolistItem dragHandleProps={dragHandleProps} todolist={todolist} />
    </Card>
  );
};
