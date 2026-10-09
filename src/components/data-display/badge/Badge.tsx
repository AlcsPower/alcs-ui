import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const badgeVariants = cva(
  'box-border inline-flex items-center rounded-full font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-alcspower-primary/15 select-none shadow-2xs',
  {
    variants: {
      variant: {
        /** @deprecated Alias para 'primary'. Utilice 'primary' en su lugar. */
        default:
          'bg-alcspower-primary text-alcspower-primary-foreground border border-transparent shadow-xs',
        primary:
          'bg-alcspower-primary text-alcspower-primary-foreground border border-transparent shadow-xs',
        secondary:
          'bg-alcspower-secondary text-alcspower-secondary-foreground border border-alcspower-border hover:bg-alcspower-secondary-hover',
        success:
          'bg-alcspower-success-subtle text-alcspower-success border border-alcspower-success-border',
        warning:
          'bg-alcspower-warning-subtle text-alcspower-warning border border-alcspower-warning-border',
        destructive:
          'bg-alcspower-destructive-subtle text-alcspower-destructive border border-alcspower-destructive-border',
        /** @deprecated Alias para 'destructive'. Utilice 'destructive' en su lugar. */
        danger:
          'bg-alcspower-destructive-subtle text-alcspower-destructive border border-alcspower-destructive-border',
        info:
          'bg-alcspower-info-subtle text-alcspower-info border border-alcspower-info-border',
        outline:
          'border border-alcspower-border text-alcspower-foreground bg-transparent hover:bg-alcspower-surface-muted'
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
