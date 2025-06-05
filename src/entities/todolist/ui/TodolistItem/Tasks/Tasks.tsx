import { useGetTaskQuery } from '@/entities/todolist/api/task-api';
import React from 'react';
import { TaskItem } from './TaskItem/TaskItem';
import { TaskItemSkeleton } from './TaskItemSkeleton';
import { TaskStatus } from '@/shared/lib/enums';
import { DomainTodolist } from '@/entities/todolist/lib/types';
import { useTranslations } from 'next-intl';

export const Tasks = ({ todolist }: { todolist: DomainTodolist }) => {
  const { id, filter } = todolist;
  const { data, isLoading } = useGetTaskQuery(id);
  const t = useTranslations('mainPage');

  let filteredTasks = data?.items || [];

  if (filter === 'active') {
    filteredTasks = filteredTasks.filter((task) => task.status === TaskStatus.New);
  }
  if (filter === 'completed') {
    filteredTasks = filteredTasks.filter((task) => task.status === TaskStatus.Completed);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(3)].map((_, index) => (
          <TaskItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => <TaskItem key={task.id} task={task} todolist={todolist} />)
      ) : (
        <div className="text-center text-gray-500">{t('noTasks')}</div>
      )}
    </div>
  );
};
