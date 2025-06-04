'use client';

import { cn } from '@/shared/lib/utils';
import { ReactElement } from 'react';


export type SpinnerProps = {
  fullScreen?: boolean;
  size?: number;
};

export const Spinner = ({
  fullScreen = false,
  size = 48,
}: SpinnerProps): ReactElement => {
  const style = {
    height: size,
    width: size,
  };

  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center',
        fullScreen && 'h-screen'
      )}
    >
      <span
        className="border-primary box-border inline-block animate-spin rounded-full border-t-3 border-r-3 border-r-transparent"
        style={style}
      />
    </div>
  );
};