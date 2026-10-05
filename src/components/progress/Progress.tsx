import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const progressTrackVariants = cva(
  'relative w-full overflow-hidden rounded-alcspower-full bg-alcspower-surface-muted',
  {
    variants: {
      size: {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4',
      }
    },
    defaultVariants: { size: 'md' }
  }
);

const progressIndicatorVariants = cva(
  'h-full w-full flex-1 rounded-alcspower-full transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default:     'bg-alcspower-primary',
        success:     'bg-alcspower-success',
        warning:     'bg-alcspower-warning',
        destructive: 'bg-alcspower-destructive',
        info:        'bg-alcspower-info',
      }
    },
    defaultVariants: { variant: 'default' }
  }
);

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressTrackVariants>,
    VariantProps<typeof progressIndicatorVariants> {
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom label formatter */
  formatLabel?: (value: number) => string;
}

export const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value,
      variant,
      size,
      showLabel,
      formatLabel,
      ...props
    },
    ref
  ) => {
    const isIndeterminate = value === undefined || value === null;
    const clampedValue = isIndeterminate
      ? 0
      : Math.min(100, Math.max(0, value));

    const label = showLabel && !isIndeterminate
      ? (formatLabel ? formatLabel(clampedValue) : `${clampedValue}%`)
      : null;

    return (
      <div className="flex items-center gap-2 w-full">
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(progressTrackVariants({ size }), className)}
          value={isIndeterminate ? undefined : clampedValue}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(
              progressIndicatorVariants({ variant }),
              isIndeterminate && 'animate-progress-indeterminate'
            )}
            style={
              isIndeterminate
                ? undefined
                : { transform: `translateX(-${100 - clampedValue}%)` }
            }
          />
        </ProgressPrimitive.Root>
        {label && (
          <span
            className="text-xs font-medium text-alcspower-muted-foreground tabular-nums min-w-[3ch] text-right"
            aria-hidden="true"
          >
            {label}
          </span>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';
