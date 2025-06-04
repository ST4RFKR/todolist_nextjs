import { useDeleteTaskMutation, useUpdateTaskMutation } from '@/entities/todolist/api/task-api';
import { DomainTask } from '@/entities/todolist/api/tasksApi.types';
import { Todolist } from '@/entities/todolist/api/todolistsApi.types';
import { EditableSpan } from '@/shared/components/editable-span';
import { Button } from '@/shared/components/ui';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { TaskStatus } from '@/shared/lib/enums';
import { X } from 'lucide-react';
import React from 'react';

interface Props {
  className?: string;
  task: DomainTask;
  todolist: Todolist;
}

export const TaskItem = ({ task, todolist }: Props) => {
  const [deleteTask, { isLoading }] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const isTaskCompleted = task.status === TaskStatus.Completed

  console.log(isTaskCompleted);


  const deleteTaskHandler = (taskId: string) => {
    deleteTask({ todolistId: todolist.id, taskId })
  }
  const updateTaskTitle = (title: string) => {
    const model = {
      title: title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline
    }
    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  }
  const updateTaskStatus = (checked: boolean | string) => {
    const status = checked === true ? TaskStatus.Completed : TaskStatus.New;

    const model = {
      title: task.title,
      description: task.description,
      completed: status === TaskStatus.Completed,
      status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline
    };

    updateTask({ taskId: task.id, todolistId: todolist.id, model });
  };


  return (

    <div className='flex items-center gap-2' key={task.id}>
      <Checkbox
        className='w-4 h-4'
        checked={isTaskCompleted}
        onCheckedChange={updateTaskStatus}
      />
      <EditableSpan value={task.title} onChange={title => updateTaskTitle(title)} />
      <Button onClick={() => deleteTaskHandler(task.id)} disabled={isLoading} size='icon'><X /></Button>
    </div>

  );
};