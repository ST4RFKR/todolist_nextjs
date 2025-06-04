import { useGetTaskQuery } from '@/entities/todolist/api/task-api';

import React from 'react';
import { TaskItem } from './TaskItem/TaskItem';
import { Todolist } from '@/entities/todolist/api/todolistsApi.types';



export const Tasks = ({ todolist }: { todolist: Todolist }) => {
  const { id } = todolist;

  const { data } = useGetTaskQuery(id);

  return (
    <div className='flex flex-col gap-4'>
      {data?.items.map((task) => {
        return (
          <TaskItem key={task.id} task={task} todolist={todolist} />
        )
      })}
    </div>
  );
};