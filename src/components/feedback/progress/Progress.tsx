import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const progressTrackVariants = cva(
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

export const progressIndicatorVariants = cva(
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
  /**
   * Valor del progreso entre 0 y 100.
   * Omitir este valor o pasar `undefined` / `null` activa automáticamente el estado indeterminado animado.
   */
  value?: number | null;
  /** Muestra etiqueta de porcentaje textual junto a la barra */
  showLabel?: boolean;
  /** Función personalizada para formatear el texto del porcentaje */
  formatLabel?: (value: number) => string;
  /**
   * Aplica un suave efecto de brillo dinámico (shimmer/shine) sobre el indicador de progreso.
   * @default true
   */
  shiny?: boolean;
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
      shiny = true,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const labelId = `progress-label-${generatedId}`;

    const isIndeterminate = value === undefined || value === null;
    const clampedValue = isIndeterminate
      ? 0
      : Math.min(100, Math.max(0, value));

    const label = showLabel && !isIndeterminate
      ? (formatLabel ? formatLabel(clampedValue) : `${clampedValue}%`)
      : null;

    const resolvedAriaLabelledBy = ariaLabelledBy || (label && !ariaLabel ? labelId : undefined);
    const resolvedAriaLabel = ariaLabel || (!resolvedAriaLabelledBy ? 'Progreso' : undefined);

    return (
      <div className="flex items-center gap-2 w-full">
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(progressTrackVariants({ size }), className)}
          value={isIndeterminate ? undefined : clampedValue}
          aria-label={resolvedAriaLabel}
          aria-labelledby={resolvedAriaLabelledBy}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(
              progressIndicatorVariants({ variant }),
              isIndeterminate
                ? 'animate-progress-indeterminate'
                : (shiny && 'progress-shiny relative overflow-hidden')
            )}
            style={
              isIndeterminate
                ? undefined
                : { width: `${clampedValue}%` }
            }
          />
        </ProgressPrimitive.Root>
        {label && (
          <span
            id={labelId}
            className="text-xs font-medium text-alcspower-muted-foreground tabular-nums min-w-[3ch] text-right"
          >
            {label}
          </span>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';
