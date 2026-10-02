import * as React from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      icon,
      title,
      description,
      action,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex min-h-[320px] flex-col items-center justify-center rounded-lg border border-dashed border-alcspower-border p-8 text-center animate-in fade-in-50 bg-alcspower-surface',
          className
        )}
        {...props}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-alcspower-surface-muted text-alcspower-muted-foreground mb-4">
          {icon || <Inbox className="h-6 w-6 stroke-[1.5]" aria-hidden="true" />}
        </div>
        <h4 className="text-base font-semibold text-alcspower-foreground">
          {title}
        </h4>
        {description && (
          <p className="mt-1 text-sm text-alcspower-muted-foreground max-w-sm mb-4">
            {description}
          </p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
