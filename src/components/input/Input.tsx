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
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', hasError = false, leftElement, rightElement, disabled, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {leftElement && (
          <div className="absolute left-3 flex items-center pointer-events-none text-mific-muted-foreground">
            {leftElement}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border bg-mific-surface px-3 py-2 text-sm text-mific-foreground transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-mific-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mific-ring focus-visible:ring-offset-2 ring-offset-mific-surface disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-mific-surface-muted',
            hasError
              ? 'border-mific-destructive focus-visible:ring-mific-destructive'
              : 'border-mific-input hover:border-mific-border-subtle',
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
          <div className="absolute right-3 flex items-center text-mific-muted-foreground">
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
