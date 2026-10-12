import * as React from 'react';
import { ArrowUp, ArrowDown, Plus, Minus } from 'lucide-react';
import { cn } from '../../../lib/utils';

export type NumberInputStepperPosition = 'stacked' | 'split' | 'inline-right' | 'none';

export type SupportedCurrency =
  // América
  | 'NIO'
  | 'USD'
  | 'CAD'
  | 'MXN'
  | 'BRL'
  | 'COP'
  | 'CLP'
  | 'PEN'
  | 'GTQ'
  | 'HNL'
  | 'CRC'
  // Europa
  | 'EUR'
  | 'GBP'
  | 'CHF'
  | 'SEK'
  | 'NOK'
  | 'DKK'
  | 'PLN'
  // Asia y Oceanía
  | 'JPY'
  | 'CNY'
  | 'INR'
  | 'KRW'
  | 'AUD'
  | 'NZD'
  | 'SGD'
  | 'HKD'
  // Medio Oriente y África
  | 'SAR'
  | 'AED'
  | 'ZAR'
  | (string & {});

export interface CurrencyConfig {
  symbol: string;
  code: string;
  name: string;
  precision: number;
}

export const WORLD_CURRENCIES: Record<string, CurrencyConfig> = {
  // Principales monedas del mundo y regionales
  NIO: { symbol: 'C$', code: 'NIO', name: 'Córdoba nicaragüense', precision: 2 },
  USD: { symbol: '$', code: 'USD', name: 'Dólar estadounidense', precision: 2 },
  EUR: { symbol: '€', code: 'EUR', name: 'Euro', precision: 2 },
  GBP: { symbol: '£', code: 'GBP', name: 'Libra esterlina', precision: 2 },
  JPY: { symbol: '¥', code: 'JPY', name: 'Yen japonés', precision: 0 },
  CHF: { symbol: 'CHF', code: 'CHF', name: 'Franco suizo', precision: 2 },
  CAD: { symbol: 'CA$', code: 'CAD', name: 'Dólar canadiense', precision: 2 },
  AUD: { symbol: 'A$', code: 'AUD', name: 'Dólar australiano', precision: 2 },
  CNY: { symbol: '¥', code: 'CNY', name: 'Yuan chino', precision: 2 },
  MXN: { symbol: '$', code: 'MXN', name: 'Peso mexicano', precision: 2 },
  BRL: { symbol: 'R$', code: 'BRL', name: 'Real brasileño', precision: 2 },
  COP: { symbol: '$', code: 'COP', name: 'Peso colombiano', precision: 0 },
  CLP: { symbol: '$', code: 'CLP', name: 'Peso chileno', precision: 0 },
  PEN: { symbol: 'S/', code: 'PEN', name: 'Sol peruano', precision: 2 },
  GTQ: { symbol: 'Q', code: 'GTQ', name: 'Quetzal guatemalteco', precision: 2 },
  HNL: { symbol: 'L', code: 'HNL', name: 'Lempira hondureño', precision: 2 },
  CRC: { symbol: '₡', code: 'CRC', name: 'Colón costarricense', precision: 2 },
  INR: { symbol: '₹', code: 'INR', name: 'Rupia india', precision: 2 },
  KRW: { symbol: '₩', code: 'KRW', name: 'Won surcoreano', precision: 0 },
  NZD: { symbol: 'NZ$', code: 'NZD', name: 'Dólar neozelandés', precision: 2 },
  SGD: { symbol: 'S$', code: 'SGD', name: 'Dólar de Singapur', precision: 2 },
  HKD: { symbol: 'HK$', code: 'HKD', name: 'Dólar de Hong Kong', precision: 2 },
  SEK: { symbol: 'kr', code: 'SEK', name: 'Corona sueca', precision: 2 },
  NOK: { symbol: 'kr', code: 'NOK', name: 'Corona noruega', precision: 2 },
  DKK: { symbol: 'kr', code: 'DKK', name: 'Corona danesa', precision: 2 },
  PLN: { symbol: 'zł', code: 'PLN', name: 'Złoty polaco', precision: 2 },
  SAR: { symbol: '﷼', code: 'SAR', name: 'Riyal saudí', precision: 2 },
  AED: { symbol: 'د.إ', code: 'AED', name: 'Dírham emiratí', precision: 2 },
  ZAR: { symbol: 'R', code: 'ZAR', name: 'Rand sudafricano', precision: 2 },
};

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
  /** Moneda del mundo para autoconfigurar prefijo, sufijo y precisión (ej: 'NIO', 'USD', 'EUR', 'GBP', 'JPY') */
  currency?: SupportedCurrency;
  /** Muestra u oculta el código ISO en el sufijo al utilizar la prop currency (por defecto true) */
  showCurrencyCode?: boolean;
  /** Prefijo o símbolo visual a la izquierda del número (ej. "C$", "$", "N°") */
  prefix?: React.ReactNode;
  /** Sufijo o unidad visual a la derecha del número (ej. "%", "NIO", "ejemplares") */
  suffix?: React.ReactNode;
  /** Escala dimensional del control ('sm' | 'md' | 'lg') */
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
        }, 100);
      }, 500);
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
      currency,
      showCurrencyCode = true,
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

    // Resolución de moneda mundial (WORLD_CURRENCIES)
    const currencyUpper = currency ? String(currency).toUpperCase() : undefined;
    const currencyConfig = currencyUpper ? WORLD_CURRENCIES[currencyUpper] : undefined;

    // Prefijo y sufijo efectivos considerando moneda si no se proporcionan explícitos
    const effectivePrefix =
      prefix !== undefined
        ? prefix
        : currencyConfig
        ? currencyConfig.symbol
        : undefined;

    const effectiveSuffix =
      suffix !== undefined
        ? suffix
        : currencyConfig && showCurrencyCode
        ? currencyConfig.code
        : undefined;

    // Calcular precisión efectiva (si no se especifica, usa la de la moneda o la del step)
    const effectivePrecision = React.useMemo(() => {
      if (explicitPrecision !== undefined) return explicitPrecision;
      if (currencyConfig) return currencyConfig.precision;
      return countDecimals(step);
    }, [explicitPrecision, currencyConfig, step]);

    // Permite negativos si no está bloqueado explícitamente y min no es >= 0
    const allowNegative =
      explicitAllowNegative !== undefined
        ? explicitAllowNegative
        : min === undefined || min < 0;

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

    const canIncrement =
      !disabled && !readOnly && (max === undefined || (currentValue !== null && currentValue < max));
    const canDecrement =
      !disabled && !readOnly && (min === undefined || (currentValue !== null && currentValue > min));

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

    // Dimensiones y escalas proporcionales del sistema
    const SIZES = {
      sm: {
        wrapper: 'h-8 text-xs rounded-lg',
        input: 'h-8 text-[13px] px-2.5',
        prefix: 'text-xs px-2.5',
        suffix: 'text-xs px-2.5',
        btnStackedWidth: 'w-8',
        btnSplitWidth: 'w-9',
        btnInlineWidth: 'w-8',
        iconSize: 13,
      },
      md: {
        wrapper: 'h-10 text-sm rounded-[10px]',
        input: 'h-10 text-sm px-3.5',
        prefix: 'text-xs px-3',
        suffix: 'text-xs px-3',
        btnStackedWidth: 'w-10',
        btnSplitWidth: 'w-11',
        btnInlineWidth: 'w-9',
        iconSize: 15,
      },
      lg: {
        wrapper: 'h-12 text-base rounded-xl',
        input: 'h-12 text-[15px] px-4',
        prefix: 'text-sm px-3.5',
        suffix: 'text-sm px-3.5',
        btnStackedWidth: 'w-12',
        btnSplitWidth: 'w-13',
        btnInlineWidth: 'w-10',
        iconSize: 17,
      },
    };

    const sizeConfig = SIZES[size];
    const effectiveStepper = showSteppers ? stepperPosition : 'none';

    // Clases del contenedor principal
    const wrapperBaseClasses = cn(
      'number-input-wrapper relative inline-flex items-center w-full transition-all duration-200 overflow-hidden',
      'border-[1.5px] bg-white dark:bg-slate-900 shadow-2xs',
      hasError
        ? 'border-red-500 bg-red-50/50 dark:bg-red-950/20 focus-within:ring-3 focus-within:ring-red-500/15 focus-within:shadow-md'
        : hasSuccess
        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 focus-within:ring-3 focus-within:ring-emerald-500/15 focus-within:shadow-md'
        : cn(
            'border-gray-200 dark:border-slate-700',
            'hover:border-gray-300 dark:hover:border-slate-600 hover:shadow-xs',
            'focus-within:border-[#6366f1] dark:focus-within:border-indigo-500 focus-within:ring-3 focus-within:ring-[#6366f1]/15 focus-within:shadow-xs'
          ),
      disabled && 'bg-gray-100 dark:bg-slate-800/60 opacity-60 cursor-not-allowed border-gray-200 dark:border-slate-700',
      sizeConfig.wrapper,
      containerClassName
    );

    // Componente Input común
    const inputElement = (
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
          'number-input flex-1 min-w-0 bg-transparent font-medium text-gray-800 dark:text-gray-100 outline-none select-text tabular-nums border-0 focus:outline-none focus:ring-0 shadow-none placeholder:text-gray-400 dark:placeholder:text-gray-500',
          effectiveStepper === 'split' ? 'text-center' : 'text-left',
          sizeConfig.input,
          className
        )}
        {...props}
      />
    );

    // =========================================================================
    // 1. DISPOSICIÓN SPLIT: [-] a la izquierda, Input al centro, [+] a la derecha
    // =========================================================================
    if (effectiveStepper === 'split') {
      return (
        <div className={cn(wrapperBaseClasses, 'split')}>
          {/* Botón Decrementar (-) */}
          <button
            type="button"
            tabIndex={-1}
            disabled={!canDecrement}
            aria-label="Decrementar valor"
            className={cn(
              'stepper-btn self-stretch flex items-center justify-center border-0 border-r border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300',
              'transition-all select-none shrink-0 cursor-pointer',
              'hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40 hover:text-[#4f46e5] dark:hover:text-indigo-400',
              'active:scale-95',
              'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit disabled:active:scale-100',
              sizeConfig.btnSplitWidth
            )}
            {...decrementLongPress}
          >
            <div className="stepper-icon-wrapper">
              <Minus size={sizeConfig.iconSize} strokeWidth={2.5} />
            </div>
          </button>

          {/* Prefijo opcional en Split */}
          {effectivePrefix && (
            <div
              className={cn(
                'flex items-center font-semibold text-gray-500 dark:text-gray-400 select-none shrink-0 pl-2',
                sizeConfig.prefix
              )}
            >
              {effectivePrefix}
            </div>
          )}

          {/* Campo Central */}
          {inputElement}

          {/* Sufijo opcional en Split */}
          {effectiveSuffix && (
            <div
              className={cn(
                'flex items-center font-semibold text-gray-500 dark:text-gray-400 select-none shrink-0 pr-2',
                sizeConfig.suffix
              )}
            >
              {effectiveSuffix}
            </div>
          )}

          {/* Botón Incrementar (+) */}
          <button
            type="button"
            tabIndex={-1}
            disabled={!canIncrement}
            aria-label="Incrementar valor"
            className={cn(
              'stepper-btn self-stretch flex items-center justify-center border-0 border-l border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300',
              'transition-all select-none shrink-0 cursor-pointer',
              'hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40 hover:text-[#4f46e5] dark:hover:text-indigo-400',
              'active:scale-95',
              'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit disabled:active:scale-100',
              sizeConfig.btnSplitWidth
            )}
            {...incrementLongPress}
          >
            <div className="stepper-icon-wrapper">
              <Plus size={sizeConfig.iconSize} strokeWidth={2.5} />
            </div>
          </button>
        </div>
      );
    }

    // =========================================================================
    // 2. DISPOSICIONES STACKED, INLINE-RIGHT Y NONE
    // =========================================================================
    return (
      <div className={cn(wrapperBaseClasses, effectiveStepper)}>
        {/* Prefijo integrado como pastilla segmentada */}
        {effectivePrefix && (
          <div
            className={cn(
              'stacked-prefix flex items-center font-semibold text-gray-500 dark:text-gray-400 bg-gray-50/80 dark:bg-slate-800/60 border-r border-gray-200 dark:border-slate-700 select-none shrink-0 self-stretch',
              sizeConfig.prefix
            )}
          >
            {effectivePrefix}
          </div>
        )}

        {/* Input Numérico */}
        {inputElement}

        {/* Sufijo integrado como pastilla segmentada */}
        {effectiveSuffix && (
          <div
            className={cn(
              'stacked-suffix flex items-center font-semibold text-gray-500 dark:text-gray-400 bg-gray-50/80 dark:bg-slate-800/60 border-l border-gray-200 dark:border-slate-700 select-none shrink-0 self-stretch',
              sizeConfig.suffix
            )}
          >
            {effectiveSuffix}
          </div>
        )}

        {/* STEPPERS APILADOS (STACKED: ↑ arriba / ↓ abajo) */}
        {effectiveStepper === 'stacked' && (
          <div className="stepper-group flex flex-col border-l border-gray-200 dark:border-slate-700 shrink-0 self-stretch">
            {/* Arriba: Incrementar */}
            <button
              type="button"
              tabIndex={-1}
              disabled={!canIncrement}
              aria-label="Incrementar valor"
              className={cn(
                'stepper-btn relative flex-1 flex items-center justify-center border-0 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300',
                'transition-all select-none cursor-pointer',
                'hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40 hover:text-[#4f46e5] dark:hover:text-indigo-400',
                'active:scale-95',
                'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit disabled:active:scale-100',
                sizeConfig.btnStackedWidth
              )}
              {...incrementLongPress}
            >
              <div className="stepper-icon-wrapper">
                <ArrowUp size={sizeConfig.iconSize} strokeWidth={2.2} />
              </div>
            </button>

            {/* Abajo: Decrementar */}
            <button
              type="button"
              tabIndex={-1}
              disabled={!canDecrement}
              aria-label="Decrementar valor"
              className={cn(
                'stepper-btn relative flex-1 flex items-center justify-center border-0 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300',
                'transition-all select-none cursor-pointer',
                'hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40 hover:text-[#4f46e5] dark:hover:text-indigo-400',
                'active:scale-95',
                'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit disabled:active:scale-100',
                sizeConfig.btnStackedWidth
              )}
              {...decrementLongPress}
            >
              <div className="stepper-icon-wrapper">
                <ArrowDown size={sizeConfig.iconSize} strokeWidth={2.2} />
              </div>
            </button>
          </div>
        )}

        {/* STEPPERS EN LÍNEA DERECHA (INLINE-RIGHT: - arriba / + abajo) */}
        {effectiveStepper === 'inline-right' && (
          <div className="stepper-group flex flex-col border-l border-gray-200 dark:border-slate-700 shrink-0 self-stretch">
            {/* Decrementar (-) */}
            <button
              type="button"
              tabIndex={-1}
              disabled={!canDecrement}
              aria-label="Decrementar valor"
              className={cn(
                'stepper-btn relative flex-1 flex items-center justify-center border-0 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300',
                'transition-all select-none cursor-pointer',
                'hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40 hover:text-[#4f46e5] dark:hover:text-indigo-400',
                'active:scale-95',
                'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit disabled:active:scale-100',
                sizeConfig.btnInlineWidth
              )}
              {...decrementLongPress}
            >
              <div className="stepper-icon-wrapper">
                <Minus size={sizeConfig.iconSize} strokeWidth={2.5} />
              </div>
            </button>

            {/* Incrementar (+) */}
            <button
              type="button"
              tabIndex={-1}
              disabled={!canIncrement}
              aria-label="Incrementar valor"
              className={cn(
                'stepper-btn relative flex-1 flex items-center justify-center border-0 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300',
                'transition-all select-none cursor-pointer',
                'hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40 hover:text-[#4f46e5] dark:hover:text-indigo-400',
                'active:scale-95',
                'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit disabled:active:scale-100',
                sizeConfig.btnInlineWidth
              )}
              {...incrementLongPress}
            >
              <div className="stepper-icon-wrapper">
                <Plus size={sizeConfig.iconSize} strokeWidth={2.5} />
              </div>
            </button>
          </div>
        )}
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';
