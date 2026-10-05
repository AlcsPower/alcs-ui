import * as React from 'react';
import { format, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Calendar } from '../calendar';

export const datePickerVariants = cva(
  'inline-flex w-full items-center justify-between text-left font-normal border bg-alcspower-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alcspower-ring focus-visible:ring-offset-2 ring-offset-alcspower-surface disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-alcspower-surface-muted',
  {
    variants: {
      size: {
        sm: 'h-8 px-2.5 py-1 text-xs rounded-alcspower-sm',
        md: 'h-10 px-3 py-2 text-sm rounded-alcspower-md',
        lg: 'h-12 px-4 py-3 text-base rounded-alcspower-md',
      },
      hasError: {
        true: 'border-alcspower-destructive focus-visible:ring-alcspower-destructive text-alcspower-destructive',
        false: 'border-alcspower-input hover:border-alcspower-border-subtle text-alcspower-foreground',
      },
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
    },
  }
);

export interface DatePickerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange'>,
    VariantProps<typeof datePickerVariants> {
  /** Fecha seleccionada */
  value?: Date;
  /** Callback al seleccionar o limpiar la fecha */
  onChange?: (date: Date | undefined) => void;
  /** Texto cuando no hay fecha seleccionada */
  placeholder?: string;
  /** Formato de la fecha según date-fns (por defecto 'dd/MM/yyyy') */
  dateFormat?: string;
  /** Locale para date-fns (por defecto español `es`) */
  locale?: any;
  /** Permite limpiar la fecha seleccionada */
  clearable?: boolean;
  /** Fecha mínima seleccionable */
  minDate?: Date;
  /** Fecha máxima seleccionable */
  maxDate?: Date;
  /** Función para deshabilitar fechas específicas */
  isDateDisabled?: (date: Date) => boolean;
  /** Si el campo presenta un error de validación */
  hasError?: boolean;
  /** Escala de tamaño */
  size?: 'sm' | 'md' | 'lg';
  /** Clases adicionales para el popover de contenido */
  popoverClassName?: string;
}

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      className,
      value,
      onChange,
      placeholder = 'Selecciona una fecha...',
      dateFormat = 'dd/MM/yyyy',
      locale = es,
      clearable = true,
      minDate,
      maxDate,
      isDateDisabled,
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

    const handleSelect = (date: Date | undefined) => {
      onChange?.(date);
      setOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(undefined);
    };

    const formattedDate =
      value && isValid(value) ? format(value, dateFormat, { locale }) : null;

    const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';

    const disabledMatcher = React.useCallback(
      (date: Date) => {
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;
        if (isDateDisabled && isDateDisabled(date)) return true;
        return false;
      },
      [minDate, maxDate, isDateDisabled]
    );

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
                !formattedDate && 'text-alcspower-muted-foreground'
              )}
              {...props}
            >
              <CalendarIcon className={cn(iconSize, 'shrink-0 opacity-70')} />
              <span className="truncate">
                {formattedDate || placeholder}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            className={cn('w-auto p-0', popoverClassName)}
            align="start"
          >
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleSelect}
              locale={locale}
              disabled={disabledMatcher}
            />
          </PopoverContent>
        </Popover>

        {clearable && formattedDate && !disabled ? (
          <button
            type="button"
            aria-label="Limpiar fecha"
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
DatePicker.displayName = 'DatePicker';
