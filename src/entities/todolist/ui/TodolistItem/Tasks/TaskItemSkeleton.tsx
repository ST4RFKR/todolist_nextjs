import { Skeleton } from '@/shared/components/ui/skeleton';
import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
  className?: string;
}

export const TaskItemSkeleton = ({ className }: Props) => {
  return (
    <div className={cn('flex items-center flex-wrap gap-3', className)}>
      <Skeleton className="h-[18px] w-[18px] rounded-[4px]" />
      <Skeleton className="h-[20px] w-[200px] rounded-[4px]" />
      <Skeleton className="h-[26px] w-[26px] rounded-[4px]" />
    </div>
  );
};