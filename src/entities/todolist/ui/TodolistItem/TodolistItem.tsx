import React from 'react';
import { TodolistTitle } from './TodolistTitle/TodolistTitle';
import { CreateItemForm } from '@/shared/components/create-item-form';
import { Tasks } from './Tasks/Tasks';
import { FilterButtons } from './FilterButtons/FilterButtons';
import { useTranslations } from 'next-intl';
import { useCreateTaskMutation } from '../../api/task-api';
import { Todolist } from '../../api/todolistsApi.types';

interface Props {
  todolist: Todolist
}

export const TodolistItem = ({ todolist }: Props) => {
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
      <TodolistTitle todolist={todolist} />
      <CreateItemForm disabled={isLoading} create={title => addTask(title)} placeholder={t("createForm.createTask")} />
      <Tasks todolist={todolist} />
      <FilterButtons />
    </>
  );
};