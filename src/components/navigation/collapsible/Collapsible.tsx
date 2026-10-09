import * as React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export type CollapsibleVariant = 'default' | 'bordered' | 'ghost';
export type CollapsibleSize = 'sm' | 'md' | 'lg';

interface CollapsibleContextValue {
  variant?: CollapsibleVariant;
  size?: CollapsibleSize;
  open?: boolean;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue>({
  variant: 'default',
  size: 'md'
});

export const collapsibleVariants = cva(
  'box-border transition-all duration-250 select-none data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-alcspower-surface border-[1.5px] border-alcspower-border rounded-xl shadow-2xs hover:border-alcspower-border-strong hover:shadow-xs data-[state=open]:border-alcspower-primary/40 data-[state=open]:shadow-[0_4px_16px_rgba(99,102,241,0.08)] overflow-hidden',
        bordered:
          'bg-alcspower-surface border-0 rounded-none shadow-none hover:bg-alcspower-surface-muted/40 data-[state=open]:bg-alcspower-primary/6',
        ghost:
          'bg-transparent border-0 border-b border-alcspower-border/70 rounded-none last:border-b-0 hover:bg-alcspower-surface-muted/40 hover:rounded-xl data-[state=open]:bg-alcspower-primary/6 data-[state=open]:rounded-xl data-[state=open]:border-transparent'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface CollapsibleProps
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> {
  variant?: CollapsibleVariant;
  size?: CollapsibleSize;
}

export const Collapsible = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  CollapsibleProps
>(({ className, variant = 'default', size = 'md', open, defaultOpen, onOpenChange, children, ...props }, ref) => {
  const [isOpenState, setIsOpenState] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : isOpenState;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setIsOpenState(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  return (
    <CollapsibleContext.Provider value={{ variant, size, open: currentOpen }}>
      <CollapsiblePrimitive.Root
        ref={ref}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={handleOpenChange}
        className={cn(collapsibleVariants({ variant }), className)}
        {...props}
      >
        {children}
      </CollapsiblePrimitive.Root>
    </CollapsibleContext.Provider>
  );
});
Collapsible.displayName = 'Collapsible';

export interface CollapsibleTriggerProps
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger> {
  /** Icono contextual en el lado izquierdo */
  icon?: React.ReactNode;
  /** Subtítulo descriptivo secundario */
  subtitle?: React.ReactNode;
  /** Texto del botón o función que recibe si está abierto */
  toggleText?: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  /** Oculta la flecha chevron */
  hideChevron?: boolean;
}

export const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  CollapsibleTriggerProps
>(
  (
    {
      className,
      children,
      icon,
      subtitle,
      toggleText,
      hideChevron = false,
      asChild,
      ...props
    },
    ref
  ) => {
    const { size, open } = React.useContext(CollapsibleContext);

    // Si el usuario pasa asChild explícitamente, delegamos a Radix sin envoltorio adicional
    if (asChild) {
      return (
        <CollapsiblePrimitive.CollapsibleTrigger
          ref={ref}
          asChild
          className={className}
          {...props}
        >
          {children}
        </CollapsiblePrimitive.CollapsibleTrigger>
      );
    }

    const renderedToggleText =
      typeof toggleText === 'function' ? toggleText(Boolean(open)) : toggleText;

    return (
      <CollapsiblePrimitive.CollapsibleTrigger
        ref={ref}
        className={cn(
          'group flex w-full flex-1 items-center gap-3 text-left m-0 border-0 border-none outline-none appearance-none transition-all duration-200 cursor-pointer disabled:cursor-not-allowed bg-transparent',
          'hover:bg-alcspower-surface-muted/40 data-[state=open]:bg-alcspower-primary/8 dark:data-[state=open]:bg-alcspower-primary/15 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-alcspower-primary/15',
          size === 'sm' && 'p-3 px-4',
          size === 'md' && 'p-4 px-5',
          size === 'lg' && 'p-5 px-6',
          className
        )}
        {...props}
      >
        {icon && (
          <div
            className={cn(
              'flex items-center justify-center shrink-0 rounded-lg bg-alcspower-surface-muted text-alcspower-muted-foreground transition-all duration-200',
              'group-data-[state=open]:bg-alcspower-primary group-data-[state=open]:text-white group-data-[state=open]:shadow-[0_2px_6px_rgba(99,102,241,0.3)]',
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

        {renderedToggleText && (
          <span className="text-[13px] font-medium text-alcspower-primary group-data-[state=open]:text-alcspower-primary shrink-0 transition-colors">
            {renderedToggleText}
          </span>
        )}

        {!hideChevron && (
          <ChevronDown
            className={cn(
              'shrink-0 text-alcspower-muted-foreground transition-transform duration-250 ease-out group-data-[state=open]:rotate-180 group-data-[state=open]:text-alcspower-primary',
              size === 'sm' && 'h-4 w-4',
              size === 'md' && 'h-5 w-5',
              size === 'lg' && 'h-5 w-5'
            )}
          />
        )}
      </CollapsiblePrimitive.CollapsibleTrigger>
    );
  }
);
CollapsibleTrigger.displayName = CollapsiblePrimitive.CollapsibleTrigger.displayName;

export interface CollapsibleContentProps
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent> {
  /** Desactiva el contenedor interno con borde y relleno por defecto */
  raw?: boolean;
}

export const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  CollapsibleContentProps
>(({ className, children, raw = false, ...props }, ref) => {
  const { size } = React.useContext(CollapsibleContext);

  return (
    <CollapsiblePrimitive.CollapsibleContent
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
      {...props}
    >
      {raw ? (
        children
      ) : (
        <div
          className={cn(
            'pt-0 leading-relaxed text-alcspower-muted-foreground',
            size === 'sm' && 'px-4 pb-4',
            size === 'md' && 'px-5 pb-5',
            size === 'lg' && 'px-6 pb-6',
            className
          )}
        >
          <div className="border-t border-alcspower-border-subtle/80 pt-4 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      )}
    </CollapsiblePrimitive.CollapsibleContent>
  );
});
CollapsibleContent.displayName = CollapsiblePrimitive.CollapsibleContent.displayName;

export interface CollapsibleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CollapsibleVariant;
  size?: CollapsibleSize;
}

export const CollapsibleGroup = React.forwardRef<HTMLDivElement, CollapsibleGroupProps>(
  ({ className, variant = 'bordered', size = 'md', children, ...props }, ref) => {
    return (
      <CollapsibleContext.Provider value={{ variant, size }}>
        <div
          ref={ref}
          className={cn(
            variant === 'bordered' &&
              'flex flex-col gap-0 border-[1.5px] border-alcspower-border rounded-xl overflow-hidden bg-alcspower-surface shadow-2xs divide-y divide-alcspower-border/60',
            variant === 'ghost' && 'flex flex-col gap-0 divide-y divide-alcspower-border/40',
            variant === 'default' && 'flex flex-col gap-2',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  }
);
CollapsibleGroup.displayName = 'CollapsibleGroup';

export { Collapsible as default };
