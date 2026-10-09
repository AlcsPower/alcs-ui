import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const spinnerVariants = cva(
  'animate-spin text-current motion-reduce:!animate-none',
  {
    variants: {
      size: {
        xs: 'h-3.5 w-3.5',
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
        xl: 'h-8 w-8'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

export type SpinnerVariantType = 'classic' | 'ring' | 'dots' | 'bars' | 'pulse' | 'dual-ring';
export type SpinnerColorType = 'primary' | 'success' | 'warning' | 'error' | 'destructive' | 'info' | 'gray' | 'white' | 'current';

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof spinnerVariants> {
  /** Estilo de visualización del spinner: classic, ring, dots, bars, pulse o dual-ring */
  variant?: SpinnerVariantType;
  /** Color semántico del spinner */
  color?: SpinnerColorType;
  /** Texto para accesibilidad / lectores de pantalla */
  label?: string;
  /** Si es true, muestra el texto label visiblemente junto al spinner */
  showLabel?: boolean;
  /** Si es true, marca el componente como aria-hidden para ocultarlo de lectores de pantalla */
  'aria-hidden'?: boolean | 'true' | 'false';
}

const colorMap: Record<SpinnerColorType, string> = {
  primary: 'text-alcspower-primary',
  success: 'text-emerald-600 dark:text-emerald-400',
  warning: 'text-amber-500 dark:text-amber-400',
  error: 'text-alcspower-destructive',
  destructive: 'text-alcspower-destructive',
  info: 'text-blue-600 dark:text-blue-400',
  gray: 'text-alcspower-muted-foreground',
  white: 'text-white',
  current: 'text-current'
};

export const Spinner = React.forwardRef<HTMLElement, SpinnerProps>(
  (
    {
      className,
      size = 'md',
      variant = 'classic',
      color = 'current',
      label = 'Cargando...',
      showLabel = false,
      'aria-hidden': ariaHidden,
      ...props
    },
    ref
  ) => {
    const isHidden = ariaHidden === true || ariaHidden === 'true';
    const colorClass = colorMap[color] || 'text-current';

    const renderSpinnerGraphic = () => {
      switch (variant) {
        case 'ring':
          return <span className={cn('spinner-ring', size, colorClass, className)} />;
        case 'dots':
          return (
            <span className={cn('spinner-dots', size, colorClass, className)}>
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </span>
          );
        case 'bars':
          return (
            <span className={cn('spinner-bars', size, colorClass, className)}>
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </span>
          );
        case 'pulse':
          return <span className={cn('spinner-pulse', size, colorClass, className)} />;
        case 'dual-ring':
          return <span className={cn('spinner-dual-ring', size, colorClass, className)} />;
        case 'classic':
        default:
          return (
            <svg
              className={cn(spinnerVariants({ size }), 'spinner-classic', colorClass, className)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          );
      }
    };

    if (isHidden) {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={cn('spinner inline-flex items-center justify-center', colorClass)}
          aria-hidden="true"
          {...props}
        >
          {renderSpinnerGraphic()}
        </span>
      );
    }

    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={cn('spinner inline-flex items-center justify-center', showLabel && 'gap-2.5', colorClass)}
        role="status"
        aria-live="polite"
        {...props}
      >
        {renderSpinnerGraphic()}
        {showLabel ? (
          <span className="text-sm font-medium text-alcspower-foreground">{label}</span>
        ) : (
          <span className="sr-only">{label}</span>
        )}
      </span>
    );
  }
);

Spinner.displayName = 'Spinner';
