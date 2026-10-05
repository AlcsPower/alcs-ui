import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  locale = es,
  ...props
}: CalendarProps) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={locale}
      className={cn('p-3 bg-alcspower-surface-card rounded-alcspower-md border border-alcspower-border inline-block', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        month_caption: 'flex justify-center pt-1 relative items-center mb-2',
        caption_label: 'text-sm font-semibold text-alcspower-foreground capitalize',
        nav: 'space-x-1 flex items-center',
        button_previous: cn(
          'absolute left-1 top-0 h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100',
          'inline-flex items-center justify-center rounded-alcspower-md text-alcspower-foreground',
          'hover:bg-alcspower-surface-muted transition-colors disabled:opacity-30'
        ),
        button_next: cn(
          'absolute right-1 top-0 h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100',
          'inline-flex items-center justify-center rounded-alcspower-md text-alcspower-foreground',
          'hover:bg-alcspower-surface-muted transition-colors disabled:opacity-30'
        ),
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday: 'text-alcspower-muted-foreground rounded-alcspower-md w-9 font-normal text-[0.8rem] text-center uppercase',
        weeks: 'space-y-1',
        week: 'flex w-full mt-1',
        day: 'h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
        day_button: cn(
          'h-9 w-9 p-0 font-normal inline-flex items-center justify-center rounded-alcspower-md text-sm transition-colors',
          'hover:bg-alcspower-surface-muted hover:text-alcspower-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alcspower-ring focus-visible:ring-offset-2',
          'aria-selected:opacity-100'
        ),
        range_start: 'rdp-range_start !bg-alcspower-primary !text-alcspower-primary-foreground hover:!bg-alcspower-primary-hover focus:!bg-alcspower-primary rounded-l-alcspower-md !rounded-r-none',
        range_end: 'rdp-range_end !bg-alcspower-primary !text-alcspower-primary-foreground hover:!bg-alcspower-primary-hover focus:!bg-alcspower-primary rounded-r-alcspower-md !rounded-l-none',
        range_middle: 'rdp-range_middle !bg-alcspower-primary/15 !text-alcspower-foreground hover:!bg-alcspower-primary/25 !rounded-none',
        selected: '!bg-alcspower-primary !text-alcspower-primary-foreground hover:!bg-alcspower-primary-hover focus:!bg-alcspower-primary',
        today: 'font-bold underline underline-offset-4 text-alcspower-primary',
        outside: 'rdp-outside text-alcspower-muted-foreground/40 aria-selected:bg-alcspower-primary/10 aria-selected:text-alcspower-muted-foreground',
        disabled: 'text-alcspower-muted-foreground/30 opacity-50 cursor-not-allowed hover:bg-transparent pointer-events-none',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClassName }) => {
          if (orientation === 'left') {
            return <ChevronLeft className={cn('h-4 w-4', chevronClassName)} />;
          }
          return <ChevronRight className={cn('h-4 w-4', chevronClassName)} />;
        },
      }}
      {...props}
    />
  );
};
Calendar.displayName = 'Calendar';
