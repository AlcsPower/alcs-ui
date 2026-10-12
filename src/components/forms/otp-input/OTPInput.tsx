import * as React from 'react';
import { cn } from '../../../lib/utils';

export type OTPInputState = 'normal' | 'error' | 'success';
export type OTPInputSeparator = 'dash' | 'dot' | 'space' | 'none' | React.ReactNode;

export interface OTPInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Cantidad de dígitos o caracteres esperados (por defecto 6) */
  length?: number;
  /** Valor controlado */
  value?: string;
  /** Valor no controlado inicial */
  defaultValue?: string;
  /** Callback disparado cada vez que cambia el valor completo del código */
  onChange?: (value: string) => void;
  /** Callback disparado cuando todos los caracteres han sido completados */
  onComplete?: (value: string) => void;
  /** Tipo de entrada ('number' para solo dígitos numéricos, 'text' para alfanumérico) */
  type?: 'number' | 'text';
  /** Oculta los caracteres con una máscara tipo viñeta para contraseñas/PINs */
  mask?: boolean;
  /** Escala de tamaño para cada casilla ('sm' | 'md' | 'lg') */
  size?: 'sm' | 'md' | 'lg';
  /** Estado visual ('normal' | 'error' | 'success') */
  state?: OTPInputState;
  /** Estado de error visual (compatibilidad hacia atrás con hasError) */
  hasError?: boolean;
  /** Estado de éxito visual */
  isSuccess?: boolean;
  /** Texto o nodo descriptivo de estado renderizado bajo el input */
  statusText?: React.ReactNode;
  /** Deshabilita todas las casillas */
  disabled?: boolean;
  /** Enfoca automáticamente la primera casilla al montar el componente */
  autoFocus?: boolean;
  /** Elemento separador visual ('dash' | 'dot' | 'space' | 'none' | ReactNode) */
  separator?: OTPInputSeparator;
}

const CELL_SIZES = {
  sm: 'w-9 h-[42px] text-lg rounded-[10px]',
  md: 'w-12 h-14 text-2xl rounded-[12px]',
  lg: 'w-[60px] h-[68px] text-[28px] rounded-[14px]',
};

const SEPARATOR_SIZES = {
  sm: 'h-[42px] w-4 text-base',
  md: 'h-14 w-6 text-xl',
  lg: 'h-[68px] w-7 text-2xl',
};

/**
 * Campo de entrada para códigos OTP (One-Time Password) o verificación de dos factores (2FA).
 * Admite navegación inteligente con flechas, retroceso inteligente, pegado masivo de portapapeles,
 * sombreado de estado rojo en error (con shake) y verde en éxito, y máscara para PIN.
 */
export const OTPInput = React.forwardRef<HTMLDivElement, OTPInputProps>(
  (
    {
      length = 6,
      value: controlledValue,
      defaultValue = '',
      onChange,
      onComplete,
      type = 'number',
      mask = false,
      size = 'md',
      state = 'normal',
      hasError = false,
      isSuccess = false,
      statusText,
      disabled = false,
      autoFocus = false,
      separator,
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState<string>(defaultValue);
    const currentValue = isControlled ? (controlledValue || '') : internalValue;

    const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);

    // Determinar el estado efectivo
    const effectiveState: OTPInputState = React.useMemo(() => {
      if (hasError || state === 'error') return 'error';
      if (isSuccess || state === 'success') return 'success';
      return 'normal';
    }, [state, hasError, isSuccess]);

    // Array de caracteres según el tamaño definido
    const chars = React.useMemo(() => {
      const arr = currentValue.split('').slice(0, length);
      while (arr.length < length) {
        arr.push('');
      }
      return arr;
    }, [currentValue, length]);

    const updateValue = (newChars: string[], focusIndex?: number) => {
      const combined = newChars.join('');
      if (!isControlled) {
        setInternalValue(combined);
      }
      onChange?.(combined);

      if (combined.length === length) {
        onComplete?.(combined);
      }

      if (typeof focusIndex === 'number' && focusIndex >= 0 && focusIndex < length) {
        inputsRef.current[focusIndex]?.focus();
        inputsRef.current[focusIndex]?.select();
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      let char = e.target.value;

      if (char.length > 1) {
        char = char.slice(-1);
      }

      if (type === 'number' && char && !/^\d$/.test(char)) {
        return;
      }

      const nextChars = [...chars];
      nextChars[index] = char;

      const nextFocus = char ? Math.min(index + 1, length - 1) : index;
      updateValue(nextChars, char ? nextFocus : undefined);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === 'Backspace') {
        if (!chars[index] && index > 0) {
          e.preventDefault();
          const nextChars = [...chars];
          nextChars[index - 1] = '';
          updateValue(nextChars, index - 1);
        } else if (chars[index]) {
          const nextChars = [...chars];
          nextChars[index] = '';
          updateValue(nextChars, index);
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        inputsRef.current[index - 1]?.focus();
        inputsRef.current[index - 1]?.select();
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        e.preventDefault();
        inputsRef.current[index + 1]?.focus();
        inputsRef.current[index + 1]?.select();
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text/plain').trim();
      if (!pasted) return;

      const filtered = type === 'number' ? pasted.replace(/\D/g, '') : pasted;
      const pastedChars = filtered.slice(0, length).split('');

      const nextChars = [...chars];
      for (let i = 0; i < length; i++) {
        const charAtIdx = pastedChars[i];
        if (typeof charAtIdx === 'string') {
          nextChars[i] = charAtIdx;
        }
      }

      const focusIdx = Math.min(pastedChars.length, length - 1);
      updateValue(nextChars, focusIdx);
    };

    React.useEffect(() => {
      if (autoFocus && !disabled) {
        inputsRef.current[0]?.focus();
      }
    }, [autoFocus, disabled]);

    const halfLength = Math.floor(length / 2);

    // Renderizar separador
    const renderSeparator = () => {
      if (!separator || separator === 'none') return null;

      if (separator === 'dash' || separator === '-' || separator === '—') {
        return (
          <div
            aria-hidden="true"
            className={cn(
              'flex items-center justify-center text-alcspower-muted-foreground select-none font-light',
              SEPARATOR_SIZES[size]
            )}
          >
            —
          </div>
        );
      }

      if (separator === 'dot' || separator === '•') {
        return (
          <div
            aria-hidden="true"
            className={cn(
              'flex items-center justify-center text-alcspower-muted-foreground select-none text-xs',
              SEPARATOR_SIZES[size]
            )}
          >
            •
          </div>
        );
      }

      if (separator === 'space') {
        return (
          <div
            aria-hidden="true"
            className={cn('select-none pointer-events-none', SEPARATOR_SIZES[size])}
          />
        );
      }

      return (
        <div
          aria-hidden="true"
          className={cn(
            'flex items-center justify-center text-alcspower-muted-foreground select-none font-medium',
            SEPARATOR_SIZES[size]
          )}
        >
          {separator}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        role="group"
        aria-label="Código de verificación"
        className={cn('inline-flex flex-col', className)}
        {...props}
      >
        <div className="inline-flex items-center gap-2 relative">
          {chars.map((char, index) => {
            const isMiddle = index === halfLength;
            const isFilled = Boolean(char);

            return (
              <React.Fragment key={index}>
                {separator && isMiddle && renderSeparator()}
                <input
                  ref={(node) => {
                    inputsRef.current[index] = node;
                  }}
                  type={mask ? 'password' : 'text'}
                  inputMode={type === 'number' ? 'numeric' : 'text'}
                  pattern={type === 'number' ? '[0-9]*' : undefined}
                  maxLength={1}
                  value={char}
                  disabled={disabled}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  onFocus={(e) => e.target.select()}
                  aria-label={`Dígito ${index + 1} de ${length}`}
                  aria-invalid={effectiveState === 'error' ? 'true' : undefined}
                  className={cn(
                    'text-center font-mono font-bold transition-all duration-200 select-none border-[1.5px] tabular-nums',
                    // Normal vacío
                    'border-gray-200 bg-white text-gray-900',
                    'hover:border-gray-300 hover:shadow-xs',
                    'dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:hover:border-slate-600',
                    // En foco / Activo
                    'focus:outline-none focus:border-alcspower-primary focus:-translate-y-0.5 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] dark:focus:shadow-[0_0_0_3px_rgba(99,102,241,0.25)]',
                    // Lleno con valor (estado normal)
                    isFilled &&
                      effectiveState === 'normal' &&
                      'bg-indigo-50/70 border-indigo-200 text-gray-900 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-white animate-otp-digit',
                    // Estado de Error (con shake y resplandor rojo)
                    effectiveState === 'error' &&
                      'border-red-500 bg-red-50 text-red-700 shadow-[0_0_0_3px_rgba(239,68,68,0.12)] focus:border-red-600 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2)] dark:bg-red-950/40 dark:border-red-500 dark:text-red-400 animate-otp-shake',
                    // Estado de Éxito (con resplandor verde)
                    effectiveState === 'success' &&
                      'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-[0_0_0_3px_rgba(16,185,129,0.12)] focus:border-emerald-600 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.2)] dark:bg-emerald-950/40 dark:border-emerald-500 dark:text-emerald-400',
                    // Deshabilitado
                    disabled &&
                      'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-slate-800 text-gray-400 hover:border-gray-200 hover:shadow-none',
                    // Escala de tamaño
                    CELL_SIZES[size]
                  )}
                />
              </React.Fragment>
            );
          })}
        </div>

        {/* Mensaje de estado descriptivo */}
        {statusText && (
          <div
            className={cn(
              'mt-3 flex items-center gap-2 text-xs font-medium transition-colors',
              effectiveState === 'error' && 'text-red-600 dark:text-red-400',
              effectiveState === 'success' && 'text-emerald-600 dark:text-emerald-400',
              effectiveState === 'normal' && 'text-alcspower-muted-foreground'
            )}
          >
            {effectiveState === 'error' && (
              <svg className="w-4 h-4 shrink-0 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            )}
            {effectiveState === 'success' && (
              <svg className="w-4 h-4 shrink-0 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {effectiveState === 'normal' && (
              <svg className="w-4 h-4 shrink-0 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            )}
            <span>{statusText}</span>
          </div>
        )}
      </div>
    );
  }
);

OTPInput.displayName = 'OTPInput';
