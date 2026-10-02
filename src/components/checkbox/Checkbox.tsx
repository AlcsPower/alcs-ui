import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-mific-border bg-mific-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mific-ring focus-visible:ring-offset-2 ring-offset-mific-surface disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-mific-primary data-[state=checked]:border-mific-primary data-[state=checked]:text-mific-primary-foreground data-[state=indeterminate]:bg-mific-primary data-[state=indeterminate]:border-mific-primary data-[state=indeterminate]:text-mific-primary-foreground transition-colors',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      {props.checked === 'indeterminate' ? (
        <Minus className="h-3 w-3 stroke-[3]" />
      ) : (
        <Check className="h-3 w-3 stroke-[3]" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;
