'use client';
import {
  useCreateTodolistMutation,
  useGetTodolistsQuery,
  useReorderTodolistMutation,
} from '@/entities/todolist/api/todolist-api';
import { TodolistsContainer } from '@/entities/todolist/ui/TodolistsContainer';
import { CreateItemForm } from '@/shared/components/create-item-form';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToFirstScrollableAncestor, restrictToWindowEdges } from '@dnd-kit/modifiers';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

export default function HomePage() {
  const { data: todolists = [], isLoading: isFetching } = useGetTodolistsQuery();
  const [createTodolist, { isLoading: isCreating }] = useCreateTodolistMutation();
  const [reorderTodolist] = useReorderTodolistMutation();

  const [localPriorities, setLocalPriorities] = useState<{ [key: string]: number }>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedPriorities = localStorage.getItem('todolistPriorities');
    if (storedPriorities) {
      setLocalPriorities(JSON.parse(storedPriorities));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('todolistPriorities', JSON.stringify(localPriorities));
    }
  }, [localPriorities, isClient]);

  const transformedTodolists = useMemo(() => {
    if (!isClient) return todolists.map((t) => ({ ...t, filter: 'all' as const }));

    const savedFilters = JSON.parse(localStorage.getItem('todolistFilters') || '{}');

    return todolists.map((t) => ({
      ...t,
      priyorite: localPriorities[t.id] ?? t.priyorite ?? 1,
      filter: savedFilters[t.id] || t.filter || 'all',
    }));
  }, [todolists, localPriorities, isClient]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const oldIndex = todolists.findIndex((t) => t.id === active.id);
    const newIndex = todolists.findIndex((t) => t.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const putAfterItemId =
      newIndex > oldIndex
        ? todolists[newIndex].id
        : newIndex === 0
        ? null
        : todolists[newIndex - 1].id;

    reorderTodolist({
      todolistId: active.id as string,
      putAfterItemId,
    });
  };
  const createTodolistHandler = async (title: string) => {
    const result: any = await createTodolist(title).unwrap();
    if (result.resultCode !== 0) {
      toast.error(result.messages?.[0] || 'Произошла ошибка');
    }
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      modifiers={[restrictToFirstScrollableAncestor, restrictToWindowEdges]}>
      <div className="flex items-center w-[350px] p-2">
        <CreateItemForm disabled={isCreating} create={createTodolistHandler} />
      </div>
      <div className="flex flex-wrap gap-3">
        <TodolistsContainer todolists={transformedTodolists} isLoading={isFetching} />
      </div>
    </DndContext>
  );
}
