import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  /** Densidad o tamaño compacto ideal para popovers y datepickers */
  compact?: boolean;
};

export const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  locale = es,
  compact = false,
  ...props
}: CalendarProps) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={locale}
      className={cn(
        compact
          ? 'p-2.5 bg-alcspower-surface rounded-xl border border-alcspower-border shadow-xs inline-block'
          : 'p-4 bg-alcspower-surface rounded-2xl border border-alcspower-border shadow-sm inline-block',
        className
      )}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: compact ? 'space-y-2' : 'space-y-4',
        month_caption: compact
          ? 'flex justify-center pt-0 relative items-center mb-2'
          : 'flex justify-center pt-1 relative items-center mb-3',
        caption_label: compact
          ? 'text-sm font-bold text-alcspower-foreground capitalize tracking-tight'
          : 'text-base font-bold text-alcspower-foreground capitalize tracking-tight',
        nav: 'space-x-1 flex items-center',
        button_previous: cn(
          compact
            ? 'absolute left-0.5 top-0 h-7 w-7 bg-alcspower-surface-muted/60 p-0 text-alcspower-muted-foreground hover:text-alcspower-foreground'
            : 'absolute left-1 top-0 h-8 w-8 bg-alcspower-surface-muted/60 p-0 text-alcspower-muted-foreground hover:text-alcspower-foreground',
          compact ? 'rounded-md' : 'rounded-lg',
          'inline-flex items-center justify-center border-0 cursor-pointer outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-alcspower-ring',
          'hover:bg-alcspower-surface-muted transition-all active:scale-95 disabled:opacity-30'
        ),
        button_next: cn(
          compact
            ? 'absolute right-0.5 top-0 h-7 w-7 bg-alcspower-surface-muted/60 p-0 text-alcspower-muted-foreground hover:text-alcspower-foreground'
            : 'absolute right-1 top-0 h-8 w-8 bg-alcspower-surface-muted/60 p-0 text-alcspower-muted-foreground hover:text-alcspower-foreground',
          compact ? 'rounded-md' : 'rounded-lg',
          'inline-flex items-center justify-center border-0 cursor-pointer outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-alcspower-ring',
          'hover:bg-alcspower-surface-muted transition-all active:scale-95 disabled:opacity-30'
        ),
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday: cn(
          'text-alcspower-muted-foreground/80 font-bold text-center uppercase tracking-wider',
          compact ? 'w-8 text-[10px] py-1' : 'w-9 text-[11px] py-2'
        ),
        weeks: compact ? 'space-y-0.5' : 'space-y-1',
        week: 'flex w-full mt-1',
        day: cn(
          'text-center p-0 relative focus-within:relative focus-within:z-20',
          compact ? 'h-8 w-8 text-xs' : 'h-9 w-9 text-sm'
        ),
        day_button: cn(
          compact ? 'h-8 w-8 rounded-lg text-xs' : 'h-9 w-9 rounded-xl text-sm',
          'p-0 font-medium inline-flex items-center justify-center transition-all duration-150',
          'border-0 bg-transparent cursor-pointer select-none outline-none',
          'hover:bg-alcspower-primary/10 hover:text-alcspower-primary hover:scale-105 active:scale-95',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alcspower-ring focus-visible:ring-offset-2',
          'aria-selected:opacity-100'
        ),
        range_start: cn(
          'rdp-range_start !bg-alcspower-primary !text-white hover:!bg-alcspower-primary-hover focus:!bg-alcspower-primary !rounded-r-none font-semibold shadow-sm !border-0',
          compact ? 'rounded-l-lg' : 'rounded-l-xl'
        ),
        range_end: cn(
          'rdp-range_end !bg-alcspower-primary !text-white hover:!bg-alcspower-primary-hover focus:!bg-alcspower-primary !rounded-l-none font-semibold shadow-sm !border-0',
          compact ? 'rounded-r-lg' : 'rounded-r-xl'
        ),
        range_middle: 'rdp-range_middle !bg-alcspower-primary/10 !text-alcspower-primary hover:!bg-alcspower-primary/20 !rounded-none font-medium !border-0',
        selected: cn(
          '!bg-alcspower-primary !text-white hover:!bg-alcspower-primary-hover focus:!bg-alcspower-primary font-bold shadow-md shadow-alcspower-primary/25 !border-0 after:!bg-white',
          compact ? '!rounded-lg' : '!rounded-xl'
        ),
        today: 'font-bold text-alcspower-primary relative after:content-[""] after:absolute after:bottom-1 after:w-1 after:h-1 after:bg-alcspower-primary after:rounded-full',
        outside: 'rdp-outside text-alcspower-muted-foreground/35 aria-selected:bg-alcspower-primary/10 aria-selected:text-alcspower-muted-foreground',
        disabled: 'text-alcspower-muted-foreground/30 line-through opacity-40 cursor-not-allowed hover:bg-transparent pointer-events-none',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClassName }: { orientation?: string; className?: string }) => {
          const iconClasses = cn(compact ? 'h-3.5 w-3.5' : 'h-4 w-4', chevronClassName);
          if (orientation === 'left') {
            return <ChevronLeft className={iconClasses} />;
          }
          return <ChevronRight className={iconClasses} />;
        },
      }}
      {...props}
    />
  );
};

Calendar.displayName = 'Calendar';
