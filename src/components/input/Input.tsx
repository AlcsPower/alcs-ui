import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Indica si el campo tiene error de validación */
  hasError?: boolean;
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
      hasError = false,
      leftElement,
      rightElement,
      disabled,
      containerClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('relative flex items-center w-full', containerClassName)}>
        {leftElement && (
          <div className="absolute left-3 flex items-center pointer-events-none text-alcspower-muted-foreground">
            {leftElement}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border bg-alcspower-surface px-3 py-2 text-sm text-alcspower-foreground transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-alcspower-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alcspower-ring focus-visible:ring-offset-2 ring-offset-alcspower-surface disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-alcspower-surface-muted',
            hasError
              ? 'border-alcspower-destructive focus-visible:ring-alcspower-destructive'
              : 'border-alcspower-input hover:border-alcspower-border-subtle',
            leftElement && 'pl-10',
            rightElement && 'pr-10',
            className
          )}
          ref={ref}
          disabled={disabled}
          aria-invalid={hasError ? 'true' : undefined}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 flex items-center text-alcspower-muted-foreground">
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
