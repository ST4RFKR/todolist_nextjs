'use client';
import { useCreateTodolistMutation } from '@/entities/todolist/api/todolist-api';
import { Todolist } from '@/entities/todolist/ui/Todolist';
import { CreateItemForm } from '@/shared/components/create-item-form';
import { DndContext } from '@dnd-kit/core';
import { useTranslations } from 'next-intl';


export default function HomePage() {
  const t = useTranslations("mainPage");
  const [createTodolist, { isLoading }] = useCreateTodolistMutation();

  return (
    <DndContext>
      <div className='flex items-center w-[350px] p-2'>
        <CreateItemForm disabled={isLoading} create={title => createTodolist(title)} placeholder={t("createForm.createTodolist")} />
      </div>
      <Todolist />
    </DndContext>);
}
