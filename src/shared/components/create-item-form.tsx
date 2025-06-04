'use client';
import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui';
import { Plus } from 'lucide-react';

type Props = {
  placeholder?: string
  create: (title: string) => void
  disabled?: boolean
}


export const CreateItemForm = ({ placeholder, create, disabled }: Props) => {
  const [title, setTitle] = React.useState('')
  const createNewItem = (title: string) => {
    const trimmedTitle = title.trim()
    if (trimmedTitle !== '') {
      create(trimmedTitle)
      setTitle('')
    } else {
      alert('Title is required')
    }
  }
  return (
    <div className="flex items-center gap-2 w-full">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={placeholder} />
      <Button disabled={disabled} onClick={() => createNewItem(title)}><Plus /></Button>
    </div>
  );
};