import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export type AccordionVariant = 'default' | 'bordered' | 'ghost';
export type AccordionSize = 'sm' | 'md' | 'lg';

interface AccordionContextValue {
  variant?: AccordionVariant;
  size?: AccordionSize;
}

const AccordionContext = React.createContext<AccordionContextValue>({
  variant: 'default',
  size: 'md'
});

export const accordionVariants = cva('box-border w-full transition-all', {
  variants: {
    variant: {
      default: 'flex flex-col gap-2.5',
      bordered:
        'flex flex-col gap-0 border-[1.5px] border-alcspower-border rounded-xl overflow-hidden bg-alcspower-surface shadow-2xs divide-y divide-alcspower-border/50',
      ghost: 'flex flex-col gap-1'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

export type AccordionProps = (
  | AccordionPrimitive.AccordionSingleProps
  | AccordionPrimitive.AccordionMultipleProps
) & {
  variant?: AccordionVariant;
  size?: AccordionSize;
  className?: string;
};

export const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
  return (
    <AccordionContext.Provider value={{ variant, size }}>
      <AccordionPrimitive.Root
        ref={ref}
        className={cn(accordionVariants({ variant }), className)}
        {...(props as any)}
      >
        {children}
      </AccordionPrimitive.Root>
    </AccordionContext.Provider>
  );
});
Accordion.displayName = 'Accordion';

export const accordionItemVariants = cva(
  'box-border overflow-hidden transition-all duration-200 select-none data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-alcspower-surface border-[1.5px] border-alcspower-border rounded-xl shadow-2xs hover:border-alcspower-border-subtle hover:shadow-xs data-[state=open]:border-alcspower-primary/30 data-[state=open]:shadow-xs',
        bordered:
          'bg-transparent border-0 rounded-none hover:bg-alcspower-surface-muted/30 data-[state=open]:bg-alcspower-primary/5',
        ghost:
          'bg-transparent border-b border-alcspower-border/60 rounded-none hover:bg-alcspower-surface-muted/30 hover:rounded-xl data-[state=open]:bg-alcspower-primary/5 data-[state=open]:rounded-xl data-[state=open]:border-transparent'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  variant?: AccordionVariant;
}

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant: itemVariant, ...props }, ref) => {
  const context = React.useContext(AccordionContext);
  const activeVariant = itemVariant || context.variant || 'default';

  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(accordionItemVariants({ variant: activeVariant }), className)}
      {...props}
    />
  );
});
AccordionItem.displayName = 'AccordionItem';

export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  /** Icono o elemento decorativo en el lado izquierdo */
  icon?: React.ReactNode;
  /** Subtítulo o texto descriptivo secundario */
  subtitle?: React.ReactNode;
  /** Badge o etiqueta de estado */
  badge?: React.ReactNode;
  /** Oculta el icono de chevron */
  hideChevron?: boolean;
}

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(
  (
    {
      className,
      children,
      icon,
      subtitle,
      badge,
      hideChevron = false,
      ...props
    },
    ref
  ) => {
    const { size } = React.useContext(AccordionContext);

    return (
      <AccordionPrimitive.Header className="flex w-full">
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(
            'group flex w-full flex-1 items-center gap-3 text-left outline-none transition-all duration-200 cursor-pointer disabled:cursor-not-allowed',
            'hover:bg-alcspower-surface-muted/30 data-[state=open]:bg-alcspower-primary/5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-alcspower-primary/15',
            size === 'sm' && 'p-3 sm:px-4 sm:py-3',
            size === 'md' && 'p-4 sm:px-5 sm:py-4',
            size === 'lg' && 'p-5 sm:px-6 sm:py-5',
            className
          )}
          {...props}
        >
          {icon && (
            <div
              className={cn(
                'flex items-center justify-center shrink-0 rounded-lg bg-alcspower-surface-muted text-alcspower-muted-foreground transition-all duration-200',
                'group-data-[state=open]:bg-alcspower-primary group-data-[state=open]:text-white group-data-[state=open]:shadow-xs group-data-[state=open]:shadow-alcspower-primary/30',
                size === 'sm' && 'h-7 w-7 [&>svg]:h-3.5 [&>svg]:w-3.5',
                size === 'md' && 'h-8 w-8 [&>svg]:h-4 [&>svg]:w-4',
                size === 'lg' && 'h-9 w-9 [&>svg]:h-4.5 [&>svg]:w-4.5'
              )}
            >
              {icon}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div
              className={cn(
                'font-semibold text-alcspower-foreground transition-colors group-data-[state=open]:text-alcspower-primary leading-snug',
                size === 'sm' && 'text-xs',
                size === 'md' && 'text-sm',
                size === 'lg' && 'text-base'
              )}
            >
              {children}
            </div>
            {subtitle && (
              <div
                className={cn(
                  'font-normal text-alcspower-muted-foreground mt-0.5 truncate',
                  size === 'sm' && 'text-[11px]',
                  size === 'md' && 'text-xs',
                  size === 'lg' && 'text-sm'
                )}
              >
                {subtitle}
              </div>
            )}
          </div>

          {badge && (
            <span
              className={cn(
                'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold shrink-0 transition-colors',
                'bg-alcspower-surface-muted text-alcspower-muted-foreground group-data-[state=open]:bg-alcspower-primary group-data-[state=open]:text-white'
              )}
            >
              {badge}
            </span>
          )}

          {!hideChevron && (
            <ChevronDown
              className={cn(
                'h-5 w-5 shrink-0 text-alcspower-muted-foreground transition-transform duration-300 ease-out group-data-[state=open]:rotate-180 group-data-[state=open]:text-alcspower-primary',
                size === 'sm' && 'h-4 w-4',
                size === 'lg' && 'h-5 w-5'
              )}
            />
          )}
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    );
  }
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { size } = React.useContext(AccordionContext);

  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div
        className={cn(
          'pt-0 leading-relaxed text-alcspower-muted-foreground',
          size === 'sm' && 'px-4 pb-4',
          size === 'md' && 'px-5 pb-5',
          size === 'lg' && 'px-6 pb-6',
          className
        )}
      >
        <div className="border-t border-alcspower-border/50 pt-4">
          {children}
        </div>
      </div>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion as default };
