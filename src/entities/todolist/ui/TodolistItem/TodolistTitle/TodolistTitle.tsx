'use client';
import {
  useDeleteTodolistMutation,
  useUpdateTodolistTitleMutation,
} from '@/entities/todolist/api/todolist-api';
import { EditableSpan } from '@/shared/components/editable-span';
import { Button } from '@/shared/components/ui';
import { GripHorizontal, X } from 'lucide-react';
import React from 'react';
import { PriyoriteBadge } from './PriyoriteBadge';
import { DomainTodolist } from '@/entities/todolist/lib/types';

type Props = {
  todolist: DomainTodolist;
  dragHandleProps?: {
    attributes: React.HTMLAttributes<HTMLElement>;
    listeners?: React.DOMAttributes<HTMLElement>;
  };
};

export const TodolistTitle = ({ todolist, dragHandleProps }: Props) => {
  const [deleteTodolist] = useDeleteTodolistMutation();
  const [updateTitle] = useUpdateTodolistTitleMutation();

  const handleDeleteTodolist = async () => {
    try {
      // Сначала пытаемся удалить на сервере
      await deleteTodolist(todolist.id).unwrap();

      // Если удаление успешно, чистим localStorage
      const priorities = JSON.parse(localStorage.getItem('todolistPriorities') || '{}');
      if (priorities[todolist.id]) {
        delete priorities[todolist.id];
        localStorage.setItem('todolistPriorities', JSON.stringify(priorities));
      }
    } catch (error) {
      console.error('Failed to delete todolist:', error);
      // Можно добавить обработку ошибки (например, показать toast)
    }
  };

  const handleUpdateTodolistTitle = (title: string) => {
    if (title === todolist.title) return;
    updateTitle({ id: todolist.id, title });
  };

  return (
    <div className="flex items-center justify-between">
      <EditableSpan value={todolist.title} onChange={(title) => handleUpdateTodolistTitle(title)} />
      <div className="flex items-center gap-2">
        <PriyoriteBadge todolist={todolist} />
        {dragHandleProps && (
          <Button
            {...dragHandleProps.listeners}
            {...dragHandleProps.attributes}
            className="cursor-grab active:cursor-grabbing"
            variant="ghost"
            size="icon">
            <GripHorizontal size={16} />
          </Button>
        )}
        <Button className="cursor-grab active:cursor-grabbing" onClick={handleDeleteTodolist}>
          <X />
        </Button>
      </div>
    </div>
  );
};
