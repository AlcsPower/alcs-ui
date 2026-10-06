import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors outline-none select-none cursor-pointer hover:bg-alcspower-surface-muted hover:text-alcspower-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alcspower-ring focus-visible:ring-offset-2 ring-offset-alcspower-surface disabled:pointer-events-none disabled:opacity-45 data-[state=on]:bg-alcspower-primary/10 data-[state=on]:text-alcspower-primary',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-alcspower-border bg-transparent hover:bg-alcspower-surface-muted hover:text-alcspower-foreground data-[state=on]:border-alcspower-primary/40 data-[state=on]:bg-alcspower-primary/10',
      },
      size: {
        sm: 'h-8 px-2.5 text-xs gap-1.5',
        md: 'h-10 px-3.5 text-sm gap-2',
        lg: 'h-12 px-5 text-base gap-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {}

export const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;
