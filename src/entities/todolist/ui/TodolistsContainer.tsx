'use client';
import { DomainTodolist } from '../lib/types';
import { SortableTodolist } from './SortableTodolist';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

export function TodolistsContainer({
  todolists,
  isLoading
}: {
  todolists: DomainTodolist[],
  isLoading: boolean
}) {
  return (
    <SortableContext items={todolists.map(t => t.id)} strategy={rectSortingStrategy}>
      {isLoading
        ? [...Array(4).fill(null)].map((_, index) => (
          <div key={index} className="my-2 p-3 w-[350px]">
            {/* Placeholder for skeleton */}
          </div>
        ))
        : todolists.map(todolist => (
          <SortableTodolist
            key={todolist.id}
            id={todolist.id}
            todolist={todolist}
          />
        ))}
    </SortableContext>
  );
}