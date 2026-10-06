import * as React from 'react';
import {
  format,
  subDays,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  subMonths,
  isSameDay,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, X, AlertCircle } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { cn } from '../../lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Calendar } from '../calendar';
import { datePickerVariants } from '../date-picker';

export interface DateRangePreset {
  id?: string;
  label: string;
  shortcut?: string;
  getValue: () => DateRange;
}

export const defaultDateRangePresets: DateRangePreset[] = [
  {
    id: 'today',
    label: 'Hoy',
    shortcut: 'H',
    getValue: () => {
      const today = new Date();
      return { from: startOfDay(today), to: endOfDay(today) };
    },
  },
  {
    id: 'yesterday',
    label: 'Ayer',
    shortcut: 'A',
    getValue: () => {
      const yesterday = subDays(new Date(), 1);
      return { from: startOfDay(yesterday), to: endOfDay(yesterday) };
    },
  },
  {
    id: 'last7',
    label: 'Últimos 7 días',
    shortcut: '7D',
    getValue: () => ({
      from: startOfDay(subDays(new Date(), 6)),
      to: endOfDay(new Date()),
    }),
  },
  {
    id: 'last30',
    label: 'Últimos 30 días',
    shortcut: '30D',
    getValue: () => ({
      from: startOfDay(subDays(new Date(), 29)),
      to: endOfDay(new Date()),
    }),
  },
  {
    id: 'thisMonth',
    label: 'Este mes',
    shortcut: 'EM',
    getValue: () => {
      const now = new Date();
      return { from: startOfMonth(now), to: endOfMonth(now) };
    },
  },
  {
    id: 'lastMonth',
    label: 'Mes anterior',
    shortcut: 'MA',
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
    const [activePreset, setActivePreset] = React.useState<string | null>(null);

    const handleSelect = (range: DateRange | undefined) => {
      setActivePreset(null);
      onChange?.(range);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      setActivePreset(null);
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

    const iconBoxSize =
      size === 'sm' ? 'h-7 w-7' : size === 'lg' ? 'h-9 w-9' : 'h-8 w-8';
    const iconSize =
      size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';

    const isPresetActive = (preset: DateRangePreset) => {
      if (!value?.from || !value?.to) return false;
      if (activePreset === (preset.id || preset.label)) return true;
      const target = preset.getValue();
      if (!target.from || !target.to) return false;
      return (
        isSameDay(value.from, target.from) && isSameDay(value.to, target.to)
      );
    };

    return (
      <div
        className={cn(
          datePickerVariants({ size, hasError }),
          disabled && 'cursor-not-allowed opacity-50 bg-alcspower-surface-muted border-alcspower-border/60 text-alcspower-muted-foreground/60 shadow-none hover:shadow-none hover:border-alcspower-border/60',
          open && !hasError && 'border-alcspower-primary ring-3 ring-alcspower-primary/15',
          className
        )}
      >
        <Popover open={open} onOpenChange={setOpen}>
          {/* Botón interactivo del Icono a la izquierda */}
          <PopoverTrigger asChild>
            <button
              type="button"
              disabled={disabled}
              title="Abrir selector de rango"
              aria-label="Abrir selector de rango"
              className={cn(
                'absolute left-1 flex items-center justify-center rounded-md transition-all z-10 border-0 bg-transparent',
                iconBoxSize,
                disabled
                  ? 'cursor-not-allowed opacity-40'
                  : cn(
                      'cursor-pointer hover:scale-105 active:scale-95',
                      hasError
                        ? 'text-alcspower-destructive hover:bg-alcspower-destructive/10'
                        : open
                        ? 'text-alcspower-primary bg-alcspower-primary/15'
                        : 'text-alcspower-muted-foreground hover:text-alcspower-primary hover:bg-alcspower-primary/10'
                    )
              )}
            >
              {hasError ? (
                <AlertCircle className={cn(iconSize, 'text-alcspower-destructive')} />
              ) : (
                <CalendarIcon className={iconSize} />
              )}
            </button>
          </PopoverTrigger>

          {/* Trigger de texto principal */}
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
                'w-full h-full flex items-center truncate text-left outline-none bg-transparent min-w-0 cursor-pointer disabled:cursor-not-allowed border-0 p-0',
                formattedText ? 'font-medium text-alcspower-foreground' : 'text-alcspower-muted-foreground/70 font-normal'
              )}
              {...props}
            >
              <span className="truncate">
                {formattedText || placeholder}
              </span>
            </button>
          </PopoverTrigger>

          {/* Popover con Panel de Presets, Doble Calendario y Footer */}
          <PopoverContent
            className={cn(
              'w-auto p-0 rounded-3xl border border-alcspower-border bg-alcspower-surface shadow-2xl overflow-hidden',
              popoverClassName
            )}
            align="start"
            sideOffset={8}
          >
            <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-alcspower-border/60">
              {/* Panel lateral de Presets rápidos */}
              {showPresets && presets.length > 0 && (
                <div className="p-3.5 flex flex-col gap-1 sm:w-48 bg-alcspower-surface-muted/20 shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-alcspower-muted-foreground px-2 py-1 block">
                    Atajos rápidos
                  </span>
                  {presets.map((preset) => {
                    const active = isPresetActive(preset);
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          const range = preset.getValue();
                          setActivePreset(preset.id || preset.label);
                          onChange?.(range);
                        }}
                        className={cn(
                          'w-full text-left px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer border-0 flex items-center justify-between',
                          active
                            ? 'bg-alcspower-primary text-white shadow-md shadow-alcspower-primary/25'
                            : 'text-alcspower-foreground hover:bg-alcspower-surface hover:text-alcspower-primary hover:shadow-xs'
                        )}
                      >
                        <span>{preset.label}</span>
                        {preset.shortcut && (
                          <span
                            className={cn(
                              'text-[10px] font-mono font-bold',
                              active ? 'opacity-80' : 'text-alcspower-muted-foreground opacity-60'
                            )}
                          >
                            {preset.shortcut}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Contenedor de Calendarios y Footer */}
              <div className="flex flex-col relative">
                <div className="p-2 relative min-h-[288px]">
                  <Calendar
                    compact
                    fixedWeeks
                    mode="range"
                    defaultMonth={value?.from}
                    selected={value}
                    onSelect={handleSelect}
                    numberOfMonths={numberOfMonths}
                    locale={locale}
                    className="border-0 shadow-none"
                  />
                </div>

                {/* Footer del Popover */}
                <div className="border-t border-alcspower-border/60 px-4 py-3 flex items-center justify-between gap-4 bg-alcspower-surface-muted/30">
                  <div className="text-xs text-alcspower-muted-foreground truncate">
                    {value?.from && value?.to ? (
                      <>
                        <span className="font-bold text-alcspower-foreground">
                          {format(value.from, dateFormat, { locale })}
                        </span>
                        {' hasta '}
                        <span className="font-bold text-alcspower-foreground">
                          {format(value.to, dateFormat, { locale })}
                        </span>
                      </>
                    ) : value?.from ? (
                      <>
                        <span className="font-bold text-alcspower-foreground">
                          {format(value.from, dateFormat, { locale })}
                        </span>
                        {' — seleccioná fecha fin'}
                      </>
                    ) : (
                      'Seleccioná un rango de fechas'
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-alcspower-surface-muted hover:bg-alcspower-surface-subtle text-alcspower-foreground border border-alcspower-border/80 transition-all cursor-pointer active:scale-95"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-alcspower-primary text-white hover:bg-alcspower-primary-hover shadow-xs transition-all cursor-pointer border-0 active:scale-95"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Botón de Limpiar Rango */}
        {clearable && formattedText && !disabled ? (
          <button
            type="button"
            aria-label="Limpiar rango de fechas"
            title="Limpiar rango de fechas"
            onClick={handleClear}
            className="absolute right-1.5 h-6 w-6 rounded-md flex items-center justify-center text-alcspower-muted-foreground hover:text-alcspower-foreground hover:bg-alcspower-surface-muted transition-all cursor-pointer border-0 z-10"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>
    );
  }
);

DateRangePicker.displayName = 'DateRangePicker';
