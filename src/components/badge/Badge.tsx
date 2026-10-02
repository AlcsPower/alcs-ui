import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-mific-ring focus:ring-offset-2 ring-offset-mific-surface select-none',
  {
    variants: {
      variant: {
        default:
          'bg-mific-primary text-mific-primary-foreground',
        secondary:
          'bg-mific-secondary text-mific-secondary-foreground border border-mific-border',
        success:
          'bg-mific-success-subtle text-mific-success border border-mific-success-border',
        warning:
          'bg-mific-warning-subtle text-mific-warning border border-mific-warning-border',
        destructive:
          'bg-mific-destructive-subtle text-mific-destructive border border-mific-destructive-border',
        danger:
          'bg-mific-destructive-subtle text-mific-destructive border border-mific-destructive-border',
        info:
          'bg-mific-info-subtle text-mific-info border border-mific-info-border',
        outline:
          'border border-mific-border text-mific-foreground bg-transparent'
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-xs'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
