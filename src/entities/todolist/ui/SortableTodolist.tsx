'use client';
import { Todolist } from './Todolist';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/shared/lib/utils';
import { DomainTodolist } from '../lib/types';

interface SortableTodolistProps {
  id: string;
  todolist: DomainTodolist;
}

export function SortableTodolist({ id, todolist }: SortableTodolistProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative transition-transform duration-200',
        isDragging && 'opacity-70 shadow-lg z-50 scale-105'
      )}
    >
      <Todolist
        todolist={todolist}
        dragHandleProps={{ attributes, listeners }}
        className="pl-8 m-2"
      />
    </div>
  );
}