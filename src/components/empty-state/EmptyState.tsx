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
          'box-border flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-alcspower-border/80 bg-alcspower-surface-muted/20 p-8 sm:p-12 text-center animate-in fade-in-50 shadow-2xs transition-colors',
          className
        )}
        {...props}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-alcspower-surface ring-8 ring-alcspower-surface-muted/40 text-alcspower-foreground mb-4 shadow-2xs">
          {icon || <Inbox className="h-6 w-6 stroke-[1.75]" aria-hidden="true" />}
        </div>
        <h4 className="text-base sm:text-lg font-semibold tracking-tight text-alcspower-foreground">
          {title}
        </h4>
        {description && (
          <p className="mt-1.5 text-sm text-alcspower-muted-foreground max-w-sm mb-4 leading-relaxed">
            {description}
          </p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
