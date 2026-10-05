import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const inputVariants = cva(
  'flex w-full font-medium bg-alcspower-surface text-alcspower-foreground transition-all duration-200 outline-none border-[1.5px] shadow-xs file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-alcspower-muted-foreground placeholder:font-normal focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:bg-alcspower-surface-muted disabled:text-alcspower-muted-foreground disabled:shadow-none read-only:bg-alcspower-surface-subtle read-only:cursor-default',
  {
    variants: {
      size: {
        sm: 'h-8 px-3 py-1 text-xs rounded-sm',
        md: 'h-10 px-3.5 py-2 text-sm rounded-md',
        lg: 'h-12 px-4 py-2.5 text-base rounded-lg'
      },
      hasError: {
        true: 'border-alcspower-destructive bg-red-50/40 dark:bg-red-950/20 focus:border-alcspower-destructive focus:ring-alcspower-destructive/15',
        false: 'border-alcspower-border hover:border-alcspower-border-subtle hover:shadow-sm focus:border-alcspower-primary focus:ring-alcspower-primary/15'
      },
      hasSuccess: {
        true: 'border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 focus:border-emerald-600 focus:ring-emerald-600/15',
        false: ''
      }
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
      hasSuccess: false
    }
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Indica si el campo tiene error de validación */
  hasError?: boolean;
  /** Indica si el campo es válido (estado de éxito) */
  hasSuccess?: boolean;
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
      hasSuccess = false,
      leftElement,
      rightElement,
      disabled,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const leftPad =
      size === 'sm' ? 'pl-9' : size === 'lg' ? 'pl-12' : 'pl-10';
    const rightPad =
      size === 'sm' ? 'pr-9' : size === 'lg' ? 'pr-12' : 'pr-10';
    const leftPos =
      size === 'sm' ? 'left-2.5' : size === 'lg' ? 'left-4' : 'left-3';
    const rightPos =
      size === 'sm' ? 'right-2.5' : size === 'lg' ? 'right-4' : 'right-3';

    return (
      <div
        className={cn(
          'relative flex items-center w-full group transition-colors',
          hasError && 'has-error text-alcspower-destructive',
          hasSuccess && 'has-success text-emerald-600',
          containerClassName
        )}
      >
        {leftElement && (
          <div
            className={cn(
              'absolute flex items-center pointer-events-none transition-colors text-alcspower-muted-foreground group-focus-within:text-alcspower-primary',
              hasError && 'group-focus-within:text-alcspower-destructive text-alcspower-destructive',
              hasSuccess && 'group-focus-within:text-emerald-600 text-emerald-600',
              leftPos
            )}
          >
            {leftElement}
          </div>
        )}
        <input
          type={type}
          className={cn(
            inputVariants({ size, hasError, hasSuccess: !hasError && hasSuccess }),
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
              'absolute flex items-center transition-colors text-alcspower-muted-foreground group-focus-within:text-alcspower-primary',
              hasError && 'group-focus-within:text-alcspower-destructive text-alcspower-destructive',
              hasSuccess && 'group-focus-within:text-emerald-600 text-emerald-600',
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
