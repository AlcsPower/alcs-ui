import * as React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '../../lib/utils';

export interface CalendarEvent {
  id?: string | number;
  time: string;
  title: string;
  desc?: string;
  type?: 'primary' | 'warning' | 'success' | 'danger' | 'info';
  onClick?: (event: CalendarEvent) => void;
}

export interface CalendarSelectedDateCardProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
  eventCount?: number;
  locale?: typeof es;
}

export const CalendarSelectedDateCard: React.FC<CalendarSelectedDateCardProps> = ({
  date,
  eventCount,
  locale = es,
  className,
  ...props
}) => {
  const dayNumber = format(date, 'd', { locale });
  const monthAbbr = format(date, 'MMM', { locale }).toUpperCase();
  const weekdayName = format(date, 'EEEE', { locale });
  const monthName = format(date, 'MMMM', { locale });
  const yearNumber = format(date, 'yyyy', { locale });

  return (
    <div
      className={cn(
        'rounded-3xl border border-alcspower-primary/20 bg-alcspower-primary/5 p-4 shadow-sm',
        className
      )}
      {...props}
    >
      <span className="text-[10px] font-bold uppercase tracking-widest text-alcspower-muted-foreground block mb-2.5">
        FECHA SELECCIONADA
      </span>
      <div className="flex items-center gap-3.5">
        <div className="h-14 w-14 rounded-2xl bg-alcspower-primary text-white flex flex-col items-center justify-center shadow-md shadow-alcspower-primary/20 shrink-0 select-none">
          <span className="text-xl font-black leading-none">{dayNumber}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-90 mt-0.5">
            {monthAbbr}
          </span>
        </div>
        <div>
          <div className="text-sm font-bold text-alcspower-foreground leading-tight capitalize">
            {weekdayName}, {dayNumber} de {monthName}
          </div>
          <div className="text-xs text-alcspower-muted-foreground mt-1">
            de {yearNumber} {eventCount !== undefined && eventCount > 0 ? `· ${eventCount} eventos` : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

CalendarSelectedDateCard.displayName = 'CalendarSelectedDateCard';

export interface CalendarEventListProps extends React.HTMLAttributes<HTMLDivElement> {
  events?: CalendarEvent[];
  title?: string;
  date?: Date;
  showDateCard?: boolean;
  emptyMessage?: string;
  onEventClick?: (event: CalendarEvent) => void;
  locale?: typeof es;
}

const borderColorsByType: Record<NonNullable<CalendarEvent['type']>, string> = {
  primary: 'border-l-alcspower-primary',
  warning: 'border-l-amber-500',
  success: 'border-l-emerald-500',
  danger: 'border-l-rose-500',
  info: 'border-l-sky-500',
};

export const CalendarEventList: React.FC<CalendarEventListProps> = ({
  events = [],
  title = 'EVENTOS DEL DÍA',
  date,
  showDateCard,
  emptyMessage = 'Sin eventos programados para este día',
  onEventClick,
  locale = es,
  className,
  ...props
}) => {
  const shouldShowDateCard = Boolean(date && showDateCard !== false);

  return (
    <div className={cn('space-y-4', className)} {...props}>
      {shouldShowDateCard && date && (
        <CalendarSelectedDateCard date={date} eventCount={events.length} locale={locale} />
      )}

      <div className="rounded-3xl border border-alcspower-border/70 bg-alcspower-surface p-5 shadow-sm space-y-3">
        {title && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-alcspower-muted-foreground block">
            {title}
          </span>
        )}

        {events.length > 0 ? (
          <ul className="space-y-2.5 list-none p-0 m-0" aria-label={title}>
            {events.map((evt, idx) => {
              const borderClass = borderColorsByType[evt.type || 'primary'] || 'border-l-alcspower-primary';
              const isInteractive = Boolean(evt.onClick || onEventClick);

              return (
                <li
                  key={evt.id || idx}
                  onClick={() => {
                    evt.onClick?.(evt);
                    onEventClick?.(evt);
                  }}
                  className={cn(
                    'flex items-start gap-3.5 p-3 rounded-2xl bg-alcspower-surface-muted/50 border-l-4 transition-all',
                    borderClass,
                    isInteractive
                      ? 'cursor-pointer hover:bg-alcspower-surface-muted hover:shadow-xs active:scale-[0.99]'
                      : 'hover:bg-alcspower-surface-muted'
                  )}
                >
                  <div className="text-xs font-mono font-bold text-alcspower-muted-foreground pt-0.5 select-none shrink-0">
                    {evt.time}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-alcspower-foreground truncate">
                      {evt.title}
                    </div>
                    {evt.desc && (
                      <div className="text-[11px] text-alcspower-muted-foreground mt-0.5 line-clamp-2">
                        {evt.desc}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-xs text-alcspower-muted-foreground text-center py-5">
            {emptyMessage}
          </div>
        )}
      </div>
    </div>
  );
};

CalendarEventList.displayName = 'CalendarEventList';
