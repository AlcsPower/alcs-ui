import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../lib/utils';

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'box-border inline-flex h-10 items-center justify-center rounded-xl bg-alcspower-surface-muted/70 border border-alcspower-border/50 p-1 text-alcspower-muted-foreground shadow-2xs',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'box-border inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-150 ease-out hover:text-alcspower-foreground hover:bg-alcspower-surface/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-alcspower-primary/15 disabled:pointer-events-none disabled:opacity-50 cursor-pointer data-[state=active]:bg-alcspower-surface data-[state=active]:text-alcspower-foreground data-[state=active]:shadow-xs data-[state=active]:font-semibold',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-3 outline-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-alcspower-primary/15 rounded-xl animate-in fade-in-50 duration-150',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
