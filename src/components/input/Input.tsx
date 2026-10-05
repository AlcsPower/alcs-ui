import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const inputVariants = cva(
  'flex w-full border bg-alcspower-surface text-alcspower-foreground transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-alcspower-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alcspower-ring focus-visible:ring-offset-2 ring-offset-alcspower-surface disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-alcspower-surface-muted',
  {
    variants: {
      size: {
        sm: 'h-8 px-2.5 py-1 text-xs rounded-alcspower-sm',
        md: 'h-10 px-3 py-2 text-sm rounded-alcspower-md',
        lg: 'h-12 px-4 py-3 text-base rounded-alcspower-md'
      },
      hasError: {
        true: 'border-alcspower-destructive focus-visible:ring-alcspower-destructive',
        false: 'border-alcspower-input hover:border-alcspower-border-subtle'
      }
    },
    defaultVariants: {
      size: 'md',
      hasError: false
    }
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Indica si el campo tiene error de validación */
  hasError?: boolean;
  /** Escala de tamaño del control */
  size?: 'sm' | 'md' | 'lg';
  /** Icono o elemento decorativo en el lado izquierdo */
  leftElement?: React.ReactNode;
  /** Icono o elemento interactivo/decorativo en el lado derecho */
  rightElement?: React.ReactNode;
  /** Clases CSS adicionales para el contenedor exterior */
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      size = 'md',
      hasError = false,
      leftElement,
      rightElement,
      disabled,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const leftPad =
      size === 'sm' ? 'pl-8' : size === 'lg' ? 'pl-11' : 'pl-10';
    const rightPad =
      size === 'sm' ? 'pr-8' : size === 'lg' ? 'pr-11' : 'pr-10';
    const leftPos =
      size === 'sm' ? 'left-2.5' : size === 'lg' ? 'left-3.5' : 'left-3';
    const rightPos =
      size === 'sm' ? 'right-2.5' : size === 'lg' ? 'right-3.5' : 'right-3';

    return (
      <div className={cn('relative flex items-center w-full', containerClassName)}>
        {leftElement && (
          <div
            className={cn(
              'absolute flex items-center pointer-events-none text-alcspower-muted-foreground',
              leftPos
            )}
          >
            {leftElement}
          </div>
        )}
        <input
          type={type}
          className={cn(
            inputVariants({ size, hasError }),
            leftElement && leftPad,
            rightElement && rightPad,
            className
          )}
          ref={ref}
          disabled={disabled}
          aria-invalid={hasError ? 'true' : undefined}
          {...props}
        />
        {rightElement && (
          <div
            className={cn(
              'absolute flex items-center text-alcspower-muted-foreground',
              rightPos
            )}
          >
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
