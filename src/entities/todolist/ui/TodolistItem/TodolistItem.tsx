import React from 'react';
import { TodolistTitle } from './TodolistTitle/TodolistTitle';
import { CreateItemForm } from '@/shared/components/create-item-form';
import { Tasks } from './Tasks/Tasks';
import { FilterButtons } from './FilterButtons/FilterButtons';
import { useTranslations } from 'next-intl';
import { useCreateTaskMutation } from '../../api/task-api';
import { DomainTodolist } from '../../lib/types';
import toast from 'react-hot-toast';
import { DomainTask } from '../../api/tasksApi.types';

interface Props {
  todolist: DomainTodolist;
  dragHandleProps?: {
    attributes: React.HTMLAttributes<HTMLElement>;
    listeners?: React.DOMAttributes<HTMLElement>;
  };
}

export const TodolistItem = ({ todolist, dragHandleProps }: Props) => {
  const t = useTranslations('mainPage');
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const parseDate = (date: string) => {
    const newDate = date?.split('T')[0].split('-');
    return newDate ? newDate[2] + '.' + newDate[1] + '.' + newDate[0] : '';
  };
  const addTask = async (title: string) => {
    const result = (await createTask({
      todolistId: todolist.id,
      title,
    }).unwrap()) as DomainTask & { resultCode: number; messages: string[] };

    if (result?.resultCode !== 0) {
      toast.error(result.messages?.[0] || 'Произошла ошибка');
    }
  };
  return (
    <>
      <TodolistTitle todolist={todolist} dragHandleProps={dragHandleProps} />
      <CreateItemForm
        disabled={isLoading}
        create={(title) => addTask(title)}
        placeholder={t('createForm.createTask')}
      />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
      <div className="text-muted-foreground text-xs">
        {t('createDate')}
        {parseDate(todolist.addedDate)}
      </div>
    </>
  );
};
