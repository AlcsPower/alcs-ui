import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Efecto de animación: 'shine' (shimmer brillante dinámico en loop), 'pulse' (parpadeo clásico) o 'none' */
  animation?: 'shine' | 'pulse' | 'none';
  /** Desactiva o activa el efecto brillante shimmer. Si es false equivale a animation="none". */
  shine?: boolean;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, animation = 'shine', shine = true, ...props }, ref) => {
    const isShine = animation === 'shine' && shine !== false;
    const isPulse = animation === 'pulse';
    const isNone = animation === 'none' || shine === false;

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          'rounded-md bg-alcspower-surface-muted motion-reduce:animate-none',
          isShine && 'skeleton relative overflow-hidden',
          isPulse && 'animate-pulse',
          isNone && 'no-shine',
          className
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
