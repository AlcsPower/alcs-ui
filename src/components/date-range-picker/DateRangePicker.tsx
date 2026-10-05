import * as React from 'react';
import {
  format,
  subDays,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  subMonths,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { cn } from '../../lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Calendar } from '../calendar';
import { datePickerVariants } from '../date-picker';

export interface DateRangePreset {
  label: string;
  getValue: () => DateRange;
}

export const defaultDateRangePresets: DateRangePreset[] = [
  {
    label: 'Hoy',
    getValue: () => {
      const today = new Date();
      return { from: startOfDay(today), to: endOfDay(today) };
    },
  },
  {
    label: 'Ayer',
    getValue: () => {
      const yesterday = subDays(new Date(), 1);
      return { from: startOfDay(yesterday), to: endOfDay(yesterday) };
    },
  },
  {
    label: 'Últimos 7 días',
    getValue: () => ({
      from: startOfDay(subDays(new Date(), 6)),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: 'Últimos 30 días',
    getValue: () => ({
      from: startOfDay(subDays(new Date(), 29)),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: 'Este mes',
    getValue: () => {
      const now = new Date();
      return { from: startOfMonth(now), to: endOfMonth(now) };
    },
  },
  {
    label: 'Mes anterior',
    getValue: () => {
      const prevMonth = subMonths(new Date(), 1);
      return { from: startOfMonth(prevMonth), to: endOfMonth(prevMonth) };
    },
  },
];

export interface DateRangePickerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange'> {
  /** Rango de fechas seleccionado */
  value?: DateRange;
  /** Callback al seleccionar o limpiar el rango */
  onChange?: (range: DateRange | undefined) => void;
  /** Texto cuando no hay rango seleccionado */
  placeholder?: string;
  /** Formato de las fechas según date-fns (por defecto 'dd/MM/yyyy') */
  dateFormat?: string;
  /** Locale para date-fns (por defecto español `es`) */
  locale?: any;
  /** Mostrar panel lateral de atajos rápidos */
  showPresets?: boolean;
  /** Atajos rápidos personalizados */
  presets?: DateRangePreset[];
  /** Cantidad de meses a renderizar en el calendario */
  numberOfMonths?: number;
  /** Permite limpiar el rango seleccionado */
  clearable?: boolean;
  /** Si el campo presenta un error de validación */
  hasError?: boolean;
  /** Escala de tamaño */
  size?: 'sm' | 'md' | 'lg';
  /** Clases adicionales para el popover de contenido */
  popoverClassName?: string;
}

export const DateRangePicker = React.forwardRef<
  HTMLButtonElement,
  DateRangePickerProps
>(
  (
    {
      className,
      value,
      onChange,
      placeholder = 'Selecciona un rango de fechas...',
      dateFormat = 'dd/MM/yyyy',
      locale = es,
      showPresets = true,
      presets = defaultDateRangePresets,
      numberOfMonths = 2,
      clearable = true,
      hasError = false,
      size = 'md',
      disabled = false,
      popoverClassName,
      id,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    const handleSelect = (range: DateRange | undefined) => {
      onChange?.(range);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(undefined);
    };

    const formatRange = () => {
      if (!value?.from) return null;
      if (!value.to) {
        return format(value.from, dateFormat, { locale });
      }
      return `${format(value.from, dateFormat, { locale })} - ${format(
        value.to,
        dateFormat,
        { locale }
      )}`;
    };

    const formattedText = formatRange();
    const iconSize =
      size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';

    return (
      <div
        className={cn(
          'relative flex w-full items-center justify-between',
          datePickerVariants({ size, hasError }),
          'focus-within:ring-2 focus-within:ring-alcspower-ring focus-within:ring-offset-2 ring-offset-alcspower-surface',
          disabled && 'cursor-not-allowed opacity-50 bg-alcspower-surface-muted',
          className
        )}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              ref={ref}
              id={id}
              type="button"
              disabled={disabled}
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-invalid={hasError ? true : undefined}
              className={cn(
                'flex-1 flex items-center gap-2 truncate text-left outline-none bg-transparent min-w-0 cursor-pointer disabled:cursor-not-allowed',
                !formattedText && 'text-alcspower-muted-foreground'
              )}
              {...props}
            >
              <CalendarIcon className={cn(iconSize, 'shrink-0 opacity-70')} />
              <span className="truncate">
                {formattedText || placeholder}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            className={cn('w-auto p-0', popoverClassName)}
            align="start"
          >
            <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-alcspower-border">
              {showPresets && presets.length > 0 && (
                <div className="p-3 flex flex-col gap-1 sm:w-44 bg-alcspower-surface-muted/30">
                  <span className="text-xs font-semibold text-alcspower-muted-foreground mb-1 uppercase tracking-wider">
                    Atajos rápidos
                  </span>
                  {presets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        const range = preset.getValue();
                        onChange?.(range);
                      }}
                      className="text-left px-2.5 py-1.5 text-xs font-medium rounded-alcspower-md text-alcspower-foreground hover:bg-alcspower-surface-muted transition-colors focus:outline-none focus:ring-1 focus:ring-alcspower-ring"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              )}
              <div className="p-1">
                <Calendar
                  mode="range"
                  defaultMonth={value?.from}
                  selected={value}
                  onSelect={handleSelect}
                  numberOfMonths={numberOfMonths}
                  locale={locale}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {clearable && formattedText && !disabled ? (
          <button
            type="button"
            aria-label="Limpiar rango de fechas"
            onClick={handleClear}
            className="ml-2 rounded-alcspower-sm p-0.5 opacity-60 hover:opacity-100 hover:bg-alcspower-surface-muted focus:outline-none focus:ring-1 focus:ring-alcspower-ring text-alcspower-foreground shrink-0"
          >
            <X className={iconSize} />
          </button>
        ) : null}
      </div>
    );
  }
);
DateRangePicker.displayName = 'DateRangePicker';
