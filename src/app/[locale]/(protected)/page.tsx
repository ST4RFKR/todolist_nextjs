'use client';
import {
  useCreateTodolistMutation,
  useGetTodolistsQuery,
  useReorderTodolistMutation
} from '@/entities/todolist/api/todolist-api';
import { TodolistsContainer } from '@/entities/todolist/ui/TodolistsContainer';
import { CreateItemForm } from '@/shared/components/create-item-form';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToFirstScrollableAncestor, restrictToWindowEdges } from '@dnd-kit/modifiers';
export default function HomePage() {
  const { data: todolists = [], isLoading: isFetching } = useGetTodolistsQuery();
  const [createTodolist, { isLoading: isCreating }] = useCreateTodolistMutation();
  const [reorderTodolist] = useReorderTodolistMutation();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    // Новая логика для сетки
    const oldIndex = todolists.findIndex(t => t.id === active.id);
    const newIndex = todolists.findIndex(t => t.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    // Определяем putAfterItemId в зависимости от направления
    const putAfterItemId = newIndex > oldIndex
      ? todolists[newIndex].id
      : newIndex === 0
        ? null
        : todolists[newIndex - 1].id;

    reorderTodolist({
      todolistId: active.id as string,
      putAfterItemId
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}
      modifiers={[
        restrictToFirstScrollableAncestor,
        restrictToWindowEdges
      ]}>
      <div className='flex items-center w-[350px] p-2'>
        <CreateItemForm
          disabled={isCreating}
          create={(title) => createTodolist(title)}
        />
      </div>
      <div className='flex flex-wrap gap-3'>

        <TodolistsContainer todolists={todolists} isLoading={isFetching} />
      </div>
    </DndContext>
  );
}