import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';

export const checkboxVariants = cva(
  'group peer inline-flex shrink-0 p-0 items-center justify-center border-[1.5px] bg-alcspower-surface transition-all duration-150 outline-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-alcspower-primary/20 focus-visible:border-alcspower-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-alcspower-surface-muted data-[state=checked]:bg-alcspower-primary data-[state=checked]:border-alcspower-primary data-[state=checked]:text-alcspower-primary-foreground data-[state=indeterminate]:bg-alcspower-primary data-[state=indeterminate]:border-alcspower-primary data-[state=indeterminate]:text-alcspower-primary-foreground active:scale-95 shadow-2xs',
  {
    variants: {
      size: {
        sm: 'h-3.5 w-3.5 rounded-[3px]',
        md: 'h-4 w-4 rounded-[4px]',
        lg: 'h-5 w-5 rounded-[5px]'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'size'>,
    VariantProps<typeof checkboxVariants> {
  size?: 'sm' | 'md' | 'lg';
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size = 'md', ...props }, ref) => {
  const iconClass =
    size === 'sm'
      ? 'h-2.5 w-2.5 stroke-[3]'
      : size === 'lg'
      ? 'h-3.5 w-3.5 stroke-[3]'
      : 'h-3 w-3 stroke-[3]';

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        checkboxVariants({ size }),
        'border-alcspower-border hover:border-alcspower-border-subtle hover:shadow-xs',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex h-full w-full items-center justify-center text-current')}
      >
        <Check className={cn(iconClass, 'group-data-[state=indeterminate]:hidden')} />
        <Minus className={cn(iconClass, 'hidden group-data-[state=indeterminate]:block')} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;
