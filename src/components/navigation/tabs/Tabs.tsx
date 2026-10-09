import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../../lib/utils';

export type TabsVariant = 'underline' | 'pill' | 'segmented';
export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsOrientation = 'horizontal' | 'vertical';

interface TabsContextValue {
  variant?: TabsVariant;
  size?: TabsSize;
  orientation?: TabsOrientation;
}

const TabsContext = React.createContext<TabsContextValue>({
  variant: 'underline',
  size: 'md',
  orientation: 'horizontal'
});

export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: TabsVariant;
  size?: TabsSize;
}

export const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(
  (
    {
      className,
      variant = 'underline',
      size = 'md',
      orientation = 'horizontal',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <TabsContext.Provider value={{ variant, size, orientation }}>
        <TabsPrimitive.Root
          ref={ref}
          orientation={orientation}
          className={cn(
            'box-border',
            orientation === 'vertical'
              ? 'flex flex-col sm:flex-row gap-0 bg-alcspower-surface rounded-2xl border border-alcspower-border overflow-hidden shadow-xs'
              : 'flex flex-col gap-0',
            className
          )}
          {...props}
        >
          {children}
        </TabsPrimitive.Root>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = TabsPrimitive.Root.displayName;

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  variant?: TabsVariant;
  size?: TabsSize;
}

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant: listVariant, size: listSize, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  const activeVariant = listVariant || context.variant || 'underline';
  const activeSize = listSize || context.size || 'md';
  const orientation = context.orientation || 'horizontal';

  return (
    <TabsContext.Provider value={{ ...context, variant: activeVariant, size: activeSize }}>
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          'box-border select-none transition-all',
          // Horizontal underline
          orientation === 'horizontal' &&
            activeVariant === 'underline' &&
            'flex items-center gap-0 border-b-2 border-slate-200 dark:border-slate-800 p-0 bg-transparent rounded-none',
          // Horizontal pill
          orientation === 'horizontal' &&
            activeVariant === 'pill' &&
            'inline-flex items-center bg-slate-100 dark:bg-slate-800/90 rounded-xl p-1 border border-transparent dark:border-slate-700/50 gap-1 shadow-2xs',
          // Horizontal segmented
          orientation === 'horizontal' &&
            activeVariant === 'segmented' &&
            'inline-flex items-center bg-slate-100 dark:bg-slate-800/90 rounded-xl p-1 border border-slate-200 dark:border-slate-700/80 gap-0.5 shadow-2xs',
          // Vertical
          orientation === 'vertical' &&
            'flex flex-col gap-1 p-2 bg-slate-50 dark:bg-slate-900/80 border-r border-slate-200 dark:border-slate-800 min-w-[200px] h-auto shrink-0',
          className
        )}
        {...props}
      />
    </TabsContext.Provider>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  /** Icono izquierdo decorativo o contextual */
  icon?: React.ReactNode;
  /** Badge numérico o texto de contador */
  badge?: React.ReactNode;
  /** Variante de color del badge */
  badgeVariant?: 'default' | 'error' | 'info' | 'warning' | 'success';
  /** Muestra un dot circular de alerta / estado */
  dot?: boolean;
}

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(
  (
    {
      className,
      children,
      icon,
      badge,
      badgeVariant = 'default',
      dot = false,
      ...props
    },
    ref
  ) => {
    const {
      variant = 'underline',
      size = 'md',
      orientation = 'horizontal'
    } = React.useContext(TabsContext);

    return (
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          'group relative box-border inline-flex items-center justify-center font-medium whitespace-nowrap',
          'm-0 border-0 border-none outline-none appearance-none cursor-pointer select-none transition-all duration-200',
          'bg-transparent text-slate-600 dark:text-slate-400',
          'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-alcspower-primary/20',
          'disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed',

          // Tamaños de padding y texto
          size === 'sm' && 'px-3.5 py-2 text-[13px] gap-2',
          size === 'md' && 'px-5 py-3 text-sm gap-2',
          size === 'lg' && 'px-6 py-4 text-[15px] gap-2.5',

          // UNDERLINE (Horizontal)
          orientation === 'horizontal' &&
            variant === 'underline' && [
              'rounded-none bg-transparent hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-800/40',
              'data-[state=active]:text-alcspower-primary dark:data-[state=active]:text-blue-400 data-[state=active]:font-semibold',
              'data-[state=active]:after:content-[""] data-[state=active]:after:absolute data-[state=active]:after:bottom-[-2px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-alcspower-primary dark:data-[state=active]:after:bg-blue-400 data-[state=active]:after:rounded-none'
            ],

          // PILL (Horizontal)
          orientation === 'horizontal' &&
            variant === 'pill' && [
              'flex-1 rounded-lg bg-transparent text-slate-600 dark:text-slate-400',
              'hover:text-slate-900 dark:hover:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5',
              'data-[state=active]:bg-alcspower-primary data-[state=active]:text-white data-[state=active]:shadow-xs data-[state=active]:font-semibold'
            ],

          // SEGMENTED (Horizontal)
          orientation === 'horizontal' &&
            variant === 'segmented' && [
              'flex-1 rounded-lg bg-transparent text-slate-600 dark:text-slate-400',
              'hover:text-slate-900 dark:hover:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5',
              'data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white data-[state=active]:shadow-xs data-[state=active]:font-semibold',
              'dark:data-[state=active]:border dark:data-[state=active]:border-slate-700/60'
            ],

          // VERTICAL
          orientation === 'vertical' && [
            'w-full justify-start text-left rounded-lg relative bg-transparent text-slate-600 dark:text-slate-400',
            'hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100',
            'data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-alcspower-primary dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-xs data-[state=active]:font-semibold',
            'data-[state=active]:before:content-[""] data-[state=active]:before:absolute data-[state=active]:before:top-2 data-[state=active]:before:bottom-2 data-[state=active]:before:left-0 data-[state=active]:before:w-[3px] data-[state=active]:before:bg-alcspower-primary dark:data-[state=active]:before:bg-blue-400 data-[state=active]:before:rounded-r'
          ],

          className
        )}
        {...props}
      >
        {icon && (
          <span
            className={cn(
              'inline-flex shrink-0 items-center justify-center transition-colors',
              size === 'sm' && 'h-3.5 w-3.5 [&>svg]:h-3.5 [&>svg]:w-3.5',
              size === 'md' && 'h-4 w-4 [&>svg]:h-4 [&>svg]:w-4',
              size === 'lg' && 'h-4.5 w-4.5 [&>svg]:h-4.5 [&>svg]:w-4.5',
              variant === 'pill' && 'group-data-[state=active]:text-white'
            )}
          >
            {icon}
          </span>
        )}

        <span>{children}</span>

        {badge !== undefined && (
          <span
            className={cn(
              'inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 rounded-full text-[10px] font-bold leading-none shrink-0 transition-colors',
              badgeVariant === 'error' && 'bg-red-500 text-white',
              badgeVariant === 'info' && 'bg-alcspower-primary text-white',
              badgeVariant === 'warning' && 'bg-amber-500 text-white',
              badgeVariant === 'success' && 'bg-emerald-500 text-white',
              badgeVariant === 'default' && [
                'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
                variant === 'underline' &&
                  'group-data-[state=active]:bg-blue-50 group-data-[state=active]:text-alcspower-primary dark:group-data-[state=active]:bg-blue-950/80 dark:group-data-[state=active]:text-blue-300',
                variant === 'pill' &&
                  'group-data-[state=active]:bg-white/25 group-data-[state=active]:text-white',
                variant === 'segmented' &&
                  'group-data-[state=active]:bg-blue-50 group-data-[state=active]:text-alcspower-primary dark:group-data-[state=active]:bg-blue-950/80 dark:group-data-[state=active]:text-blue-300'
              ]
            )}
          >
            {badge}
          </span>
        )}

        {dot && (
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full bg-red-500 shrink-0 ml-1',
              variant === 'pill' && 'group-data-[state=active]:bg-white'
            )}
          />
        )}
      </TabsPrimitive.Trigger>
    );
  }
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => {
  const { orientation = 'horizontal' } = React.useContext(TabsContext);

  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        'outline-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-alcspower-primary/15 animate-in fade-in-50 duration-200',
        orientation === 'horizontal' ? 'pt-6' : 'flex-1 p-6 m-0',
        className
      )}
      {...props}
    />
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export interface TabsVerticalProps extends React.ComponentPropsWithoutRef<typeof Tabs> {
  listWidth?: string;
}

export const TabsVertical = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsVerticalProps
>(({ className, orientation = 'vertical', style, listWidth, ...props }, ref) => (
  <Tabs
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex flex-col sm:flex-row gap-0 bg-alcspower-surface rounded-2xl border border-alcspower-border overflow-hidden shadow-xs',
      className
    )}
    style={listWidth ? ({ ...style, width: '100%' } as React.CSSProperties) : style}
    {...props}
  />
));
TabsVertical.displayName = 'TabsVertical';

export { Tabs as default };
