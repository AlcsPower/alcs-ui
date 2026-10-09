import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Progress } from '../../feedback/progress';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: React.ReactNode;
  progress?: {
    value: number;
    max?: number;
    variant?: 'default' | 'success' | 'warning' | 'destructive' | 'info';
    showLabel?: boolean;
  };
  description?: string;
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      label,
      value,
      icon: Icon,
      badge,
      progress,
      description,
      className,
      ...props
    },
    ref
  ) => {
    const progressPercent = progress
      ? Math.min(
          100,
          Math.max(0, Math.round((progress.value / (progress.max || 100)) * 100))
        )
      : null;

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col justify-between rounded-alcspower-md border border-alcspower-border bg-alcspower-surface p-4 shadow-sm',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-alcspower-muted-foreground truncate">
            {label}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {badge}
            {Icon && (
              <Icon className="h-4 w-4 text-alcspower-muted-foreground" aria-hidden="true" />
            )}
          </div>
        </div>

        <div className="mt-2 flex items-baseline justify-between gap-2">
          <div className="font-mono text-xl font-bold tracking-tight text-alcspower-foreground">
            {value}
          </div>
          {progress && progress.showLabel && (
            <span className="font-mono text-xs text-alcspower-muted-foreground">
              {progressPercent}%
            </span>
          )}
        </div>

        {progress && (
          <div className="mt-2.5">
            <Progress
              value={progressPercent}
              size="sm"
              variant={progress.variant || 'default'}
              aria-label={`Progreso de ${label}`}
            />
          </div>
        )}

        {description && (
          <p className="mt-2 text-[11px] text-alcspower-muted-foreground leading-normal">
            {description}
          </p>
        )}
      </div>
    );
  }
);

StatCard.displayName = 'StatCard';
