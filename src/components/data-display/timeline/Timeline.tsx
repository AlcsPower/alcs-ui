import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

// ==========================================
// Tipos y Contexto de Timeline
// ==========================================

export type TimelineStatus =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

export type TimelineOrientation = 'vertical' | 'horizontal';
export type TimelineDensity = 'compact' | 'normal' | 'comfortable';
export type TimelineShape = 'circle' | 'squircle';
export type TimelineSize = 'sm' | 'md' | 'lg';
export type TimelineVariant = 'default' | 'alternate';
export type TimelineIndicatorVariant = 'solid' | 'subtle' | 'outline' | 'dot';
export type TimelineConnectorVariant = 'solid' | 'dashed' | 'dotted';

interface TimelineContextValue {
  orientation: TimelineOrientation;
  density: TimelineDensity;
  shape: TimelineShape;
  size: TimelineSize;
  variant: TimelineVariant;
}

const TimelineContext = React.createContext<TimelineContextValue>({
  orientation: 'vertical',
  density: 'normal',
  shape: 'circle',
  size: 'md',
  variant: 'default',
});

export function useTimelineContext() {
  return React.useContext(TimelineContext);
}

interface TimelineItemContextValue {
  status: TimelineStatus;
  isLast?: boolean;
}

const TimelineItemContext = React.createContext<TimelineItemContextValue>({
  status: 'default',
  isLast: false,
});

export function useTimelineItemContext() {
  return React.useContext(TimelineItemContext);
}

// ==========================================
// Variantes CVA
// ==========================================

export const timelineVariants = cva('relative w-full list-none p-0 m-0', {
  variants: {
    orientation: {
      vertical: 'flex flex-col',
      horizontal: 'flex flex-row items-start justify-between',
    },
    density: {
      compact: 'space-y-4',
      normal: 'space-y-6',
      comfortable: 'space-y-8',
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      density: 'compact',
      className: 'space-y-0 gap-4',
    },
    {
      orientation: 'horizontal',
      density: 'normal',
      className: 'space-y-0 gap-6',
    },
    {
      orientation: 'horizontal',
      density: 'comfortable',
      className: 'space-y-0 gap-8',
    },
  ],
  defaultVariants: {
    orientation: 'vertical',
    density: 'normal',
  },
});

export const timelineIndicatorVariants = cva(
  'relative flex items-center justify-center select-none shrink-0 transition-all duration-200 z-10',
  {
    variants: {
      status: {
        default:
          'bg-alcspower-surface border-alcspower-border text-alcspower-foreground',
        primary:
          'bg-alcspower-primary/10 border-alcspower-primary text-alcspower-primary ring-4 ring-alcspower-primary/15',
        success:
          'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 ring-4 ring-emerald-500/15',
        warning:
          'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400 ring-4 ring-amber-500/15',
        error:
          'bg-alcspower-destructive/10 border-alcspower-destructive text-alcspower-destructive ring-4 ring-alcspower-destructive/15',
        info:
          'bg-sky-500/10 border-sky-500 text-sky-600 dark:text-sky-400 ring-4 ring-sky-500/15',
        neutral:
          'bg-alcspower-surface-muted border-alcspower-border-subtle text-alcspower-muted-foreground',
      },
      variant: {
        solid: 'border-transparent text-white',
        subtle: 'border',
        outline: 'border-2 bg-alcspower-surface',
        dot: 'border-0',
      },
      shape: {
        circle: 'rounded-full',
        squircle: 'rounded-xl',
      },
      size: {
        sm: 'h-7 w-7 text-xs font-semibold',
        md: 'h-9 w-9 text-sm font-semibold',
        lg: 'h-11 w-11 text-base font-semibold',
      },
    },
    compoundVariants: [
      // Solid variants
      {
        variant: 'solid',
        status: 'default',
        className: 'bg-alcspower-foreground text-alcspower-background',
      },
      {
        variant: 'solid',
        status: 'primary',
        className: 'bg-alcspower-primary text-alcspower-primary-foreground ring-4 ring-alcspower-primary/20',
      },
      {
        variant: 'solid',
        status: 'success',
        className: 'bg-emerald-500 text-white ring-4 ring-emerald-500/20',
      },
      {
        variant: 'solid',
        status: 'warning',
        className: 'bg-amber-500 text-white ring-4 ring-amber-500/20',
      },
      {
        variant: 'solid',
        status: 'error',
        className: 'bg-alcspower-destructive text-white ring-4 ring-alcspower-destructive/20',
      },
      {
        variant: 'solid',
        status: 'info',
        className: 'bg-sky-500 text-white ring-4 ring-sky-500/20',
      },
      {
        variant: 'solid',
        status: 'neutral',
        className: 'bg-alcspower-muted-foreground text-alcspower-background',
      },

      // Dot variants
      {
        variant: 'dot',
        size: 'sm',
        className: 'h-2.5 w-2.5 min-w-[0.625rem] ring-2 ring-alcspower-background',
      },
      {
        variant: 'dot',
        size: 'md',
        className: 'h-3.5 w-3.5 min-w-[0.875rem] ring-3 ring-alcspower-background',
      },
      {
        variant: 'dot',
        size: 'lg',
        className: 'h-4.5 w-4.5 min-w-[1.125rem] ring-4 ring-alcspower-background',
      },
      {
        variant: 'dot',
        status: 'primary',
        className: 'bg-alcspower-primary',
      },
      {
        variant: 'dot',
        status: 'success',
        className: 'bg-emerald-500',
      },
      {
        variant: 'dot',
        status: 'warning',
        className: 'bg-amber-500',
      },
      {
        variant: 'dot',
        status: 'error',
        className: 'bg-alcspower-destructive',
      },
      {
        variant: 'dot',
        status: 'info',
        className: 'bg-sky-500',
      },
      {
        variant: 'dot',
        status: 'neutral',
        className: 'bg-alcspower-muted-foreground',
      },
      {
        variant: 'dot',
        status: 'default',
        className: 'bg-alcspower-border-strong',
      },
    ],
    defaultVariants: {
      status: 'default',
      variant: 'subtle',
      shape: 'circle',
      size: 'md',
    },
  }
);

const STATUS_CONNECTOR_COLORS: Record<TimelineStatus, string> = {
  default: 'var(--alcspower-border, #cbd5e1)',
  primary: 'var(--alcspower-primary, #2563eb)',
  success: '#10b981',
  warning: '#f59e0b',
  error: 'var(--alcspower-destructive, #dc2626)',
  info: '#0284c7',
  neutral: 'var(--alcspower-border-subtle, #cbd5e1)',
};

export const timelineConnectorVariants = cva(
  'transition-colors duration-200 pointer-events-none shrink-0',
  {
    variants: {
      status: {
        default: '',
        primary: '',
        success: '',
        warning: '',
        error: '',
        info: '',
        neutral: '',
      },
      variant: {
        solid: '',
        dashed: '',
        dotted: '',
      },
      orientation: {
        vertical: 'grow my-1.5 min-h-[1.5rem]',
        horizontal: 'grow mx-1.5 min-w-[1.5rem]',
      },
    },
    compoundVariants: [
      {
        orientation: 'vertical',
        variant: 'solid',
        className: 'w-[2px] bg-[var(--connector-color,var(--alcspower-border,#cbd5e1))]',
      },
      {
        orientation: 'horizontal',
        variant: 'solid',
        className: 'h-[2px] bg-[var(--connector-color,var(--alcspower-border,#cbd5e1))]',
      },
      {
        orientation: 'vertical',
        variant: 'dashed',
        className: 'connector--dashed',
      },
      {
        orientation: 'vertical',
        variant: 'dotted',
        className: 'connector--dotted',
      },
      {
        orientation: 'horizontal',
        variant: 'dashed',
        className: 'connector--dashed-horizontal',
      },
      {
        orientation: 'horizontal',
        variant: 'dotted',
        className: 'connector--dotted-horizontal',
      },
    ],
    defaultVariants: {
      status: 'default',
      variant: 'solid',
      orientation: 'vertical',
    },
  }
);

// ==========================================
// Interfaces y Componentes
// ==========================================

export interface TimelineItemData {
  id?: string | number;
  title: React.ReactNode;
  description?: React.ReactNode;
  time?: React.ReactNode;
  dateTime?: string;
  status?: TimelineStatus;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  avatar?: React.ReactNode;
  card?: React.ReactNode;
  children?: React.ReactNode;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  as?: 'ol' | 'ul';
  orientation?: TimelineOrientation;
  density?: TimelineDensity;
  shape?: TimelineShape;
  size?: TimelineSize;
  variant?: TimelineVariant;
  items?: TimelineItemData[];
  ariaLabel?: string;
  reverse?: boolean;
}

/**
 * Contenedor raíz semántico para listas cronológicas de eventos, auditoría y trazabilidad.
 */
export const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  (
    {
      as: Component = 'ol',
      orientation = 'vertical',
      density = 'normal',
      shape = 'circle',
      size = 'md',
      variant = 'default',
      items,
      ariaLabel = 'Línea de tiempo',
      reverse = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const contextValue = React.useMemo<TimelineContextValue>(
      () => ({
        orientation,
        density,
        shape,
        size,
        variant,
      }),
      [orientation, density, shape, size, variant]
    );

    const renderedItems = React.useMemo(() => {
      if (!items) return null;
      const list = reverse ? [...items].reverse() : items;
      return list.map((item, index) => {
        const isLast = index === list.length - 1;
        return (
          <TimelineItem
            key={item.id ?? index}
            status={item.status}
            isLast={isLast}
          >
            <TimelineSeparator>
              <TimelineIndicator
                status={item.status}
                icon={item.icon}
              >
                {item.avatar}
              </TimelineIndicator>
              {!isLast && <TimelineConnector status={item.status} />}
            </TimelineSeparator>
            <TimelineContent>
              <TimelineHeader>
                <div className="flex items-center gap-2 flex-wrap">
                  <TimelineTitle>{item.title}</TimelineTitle>
                  {item.badge}
                </div>
                {item.time && (
                  <TimelineTime dateTime={item.dateTime}>
                    {item.time}
                  </TimelineTime>
                )}
              </TimelineHeader>
              {item.description && (
                <TimelineDescription>{item.description}</TimelineDescription>
              )}
              {item.card && <TimelineCard>{item.card}</TimelineCard>}
              {item.children}
            </TimelineContent>
          </TimelineItem>
        );
      });
    }, [items, reverse]);

    return (
      <TimelineContext.Provider value={contextValue}>
        <Component
          ref={ref}
          role="list"
          aria-label={ariaLabel}
          className={cn(
            timelineVariants({ orientation, density }),
            className
          )}
          {...props}
        >
          {items ? renderedItems : children}
        </Component>
      </TimelineContext.Provider>
    );
  }
);
Timeline.displayName = 'Timeline';

// ==========================================
// TimelineItem
// ==========================================

export interface TimelineItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  status?: TimelineStatus;
  align?: 'start' | 'end';
  isLast?: boolean;
}

export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  (
    {
      status = 'default',
      align = 'start',
      isLast = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { orientation, variant } = useTimelineContext();

    const itemContextValue = React.useMemo<TimelineItemContextValue>(
      () => ({ status, isLast }),
      [status, isLast]
    );

    const isAlternate = variant === 'alternate' && orientation === 'vertical';

    return (
      <TimelineItemContext.Provider value={itemContextValue}>
        <li
          ref={ref}
          role="listitem"
          className={cn(
            'group relative flex',
            orientation === 'vertical' ? 'w-full gap-4' : 'flex-col items-center flex-1',
            isAlternate && (align === 'end' ? 'flex-row-reverse text-right' : 'flex-row text-left'),
            className
          )}
          {...props}
        >
          {children}
        </li>
      </TimelineItemContext.Provider>
    );
  }
);
TimelineItem.displayName = 'TimelineItem';

// ==========================================
// TimelineSeparator
// ==========================================

export interface TimelineSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TimelineSeparator = React.forwardRef<HTMLDivElement, TimelineSeparatorProps>(
  ({ className, children, ...props }, ref) => {
    const { orientation } = useTimelineContext();

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          'relative flex items-center shrink-0 self-stretch',
          orientation === 'vertical' ? 'flex-col' : 'flex-row w-full justify-center',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineSeparator.displayName = 'TimelineSeparator';

// ==========================================
// TimelineIndicator
// ==========================================

export interface TimelineIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineIndicatorVariants> {
  icon?: React.ReactNode;
}

export const TimelineIndicator = React.forwardRef<HTMLDivElement, TimelineIndicatorProps>(
  (
    {
      status: explicitStatus,
      variant: explicitVariant,
      shape: explicitShape,
      size: explicitSize,
      icon,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { shape: contextShape, size: contextSize } = useTimelineContext();
    const { status: itemStatus } = useTimelineItemContext();

    const finalStatus = explicitStatus ?? itemStatus ?? 'default';
    const finalShape = explicitShape ?? contextShape ?? 'circle';
    const finalSize = explicitSize ?? contextSize ?? 'md';

    return (
      <div
        ref={ref}
        className={cn(
          timelineIndicatorVariants({
            status: finalStatus,
            variant: explicitVariant,
            shape: finalShape,
            size: finalSize,
          }),
          className
        )}
        {...props}
      >
        {children ? (
          children
        ) : icon ? (
          <span className="flex items-center justify-center shrink-0">{icon}</span>
        ) : null}
      </div>
    );
  }
);
TimelineIndicator.displayName = 'TimelineIndicator';

// ==========================================
// TimelineConnector
// ==========================================

export interface TimelineConnectorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineConnectorVariants> {
  color?: string;
}

export const TimelineConnector = React.forwardRef<HTMLDivElement, TimelineConnectorProps>(
  (
    {
      status: explicitStatus,
      variant = 'solid',
      orientation: explicitOrientation,
      color,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const { orientation: contextOrientation } = useTimelineContext();
    const { status: itemStatus } = useTimelineItemContext();

    const finalOrientation = explicitOrientation ?? contextOrientation ?? 'vertical';
    const finalStatus = explicitStatus ?? itemStatus ?? 'default';
    const connectorColor = color ?? STATUS_CONNECTOR_COLORS[finalStatus];

    return (
      <div
        ref={ref}
        aria-hidden="true"
        style={{ '--connector-color': connectorColor, ...style } as React.CSSProperties}
        className={cn(
          timelineConnectorVariants({
            status: finalStatus,
            variant,
            orientation: finalOrientation,
          }),
          className
        )}
        {...props}
      />
    );
  }
);
TimelineConnector.displayName = 'TimelineConnector';

// ==========================================
// TimelineContent
// ==========================================

export interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, children, ...props }, ref) => {
    const { orientation } = useTimelineContext();

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col min-w-0 flex-1',
          orientation === 'vertical' ? 'pt-0.5 pb-6 last:pb-0' : 'pt-3 text-center items-center',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineContent.displayName = 'TimelineContent';

// ==========================================
// TimelineHeader
// ==========================================

export interface TimelineHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TimelineHeader = React.forwardRef<HTMLDivElement, TimelineHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 w-full',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineHeader.displayName = 'TimelineHeader';

// ==========================================
// TimelineTitle
// ==========================================

export interface TimelineTitleProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'h3' | 'h4' | 'h5' | 'div' | 'span';
}

export const TimelineTitle = React.forwardRef<HTMLElement, TimelineTitleProps>(
  ({ as: Component = 'h4', className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref as React.Ref<HTMLHeadingElement>}
        className={cn(
          'text-sm font-semibold tracking-tight text-alcspower-foreground',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
TimelineTitle.displayName = 'TimelineTitle';

// ==========================================
// TimelineTime
// ==========================================

export interface TimelineTimeProps extends React.TimeHTMLAttributes<HTMLTimeElement> {}

export const TimelineTime = React.forwardRef<HTMLTimeElement, TimelineTimeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <time
        ref={ref}
        className={cn(
          'font-mono text-xs text-alcspower-muted-foreground whitespace-nowrap tabular-nums',
          className
        )}
        {...props}
      >
        {children}
      </time>
    );
  }
);
TimelineTime.displayName = 'TimelineTime';

// ==========================================
// TimelineDescription
// ==========================================

export interface TimelineDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const TimelineDescription = React.forwardRef<HTMLParagraphElement, TimelineDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          'text-xs text-alcspower-muted-foreground leading-relaxed mt-1',
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);
TimelineDescription.displayName = 'TimelineDescription';

// ==========================================
// TimelineCard
// ==========================================

export interface TimelineCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TimelineCard = React.forwardRef<HTMLDivElement, TimelineCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mt-2.5 rounded-xl border border-alcspower-border bg-alcspower-surface p-3.5 shadow-2xs text-xs text-alcspower-foreground',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineCard.displayName = 'TimelineCard';
