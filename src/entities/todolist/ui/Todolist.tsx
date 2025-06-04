'use client';
import React from 'react';
import { useGetTodolistsQuery } from '../api/todolist-api';
import { Card } from '@/shared/components/ui/card';
import { TodolistItem } from './TodolistItem/TodolistItem';
import { TodolistSkeleton } from './TodolistSkeleton';
import { DomainTodolist } from '../lib/types';

export const Todolist = () => {

  const { data: todolists, isLoading } = useGetTodolistsQuery();
  const todolistSkeletonData = [...Array(4).fill(null)]
  console.log(todolistSkeletonData);


  return (
    <div className='flex items-center flex-wrap gap-3 px-2'>
      {isLoading
        ? [...Array(4).fill(null)].map((_, index) => (<TodolistSkeleton key={index} />
        ))
        : todolists?.map((todolist: DomainTodolist) => (
          <Card key={todolist.id} className='my-2 p-3 w-[350px]'>
            <TodolistItem todolist={todolist} />
          </Card>
        ))}
    </div>
  );
};


