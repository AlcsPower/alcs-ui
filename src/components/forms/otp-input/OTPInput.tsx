import * as React from 'react';
import { cn } from '../../../lib/utils';

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
  /** Estado de error visual */
  hasError?: boolean;
  /** Deshabilita todas las casillas */
  disabled?: boolean;
  /** Enfoca automáticamente la primera casilla al montar el componente */
  autoFocus?: boolean;
  /** Elemento separador visual (ej: guion) o renderizado automático en la mitad */
  separator?: React.ReactNode;
}

const SIZE_CLASSES = {
  sm: 'w-8 h-9 text-base rounded-md',
  md: 'w-10 h-12 text-lg rounded-lg',
  lg: 'w-12 h-14 text-xl rounded-xl',
};

/**
 * Campo de entrada para códigos OTP (One-Time Password) o verificación de dos factores (2FA).
 * Admite navegación con flechas, retroceso inteligente, pegado masivo de portapapeles y anuncio a11y.
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
      hasError = false,
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

    return (
      <div
        ref={ref}
        role="group"
        aria-label="Código de verificación"
        className={cn('inline-flex items-center gap-2', className)}
        {...props}
      >
        {chars.map((char, index) => {
          const isMiddle = index === halfLength;
          return (
            <React.Fragment key={index}>
              {separator && isMiddle && (
                <span className="text-alcspower-muted-foreground select-none px-1 font-bold">
                  {separator}
                </span>
              )}
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
                aria-invalid={hasError ? 'true' : undefined}
                className={cn(
                  'text-center font-mono font-semibold transition-all duration-150',
                  'border border-alcspower-input-border bg-white dark:bg-slate-900 text-alcspower-foreground',
                  'focus:outline-none focus:border-alcspower-primary focus:ring-2 focus:ring-alcspower-focus-ring/25',
                  hasError && 'border-rose-500 focus:border-rose-500 focus:ring-rose-200 dark:focus:ring-rose-950',
                  disabled && 'opacity-50 cursor-not-allowed bg-alcspower-surface-muted',
                  SIZE_CLASSES[size]
                )}
              />
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

OTPInput.displayName = 'OTPInput';
