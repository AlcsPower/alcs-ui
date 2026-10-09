import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { useFieldContext } from './FieldContext';

export interface FieldControlProps extends React.HTMLAttributes<HTMLElement> {
  /** Permite delegar en el control hijo (ej. Input, Textarea, SelectTrigger) */
  asChild?: boolean;
}

export const FieldControl = React.forwardRef<HTMLElement, FieldControlProps>(
  ({ asChild = true, children, ...props }, ref) => {
    const context = useFieldContext();

    const ariaInvalid: React.AriaAttributes['aria-invalid'] = context?.hasError
      ? 'true'
      : undefined;

    const injectedProps: Record<string, unknown> = context
      ? {
          id: context.controlId,
          hasError: context.hasError,
          disabled: context.disabled,
          required: context.required,
          size: context.size,
          'aria-describedby': context.describedBy,
          'aria-invalid': ariaInvalid
        }
      : {};

    if (asChild) {
      return (
        <Slot ref={ref as React.Ref<any>} {...injectedProps} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <div ref={ref as React.Ref<HTMLDivElement>} {...injectedProps} {...props}>
        {children}
      </div>
    );
  }
);

FieldControl.displayName = 'FieldControl';
