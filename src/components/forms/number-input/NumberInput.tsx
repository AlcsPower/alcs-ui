import * as React from 'react';
import { ChevronUp, ChevronDown, Plus, Minus } from 'lucide-react';
import { cn } from '../../../lib/utils';

export type NumberInputStepperPosition = 'stacked' | 'split' | 'inline-right' | 'none';

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'size' | 'prefix'
  > {
  /** Valor numérico actual en modo controlado */
  value?: number | null;
  /** Valor numérico inicial en modo no controlado */
  defaultValue?: number | null;
  /** Callback disparado cuando el valor numérico cambia */
  onChange?: (value: number | null) => void;
  /** Valor mínimo permitido */
  min?: number;
  /** Valor máximo permitido */
  max?: number;
  /** Magnitud del incremento o decremento por paso (por defecto 1) */
  step?: number;
  /** Multiplicador al presionar Shift + flechas (por defecto 10) */
  stepMultiplier?: number;
  /** Número de decimales permitidos (redondeo automático en step y blur) */
  precision?: number;
  /** Disposición de los botones stepper ('stacked' | 'split' | 'inline-right' | 'none') */
  stepperPosition?: NumberInputStepperPosition;
  /** Muestra u oculta los botones stepper (por defecto true) */
  showSteppers?: boolean;
  /** Prefijo o símbolo visual a la izquierda del número (ej. "C$", "$", "NIO") */
  prefix?: React.ReactNode;
  /** Sufijo o unidad visual a la derecha del número (ej. "%", "kg", "unidades") */
  suffix?: React.ReactNode;
  /** Escala dimensional del control */
  size?: 'sm' | 'md' | 'lg';
  /** Estado de error de validación */
  hasError?: boolean;
  /** Estado de éxito */
  hasSuccess?: boolean;
  /** Ajusta automáticamente el valor entre min y max al salir del campo (por defecto true) */
  clampValueOnBlur?: boolean;
  /** Formateador numérico personalizado para visualización */
  format?: (value: number) => string;
  /** Parseador personalizado para extraer el valor numérico desde el texto */
  parse?: (value: string) => number | null;
  /** Clases CSS adicionales para el contenedor exterior */
  containerClassName?: string;
  /** Permite números negativos (por defecto true a menos que min >= 0) */
  allowNegative?: boolean;
}

function countDecimals(num: number): number {
  if (Math.floor(num.valueOf()) === num.valueOf()) return 0;
  const parts = num.toString().split('.');
  return parts[1] ? parts[1].length : 0;
}

function roundToPrecision(val: number, prec: number): number {
  const factor = Math.pow(10, prec);
  return Math.round(val * factor) / factor;
}

function clamp(val: number, min?: number, max?: number): number {
  let res = val;
  if (min !== undefined && res < min) res = min;
  if (max !== undefined && res > max) res = max;
  return res;
}

/** Hook para manejar aceleración por pulsación prolongada (long-press) */
function useLongPressStep(onStep: () => void, disabled?: boolean) {
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = React.useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      if ('button' in e && e.button !== 0) return;
      e.preventDefault();
      onStep();
      stop();

      timeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          onStep();
        }, 60);
      }, 350);
    },
    [disabled, onStep, stop]
  );

  React.useEffect(() => {
    return () => stop();
  }, [stop]);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value: controlledValue,
      defaultValue = null,
      onChange,
      min,
      max,
      step = 1,
      stepMultiplier = 10,
      precision: explicitPrecision,
      stepperPosition = 'stacked',
      showSteppers = true,
      prefix,
      suffix,
      size = 'md',
      hasError = false,
      hasSuccess = false,
      clampValueOnBlur = true,
      format,
      parse,
      containerClassName,
      allowNegative: explicitAllowNegative,
      disabled = false,
      readOnly = false,
      className,
      id,
      name,
      placeholder,
      onFocus,
      onBlur,
      onKeyDown,
      ...props
    },
    forwardedRef
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState<number | null>(defaultValue);
    const currentValue = isControlled ? controlledValue : internalValue;

    // Calcular precisión efectiva (si no se especifica, se deduce del step)
    const effectivePrecision = React.useMemo(() => {
      if (explicitPrecision !== undefined) return explicitPrecision;
      return countDecimals(step);
    }, [explicitPrecision, step]);

    // Permite negativos si no está bloqueado explícitamente y min no es >= 0
    const allowNegative = explicitAllowNegative !== undefined
      ? explicitAllowNegative
      : (min === undefined || min < 0);

    // Texto visual que se muestra en el input mientras se escribe
    const formatValueToString = React.useCallback(
      (val: number | null): string => {
        if (val === null || val === undefined || isNaN(val)) return '';
        if (format) return format(val);
        if (effectivePrecision > 0) {
          return val.toFixed(effectivePrecision);
        }
        return val.toString();
      },
      [format, effectivePrecision]
    );

    const [inputValue, setInputValue] = React.useState<string>(() =>
      formatValueToString(currentValue)
    );
    const [isFocused, setIsFocused] = React.useState(false);

    // Sincronizar texto si el valor cambia externamente y no está en foco activo
    React.useEffect(() => {
      if (!isFocused) {
        setInputValue(formatValueToString(currentValue));
      }
    }, [currentValue, isFocused, formatValueToString]);

    const updateValue = React.useCallback(
      (nextVal: number | null) => {
        let finalVal = nextVal;
        if (finalVal !== null && !isNaN(finalVal)) {
          finalVal = roundToPrecision(finalVal, effectivePrecision);
          if (clampValueOnBlur) {
            finalVal = clamp(finalVal, min, max);
          }
        }

        if (!isControlled) {
          setInternalValue(finalVal);
        }
        onChange?.(finalVal);
        setInputValue(formatValueToString(finalVal));
      },
      [effectivePrecision, clampValueOnBlur, min, max, isControlled, onChange, formatValueToString]
    );

    // Modificadores de paso
    const handleStep = React.useCallback(
      (multiplier: number) => {
        if (disabled || readOnly) return;
        const currentNum = currentValue ?? (min !== undefined ? min : 0);
        const nextVal = currentNum + step * multiplier;
        updateValue(nextVal);
      },
      [disabled, readOnly, currentValue, min, step, updateValue]
    );

    const canIncrement = !disabled && !readOnly && (max === undefined || (currentValue !== null && currentValue < max));
    const canDecrement = !disabled && !readOnly && (min === undefined || (currentValue !== null && currentValue > min));

    const incrementLongPress = useLongPressStep(() => handleStep(1), !canIncrement);
    const decrementLongPress = useLongPressStep(() => handleStep(-1), !canDecrement);

    // Parseo de entrada de texto directo
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setInputValue(raw);

      if (raw.trim() === '') {
        if (!isControlled) setInternalValue(null);
        onChange?.(null);
        return;
      }

      if (parse) {
        const parsed = parse(raw);
        if (parsed !== null && !isNaN(parsed)) {
          if (!isControlled) setInternalValue(parsed);
          onChange?.(parsed);
        }
        return;
      }

      // Limpieza estándar: permitir dígitos, un signo menos (si allowNegative) y un punto decimal
      let sanitized = raw;
      if (!allowNegative) {
        sanitized = sanitized.replace(/-/g, '');
      }
      const num = parseFloat(sanitized);
      if (!isNaN(num)) {
        if (!isControlled) setInternalValue(num);
        onChange?.(num);
      }
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (inputValue.trim() === '') {
        updateValue(null);
      } else {
        const parsed = parse ? parse(inputValue) : parseFloat(inputValue);
        if (parsed !== null && !isNaN(parsed)) {
          updateValue(parsed);
        } else {
          // Revertir al último valor numérico válido
          setInputValue(formatValueToString(currentValue));
        }
      }
      onBlur?.(e);
    };

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) {
        onKeyDown?.(e);
        return;
      }

      const mult = e.shiftKey ? stepMultiplier : 1;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleStep(mult);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleStep(-mult);
      } else if (e.key === 'PageUp') {
        e.preventDefault();
        handleStep(stepMultiplier);
      } else if (e.key === 'PageDown') {
        e.preventDefault();
        handleStep(-stepMultiplier);
      } else if (e.key === 'Home' && min !== undefined) {
        e.preventDefault();
        updateValue(min);
      } else if (e.key === 'End' && max !== undefined) {
        e.preventDefault();
        updateValue(max);
      }

      onKeyDown?.(e);
    };

    // Estilos dimensionales
    const SIZE_STYLES = {
      sm: {
        container: 'h-8 text-xs rounded-lg',
        input: 'h-8 text-xs',
        btnStacked: 'h-3.5 w-6',
        btnSplit: 'h-8 w-8',
        btnInline: 'h-6 w-6 text-xs',
        icon: 12,
      },
      md: {
        container: 'h-10 text-sm rounded-xl',
        input: 'h-10 text-sm',
        btnStacked: 'h-4.5 w-7',
        btnSplit: 'h-10 w-10',
        btnInline: 'h-7 w-7 text-sm',
        icon: 14,
      },
      lg: {
        container: 'h-12 text-base rounded-xl',
        input: 'h-12 text-base',
        btnStacked: 'h-5.5 w-8',
        btnSplit: 'h-12 w-12',
        btnInline: 'h-8 w-8 text-base',
        icon: 16,
      },
    };

    const currentSize = SIZE_STYLES[size];
    const effectiveStepper = showSteppers ? stepperPosition : 'none';

    // RENDERIZADO MODO SPLIT: Botón [-] a la izquierda, Input al centro, Botón [+] a la derecha
    if (effectiveStepper === 'split') {
      return (
        <div
          className={cn(
            'inline-flex items-center gap-1.5 w-full',
            containerClassName
          )}
        >
          {/* Botón Decrementar */}
          <button
            type="button"
            tabIndex={-1}
            disabled={!canDecrement}
            aria-label="Decrementar valor"
            className={cn(
              'shrink-0 flex items-center justify-center rounded-xl border-[1.5px] border-alcspower-border bg-white dark:bg-slate-900',
              'text-alcspower-foreground transition-all duration-150 select-none shadow-2xs',
              'hover:bg-alcspower-surface-muted hover:border-alcspower-border-subtle active:scale-95',
              'focus:outline-none focus:ring-2 focus:ring-alcspower-primary/20',
              'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-slate-900 disabled:active:scale-100',
              currentSize.btnSplit
            )}
            {...decrementLongPress}
          >
            <Minus size={currentSize.icon} strokeWidth={2.5} />
          </button>

          {/* Campo de Entrada Central */}
          <div
            className={cn(
              'relative flex-1 flex items-center border-[1.5px] bg-alcspower-surface transition-all duration-150 shadow-2xs',
              hasError
                ? 'border-alcspower-destructive bg-alcspower-destructive/5 ring-3 ring-alcspower-destructive/15'
                : hasSuccess
                ? 'border-alcspower-success bg-alcspower-success/5 ring-3 ring-alcspower-success/15'
                : isFocused
                ? 'border-alcspower-primary ring-3 ring-alcspower-primary/15'
                : 'border-alcspower-border hover:border-alcspower-border-subtle',
              disabled && 'bg-alcspower-surface-muted opacity-60 cursor-not-allowed',
              currentSize.container
            )}
          >
            {prefix && (
              <span className="pl-3 pr-1 text-alcspower-muted-foreground select-none font-medium shrink-0">
                {prefix}
              </span>
            )}
            <input
              ref={forwardedRef}
              id={id}
              name={name}
              role="spinbutton"
              type="text"
              inputMode="decimal"
              disabled={disabled}
              readOnly={readOnly}
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              aria-valuenow={currentValue ?? undefined}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-invalid={hasError ? 'true' : undefined}
              className={cn(
                'w-full bg-transparent font-medium text-alcspower-foreground text-center outline-none select-none tabular-nums px-2 border-0 focus:outline-none focus:ring-0 shadow-none',
                currentSize.input,
                className
              )}
              {...props}
            />
            {suffix && (
              <span className="pr-3 pl-1 text-alcspower-muted-foreground select-none font-medium shrink-0">
                {suffix}
              </span>
            )}
          </div>

          {/* Botón Incrementar */}
          <button
            type="button"
            tabIndex={-1}
            disabled={!canIncrement}
            aria-label="Incrementar valor"
            className={cn(
              'shrink-0 flex items-center justify-center rounded-xl border-[1.5px] border-alcspower-border bg-white dark:bg-slate-900',
              'text-alcspower-foreground transition-all duration-150 select-none shadow-2xs',
              'hover:bg-alcspower-surface-muted hover:border-alcspower-border-subtle active:scale-95',
              'focus:outline-none focus:ring-2 focus:ring-alcspower-primary/20',
              'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-slate-900 disabled:active:scale-100',
              currentSize.btnSplit
            )}
            {...incrementLongPress}
          >
            <Plus size={currentSize.icon} strokeWidth={2.5} />
          </button>
        </div>
      );
    }

    // RENDERIZADO ESTÁNDAR: Contenedor con input y steppers (stacked, inline-right o none)
    return (
      <div
        className={cn(
          'relative flex items-center w-full border-[1.5px] bg-alcspower-surface transition-all duration-150 shadow-2xs',
          hasError
            ? 'border-alcspower-destructive bg-alcspower-destructive/5 ring-3 ring-alcspower-destructive/15'
            : hasSuccess
            ? 'border-alcspower-success bg-alcspower-success/5 ring-3 ring-alcspower-success/15'
            : isFocused
            ? 'border-alcspower-primary ring-3 ring-alcspower-primary/15'
            : 'border-alcspower-border hover:border-alcspower-border-subtle',
          disabled && 'bg-alcspower-surface-muted opacity-60 cursor-not-allowed',
          currentSize.container,
          containerClassName
        )}
      >
        {/* Prefijo */}
        {prefix && (
          <span className="pl-3 pr-1 text-alcspower-muted-foreground select-none font-medium shrink-0">
            {prefix}
          </span>
        )}

        {/* Input Numérico */}
        <input
          ref={forwardedRef}
          id={id}
          name={name}
          role="spinbutton"
          type="text"
          inputMode="decimal"
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          aria-valuenow={currentValue ?? undefined}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-invalid={hasError ? 'true' : undefined}
          className={cn(
            'flex-1 min-w-0 bg-transparent font-medium text-alcspower-foreground outline-none select-none tabular-nums px-3 border-0 focus:outline-none focus:ring-0 shadow-none',
            !suffix && effectiveStepper === 'stacked' && 'pr-8',
            !suffix && effectiveStepper === 'inline-right' && 'pr-16',
            currentSize.input,
            className
          )}
          {...props}
        />

        {/* Sufijo */}
        {suffix && (
          <span
            className={cn(
              'text-alcspower-muted-foreground select-none font-medium shrink-0 pl-1',
              effectiveStepper === 'stacked' && 'mr-8',
              effectiveStepper === 'inline-right' && 'mr-16',
              effectiveStepper === 'none' && 'pr-3'
            )}
          >
            {suffix}
          </span>
        )}

        {/* STEPPERS APILADOS (STACKED) */}
        {effectiveStepper === 'stacked' && (
          <div className="absolute right-1 top-0 bottom-0 flex flex-col justify-center items-center gap-0.5 border-l border-alcspower-border/60 pl-1">
            <button
              type="button"
              tabIndex={-1}
              disabled={!canIncrement}
              aria-label="Incrementar valor"
              className={cn(
                'flex items-center justify-center rounded-md text-alcspower-muted-foreground transition-colors select-none',
                'hover:bg-alcspower-surface-muted hover:text-alcspower-foreground active:scale-90',
                'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:active:scale-100',
                currentSize.btnStacked
              )}
              {...incrementLongPress}
            >
              <ChevronUp size={currentSize.icon} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              tabIndex={-1}
              disabled={!canDecrement}
              aria-label="Decrementar valor"
              className={cn(
                'flex items-center justify-center rounded-md text-alcspower-muted-foreground transition-colors select-none',
                'hover:bg-alcspower-surface-muted hover:text-alcspower-foreground active:scale-90',
                'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:active:scale-100',
                currentSize.btnStacked
              )}
              {...decrementLongPress}
            >
              <ChevronDown size={currentSize.icon} strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* STEPPERS EN LÍNEA A LA DERECHA (INLINE-RIGHT) */}
        {effectiveStepper === 'inline-right' && (
          <div className="absolute right-1.5 flex items-center gap-1">
            <button
              type="button"
              tabIndex={-1}
              disabled={!canDecrement}
              aria-label="Decrementar valor"
              className={cn(
                'flex items-center justify-center rounded-lg border border-alcspower-border bg-white dark:bg-slate-900',
                'text-alcspower-muted-foreground transition-all duration-150 select-none shadow-2xs',
                'hover:bg-alcspower-surface-muted hover:text-alcspower-foreground active:scale-95',
                'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-slate-900 disabled:active:scale-100',
                currentSize.btnInline
              )}
              {...decrementLongPress}
            >
              <Minus size={currentSize.icon} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              tabIndex={-1}
              disabled={!canIncrement}
              aria-label="Incrementar valor"
              className={cn(
                'flex items-center justify-center rounded-lg border border-alcspower-border bg-white dark:bg-slate-900',
                'text-alcspower-muted-foreground transition-all duration-150 select-none shadow-2xs',
                'hover:bg-alcspower-surface-muted hover:text-alcspower-foreground active:scale-95',
                'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-slate-900 disabled:active:scale-100',
                currentSize.btnInline
              )}
              {...incrementLongPress}
            >
              <Plus size={currentSize.icon} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';
