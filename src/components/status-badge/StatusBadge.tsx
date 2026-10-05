import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const statusBadgeVariants = cva(
  'inline-flex items-center gap-1.5 text-xs font-medium rounded-alcspower-full select-none',
  {
    variants: {
      status: {
        success: 'bg-alcspower-success-subtle text-alcspower-success border border-alcspower-success-border',
        warning: 'bg-alcspower-warning-subtle text-alcspower-warning border border-alcspower-warning-border',
        error:   'bg-alcspower-destructive-subtle text-alcspower-destructive border border-alcspower-destructive-border',
        info:    'bg-alcspower-info-subtle text-alcspower-info border border-alcspower-info-border',
        neutral: 'bg-alcspower-surface-muted text-alcspower-muted-foreground border border-alcspower-border',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
      }
    },
    defaultVariants: { status: 'neutral', size: 'md' }
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  /** Circular dot indicator before the label */
  dot?: boolean;
  /** Animated pulse on the dot (NOT active by default) */
  pulse?: boolean;
}

export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, status, size, dot, pulse, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(statusBadgeVariants({ status, size }), className)}
        {...props}
      >
        {dot && (
          <span className="relative flex h-1.5 w-1.5">
            {pulse && (
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75"
                aria-hidden="true"
              />
            )}
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current"
              aria-hidden="true"
            />
          </span>
        )}
        {children}
      </span>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';
