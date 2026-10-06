import * as React from 'react';
import { format, isValid, type Locale } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, X, AlertCircle, Check } from 'lucide-react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Calendar } from '../calendar';

export const datePickerVariants = cva(
  'box-border relative inline-flex w-full items-center transition-all bg-alcspower-surface border-[1.5px] shadow-2xs font-normal text-left outline-none',
  {
    variants: {
      size: {
        sm: 'h-8 text-xs rounded-sm pl-8 pr-7',
        md: 'h-10 text-sm rounded-md pl-9 pr-8',
        lg: 'h-12 text-base rounded-lg pl-10 pr-9',
      },
      hasError: {
        true: 'border-alcspower-destructive bg-alcspower-destructive/5 text-alcspower-destructive focus-within:border-alcspower-destructive focus-within:ring-2 focus-within:ring-alcspower-destructive/15',
        false: 'border-alcspower-border hover:border-alcspower-border-subtle hover:shadow-xs focus-within:border-alcspower-primary focus-within:ring-2 focus-within:ring-alcspower-primary/15 text-alcspower-foreground',
      },
      hasSuccess: {
        true: 'border-alcspower-success focus-within:border-alcspower-success focus-within:ring-2 focus-within:ring-alcspower-success/15',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
      hasSuccess: false,
    },
  }
);

export interface DatePickerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'defaultValue' | 'onChange'>,
    VariantProps<typeof datePickerVariants> {
  /** Fecha seleccionada en modo controlado */
  value?: Date;
  /** Fecha seleccionada inicial en modo no controlado */
  defaultValue?: Date;
  /** Callback al seleccionar o limpiar la fecha */
  onChange?: (date: Date | undefined) => void;
  /** Texto cuando no hay fecha seleccionada */
  placeholder?: string;
  /** Formato de la fecha según date-fns (por defecto 'dd/MM/yyyy') */
  dateFormat?: string;
  /** Locale para date-fns (por defecto español `es`) */
  locale?: Locale;
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
  /** Si el campo presenta un estado exitoso */
  hasSuccess?: boolean;
  /** Escala de tamaño */
  size?: 'sm' | 'md' | 'lg';
  /** Clases adicionales para el popover de contenido */
  popoverClassName?: string;
}

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = 'Selecciona una fecha...',
      dateFormat = 'dd/MM/yyyy',
      locale = es,
      clearable = true,
      minDate,
      maxDate,
      isDateDisabled,
      hasError = false,
      hasSuccess = false,
      size = 'md',
      disabled = false,
      popoverClassName,
      id,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [uncontrolledValue, setUncontrolledValue] = React.useState<Date | undefined>(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleSelect = (date: Date | undefined) => {
      if (!isControlled) {
        setUncontrolledValue(date);
      }
      onChange?.(date);
      setOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlled) {
        setUncontrolledValue(undefined);
      }
      onChange?.(undefined);
    };

    const formattedDate =
      value && isValid(value) ? format(value, dateFormat, { locale }) : null;

    const iconBoxSize =
      size === 'sm' ? 'h-7 w-7' : size === 'lg' ? 'h-9 w-9' : 'h-8 w-8';
    const iconSize =
      size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';

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
          datePickerVariants({ size, hasError, hasSuccess }),
          disabled && 'cursor-not-allowed opacity-50 bg-alcspower-surface-muted border-alcspower-border/60 text-alcspower-muted-foreground/60 shadow-none hover:shadow-none hover:border-alcspower-border/60',
          open && !hasError && 'border-alcspower-primary ring-3 ring-alcspower-primary/15',
          className
        )}
      >
        <Popover open={open} onOpenChange={setOpen}>
          {/* Botón interactivo del Icono de Calendario a la izquierda */}
          <PopoverTrigger asChild>
            <button
              type="button"
              disabled={disabled}
              title="Abrir calendario"
              aria-label="Abrir calendario"
              className={cn(
                'absolute left-1 flex items-center justify-center rounded-md transition-all z-10 border-0 bg-transparent',
                iconBoxSize,
                disabled
                  ? 'cursor-not-allowed opacity-40'
                  : cn(
                      'cursor-pointer hover:scale-105 active:scale-95',
                      hasError
                        ? 'text-alcspower-destructive hover:bg-alcspower-destructive/10'
                        : hasSuccess
                        ? 'text-alcspower-success hover:bg-alcspower-success/10'
                        : open
                        ? 'text-alcspower-primary bg-alcspower-primary/15'
                        : 'text-alcspower-muted-foreground hover:text-alcspower-primary hover:bg-alcspower-primary/10'
                    )
              )}
            >
              {hasError ? (
                <AlertCircle className={cn(iconSize, 'text-alcspower-destructive')} />
              ) : hasSuccess ? (
                <Check className={cn(iconSize, 'text-alcspower-success')} />
              ) : (
                <CalendarIcon className={iconSize} />
              )}
            </button>
          </PopoverTrigger>

          {/* Área de texto / Trigger principal del DatePicker */}
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
                formattedDate ? 'font-medium text-alcspower-foreground' : 'text-alcspower-muted-foreground/70 font-normal'
              )}
              {...props}
            >
              <span className="truncate">
                {formattedDate || placeholder}
              </span>
            </button>
          </PopoverTrigger>

          {/* Popover con Calendario Compacto y Footer */}
          <PopoverContent
            className={cn('w-auto p-0 rounded-2xl border border-alcspower-border bg-alcspower-surface shadow-xl overflow-hidden', popoverClassName)}
            align="start"
            sideOffset={6}
          >
            <div className="p-1">
              <Calendar
                compact
                mode="single"
                selected={value}
                onSelect={handleSelect}
                locale={locale}
                disabled={disabledMatcher}
                className="border-0 shadow-none"
              />
              <div className="border-t border-alcspower-border/60 px-3 py-2 flex items-center justify-between gap-2 bg-alcspower-surface-muted/30">
                <button
                  type="button"
                  onClick={() => {
                    const today = new Date();
                    handleSelect(today);
                  }}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-alcspower-primary/10 text-alcspower-primary hover:bg-alcspower-primary/20 transition-all cursor-pointer border-0 active:scale-95"
                >
                  Hoy
                </button>
                <span className="text-[10px] font-mono text-alcspower-muted-foreground uppercase tracking-wider">
                  {dateFormat.toLowerCase()}
                </span>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Botón de limpiar fecha */}
        {clearable && formattedDate && !disabled ? (
          <button
            type="button"
            aria-label="Limpiar fecha"
            title="Limpiar fecha"
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

DatePicker.displayName = 'DatePicker';
