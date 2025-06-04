'use client'
import { useDeleteTodolistMutation, useUpdateTodolistTitleMutation } from '@/entities/todolist/api/todolist-api'
import { Todolist } from '@/entities/todolist/api/todolistsApi.types'
import { EditableSpan } from '@/shared/components/editable-span'
import { Button } from '@/shared/components/ui'
import { GripHorizontal, X } from 'lucide-react'
import React from 'react'
type Props = {
  todolist: Todolist
  dragHandleProps?: {
    attributes: React.HTMLAttributes<HTMLElement>;
    listeners?: React.DOMAttributes<HTMLElement>;
  };
}
export const TodolistTitle = ({ todolist, dragHandleProps }: Props) => {
  const [deleteTodolist] = useDeleteTodolistMutation();
  const [updateTitle] = useUpdateTodolistTitleMutation();

  const handleDeleteTodolist = () => {
    deleteTodolist(todolist.id)
  }
  const handleUpdateTodolistTitle = (title: string) => {
    if (title === todolist.title) return
    updateTitle({ id: todolist.id, title })
  }
  return (
    <div className="flex items-center justify-between">
      <EditableSpan value={todolist.title} onChange={title => handleUpdateTodolistTitle(title)} />
      <div className='flex items-center gap-2'>
        <Button
          className='cursor-grab active:cursor-grabbing' onClick={handleDeleteTodolist}>
          <X />
        </Button>
        {dragHandleProps && (
          <Button
            {...dragHandleProps.listeners}
            {...dragHandleProps.attributes}
            className='cursor-grab active:cursor-grabbing'
            variant="ghost"
            size="icon"
          >
            <GripHorizontal size={16} />
          </Button>
        )}
      </div>
    </div>
  )
}
