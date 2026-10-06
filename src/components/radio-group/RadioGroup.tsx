import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  /** Marca el grupo de radio con estado de error visual */
  hasError?: boolean;
}

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, hasError = false, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2.5', className)}
      aria-invalid={hasError ? true : undefined}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  /** Marca la opción individual con estado de error visual */
  hasError?: boolean;
}

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, hasError = false, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-4.5 w-4.5 rounded-full border border-alcspower-border bg-alcspower-surface text-alcspower-primary shadow-2xs transition-all duration-150 outline-none select-none cursor-pointer',
        'hover:border-alcspower-border-strong',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alcspower-ring focus-visible:ring-offset-2 ring-offset-alcspower-surface',
        'data-[state=checked]:border-alcspower-primary',
        'disabled:cursor-not-allowed disabled:opacity-45 disabled:border-alcspower-border',
        hasError && 'border-alcspower-destructive focus-visible:ring-alcspower-destructive',
        className
      )}
      aria-invalid={hasError ? true : undefined}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-alcspower-primary text-alcspower-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
