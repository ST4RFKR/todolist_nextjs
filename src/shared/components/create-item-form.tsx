'use client';
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = {
  placeholder?: string;
  create: (title: string) => void;
  disabled?: boolean;
};

export const CreateItemForm = ({ placeholder, create, disabled }: Props) => {
  const [title, setTitle] = React.useState('');
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('mainPage');

  const createNewItem = (title: string) => {
    const trimmedTitle = title.trim();
    if (trimmedTitle !== '') {
      create(trimmedTitle);
      setTitle('');
    } else {
      setError(t('fieldRequired'));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    if (error) {
      setError(null);
    }
  };

  return (
    <div className="flex flex-col w-full gap-1">
      <div className="flex items-center gap-2 w-full">
        <div className="flex-1 relative">
          <Input
            value={title}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full"
          />
          {error && <div className="absolute -bottom-5 left-0 text-red-500 text-xs">{error}</div>}
        </div>
        <Button
          disabled={disabled}
          onClick={() => createNewItem(title)}
          size="icon"
          className="h-10 w-10">
          <Plus size={16} />
        </Button>
      </div>
    </div>
  );
};
