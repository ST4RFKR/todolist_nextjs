'use client';
import React from 'react';
import { useGetTodolistsQuery } from '../api/todolist-api';
import { Card } from '@/shared/components/ui/card';
import { TodolistItem } from './TodolistItem/TodolistItem';
type Todolist = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
  filter: string;
  entityStatus: string;
}
export const Todolist = () => {

  const { data: todolists } = useGetTodolistsQuery();

  return (
    <div className='flex items-center flex-wrap gap-3 px-2'>
      {todolists?.map((todolist: Todolist) => (
        <Card key={todolist.id} className='my-2 p-3 w-[350px]'>
          <TodolistItem todolist={todolist} />
        </Card>
      ))}
    </div>
  );
};


