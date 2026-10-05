import * as React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ErrorStateProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}

export const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    {
      className,
      icon,
      title,
      description,
      action,
      secondaryAction,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'flex min-h-[320px] flex-col items-center justify-center rounded-lg border border-dashed border-alcspower-destructive-border bg-alcspower-destructive-subtle/30 p-8 text-center animate-in fade-in-50',
          className
        )}
        {...props}
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-alcspower-destructive-subtle text-alcspower-destructive">
          {icon || <AlertCircle className="h-6 w-6 stroke-[1.5]" aria-hidden="true" />}
        </div>
        <h4 className="text-base font-semibold text-alcspower-foreground">
          {title}
        </h4>
        {description && (
          <p className="mt-1 text-sm text-alcspower-muted-foreground max-w-sm mb-4">
            {description}
          </p>
        )}
        {(action || secondaryAction) && (
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            {action}
            {secondaryAction}
          </div>
        )}
      </div>
    );
  }
);

ErrorState.displayName = 'ErrorState';
