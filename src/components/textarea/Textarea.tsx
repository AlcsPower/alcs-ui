import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const textareaVariants = cva(
  'box-border flex w-full font-normal bg-alcspower-surface text-alcspower-foreground transition-all duration-150 outline-none border-[1.5px] shadow-2xs placeholder:text-alcspower-muted-foreground placeholder:font-normal focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-alcspower-surface-muted disabled:shadow-none read-only:bg-alcspower-surface-subtle read-only:cursor-default',
  {
    variants: {
      size: {
        sm: 'min-h-[64px] px-3 py-2 text-xs rounded-lg',
        md: 'min-h-[80px] px-3.5 py-2.5 text-sm rounded-xl',
        lg: 'min-h-[110px] px-4 py-3 text-base rounded-xl'
      },
      hasError: {
        true: 'border-alcspower-destructive bg-alcspower-destructive/5 text-alcspower-foreground focus:border-alcspower-destructive focus:ring-3 focus:ring-alcspower-destructive/15',
        false: 'border-alcspower-border hover:border-alcspower-border-subtle hover:shadow-xs focus:border-alcspower-primary focus:ring-3 focus:ring-alcspower-primary/15'
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
