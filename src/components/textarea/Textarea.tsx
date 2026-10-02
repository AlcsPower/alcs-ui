import * as React from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError = false, disabled, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border bg-mific-surface px-3 py-2 text-sm text-mific-foreground transition-colors placeholder:text-mific-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mific-ring focus-visible:ring-offset-2 ring-offset-mific-surface disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-mific-surface-muted',
          hasError
            ? 'border-mific-destructive focus-visible:ring-mific-destructive'
            : 'border-mific-input hover:border-mific-border-subtle',
          className
        )}
        ref={ref}
        disabled={disabled}
        aria-invalid={hasError ? 'true' : undefined}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
