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
          'flex min-h-[80px] w-full rounded-md border bg-alcspower-surface px-3 py-2 text-sm text-alcspower-foreground transition-colors placeholder:text-alcspower-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alcspower-ring focus-visible:ring-offset-2 ring-offset-alcspower-surface disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-alcspower-surface-muted',
          hasError
            ? 'border-alcspower-destructive focus-visible:ring-alcspower-destructive'
            : 'border-alcspower-input hover:border-alcspower-border-subtle',
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
