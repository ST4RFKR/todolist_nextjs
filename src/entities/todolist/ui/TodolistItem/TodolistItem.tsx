import React from 'react';
import { TodolistTitle } from './TodolistTitle/TodolistTitle';
import { CreateItemForm } from '@/shared/components/create-item-form';
import { Tasks } from './Tasks/Tasks';
import { FilterButtons } from './FilterButtons/FilterButtons';
import { useTranslations } from 'next-intl';
import { useCreateTaskMutation } from '../../api/task-api';
import { DomainTodolist } from '../../lib/types';

interface Props {
  todolist: DomainTodolist,
  dragHandleProps?: {
    attributes: React.HTMLAttributes<HTMLElement>;
    listeners?: React.DOMAttributes<HTMLElement>;
  };
}

export const TodolistItem = ({ todolist, dragHandleProps }: Props) => {
  const t = useTranslations('mainPage');
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const addTask = (title: string) => {
    createTask({
      todolistId: todolist.id,
      title
    })
  }
  return (
    <>
      <TodolistTitle todolist={todolist} dragHandleProps={dragHandleProps} />
      <CreateItemForm disabled={isLoading} create={title => addTask(title)} placeholder={t("createForm.createTask")} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </>
  );
};