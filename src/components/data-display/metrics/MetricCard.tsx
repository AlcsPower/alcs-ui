import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Skeleton } from '../../feedback/skeleton';
import { DeltaIndicator, type DeltaIndicatorProps } from './DeltaIndicator';

export const metricCardVariants = cva(
  'box-border relative flex flex-col justify-between rounded-xl border border-alcspower-border bg-alcspower-surface p-5 transition-all duration-200 shadow-2xs',
  {
    variants: {
      variant: {
        default: 'hover:shadow-xs hover:border-alcspower-border-subtle',
        outline: 'border-alcspower-border-subtle shadow-none hover:border-alcspower-border',
        flat: 'bg-alcspower-surface-muted/40 border-transparent shadow-none'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface MetricCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricCardVariants> {
  title: string;
  value?: React.ReactNode;
  delta?: {
    value: number | string;
    type?: 'increase' | 'decrease' | 'neutral';
    label?: string;
    isPositiveGood?: boolean;
    size?: DeltaIndicatorProps['size'];
  };
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  isLoading?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}

export const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  (
    {
      title,
      value,
      delta,
      description,
      icon: Icon,
      action,
      headingLevel: Heading = 'h3',
      isLoading = false,
      hasError = false,
      errorMessage = 'Error al cargar métrica',
      variant,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <article
        ref={ref}
        className={cn(metricCardVariants({ variant }), className)}
        {...props}
      >
        <header className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <Heading className="text-[11px] font-bold uppercase tracking-wider text-alcspower-muted-foreground">
              {title}
            </Heading>
          </div>

          <div className="flex items-center gap-2">
            {action && <div>{action}</div>}
            {Icon && (
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-alcspower-surface-muted/70 border border-alcspower-border/40 text-alcspower-muted-foreground">
                <Icon className="h-4 w-4" />
              </div>
            )}
          </div>
        </header>

        <div className="mt-3">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-28 rounded-alcspower-sm" />
              {delta && <Skeleton className="h-4 w-20 rounded-alcspower-sm" />}
            </div>
          ) : hasError ? (
            <div className="flex items-center gap-2 text-xs text-alcspower-destructive py-1.5">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{errorMessage}</span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="font-mono text-2xl font-bold tracking-tight text-alcspower-foreground">
                {value}
              </div>

              {(delta || description) && (
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {delta && (
                    <DeltaIndicator
                      value={delta.value}
                      type={delta.type}
                      isPositiveGood={delta.isPositiveGood}
                      size={delta.size || 'sm'}
                    />
                  )}
                  {delta?.label && (
                    <span className="text-alcspower-muted-foreground">
                      {delta.label}
                    </span>
                  )}
                  {description && !delta?.label && (
                    <span className="text-alcspower-muted-foreground">
                      {description}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {children && <div className="mt-4">{children}</div>}
      </article>
    );
  }
);

MetricCard.displayName = 'MetricCard';
