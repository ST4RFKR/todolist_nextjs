import { Skeleton } from '@/shared/components/ui/skeleton';
import React from 'react';

interface Props {
  className?: string;
}

export const TodolistSkeleton = ({ className }: Props) => {
  return (
    <div className={className}>
      <Skeleton className="h-[300px] w-[350px] rounded-xl" />
    </div>
  );
};