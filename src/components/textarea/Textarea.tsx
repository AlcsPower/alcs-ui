import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const textareaVariants = cva(
  'flex w-full border bg-alcspower-surface text-alcspower-foreground transition-colors placeholder:text-alcspower-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alcspower-ring focus-visible:ring-offset-2 ring-offset-alcspower-surface disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-alcspower-surface-muted',
  {
    variants: {
      size: {
        sm: 'min-h-[64px] px-2.5 py-1.5 text-xs rounded-alcspower-sm',
        md: 'min-h-[80px] px-3 py-2 text-sm rounded-alcspower-md',
        lg: 'min-h-[110px] px-4 py-3 text-base rounded-alcspower-md'
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

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  /** Indica si el campo tiene error de validación */
  hasError?: boolean;
  /** Escala de tamaño del área de texto */
  size?: 'sm' | 'md' | 'lg';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size = 'md', hasError = false, disabled, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ size, hasError }), className)}
        ref={ref}
        disabled={disabled}
        aria-invalid={hasError ? 'true' : undefined}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
