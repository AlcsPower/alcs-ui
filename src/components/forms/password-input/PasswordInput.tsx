import * as React from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Input, type InputProps } from '../input/Input';

export interface PasswordStrength {
  /** Puntuación de fortaleza de 0 (vacía) a 4 (excelente) */
  score: 0 | 1 | 2 | 3 | 4;
  /** Etiqueta legible del nivel de seguridad */
  label: string;
  /** Sugerencias o requisitos pendientes */
  hints?: string[];
}

export interface PasswordInputProps extends Omit<InputProps, 'type'> {
  /** Permite alternar la visibilidad entre texto plano y máscara (por defecto true) */
  showToggle?: boolean;
  /** Visibilidad inicial en modo no controlado */
  defaultVisible?: boolean;
  /** Visibilidad forzada en modo controlado */
  visible?: boolean;
  /** Callback cuando cambia la visibilidad */
  onVisibilityChange?: (visible: boolean) => void;
  /** Muestra la barra medidora de seguridad debajo del campo (por defecto false) */
  showStrengthIndicator?: boolean;
  /** Función personalizada para evaluar la fortaleza de la contraseña */
  calculateStrength?: (password: string) => PasswordStrength;
  /** Muestra el ícono de candado institucional a la izquierda por defecto (por defecto false) */
  showLockIcon?: boolean;
}

/** Evaluador de seguridad por defecto */
export function defaultPasswordStrengthCalculator(password: string): PasswordStrength {
  if (!password) {
    return { score: 0, label: 'Vacía', hints: ['Ingresa al menos 8 caracteres'] };
  }

  const hints: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  } else {
    hints.push('Mínimo 8 caracteres');
  }

  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
    score += 1;
  } else {
    hints.push('Mayúsculas y minúsculas');
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    hints.push('Al menos un número');
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  } else {
    hints.push('Al menos un símbolo especial (!@#$%)');
  }

  const labels = ['Vacía', 'Muy débil', 'Débil', 'Segura', 'Muy robusta'];

  return {
    score: Math.min(Math.max(score, 1), 4) as 1 | 2 | 3 | 4,
    label: labels[score] || 'Débil',
    hints: hints.length > 0 ? hints : undefined,
  };
}

const STRENGTH_COLORS: Record<number, { bar: string; text: string }> = {
  0: { bar: 'bg-alcspower-surface-muted', text: 'text-alcspower-muted-foreground' },
  1: { bar: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400' },
  2: { bar: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
  3: { bar: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400' },
  4: { bar: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
};

/**
 * Campo de contraseña con conmutador de visibilidad accesible (Eye/EyeOff),
 * compatibilidad con tamaño y variantes de formulario, e indicador de seguridad opcional.
 */
export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      value: controlledValue,
      defaultValue = '',
      onChange,
      showToggle = true,
      defaultVisible = false,
      visible: controlledVisible,
      onVisibilityChange,
      showStrengthIndicator = false,
      calculateStrength = defaultPasswordStrengthCalculator,
      showLockIcon = false,
      leftElement,
      rightElement,
      size = 'md',
      disabled,
      className,
      containerClassName,
      id,
      ...props
    },
    ref
  ) => {
    const isControlledValue = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState<string>(String(defaultValue));
    const currentPassword = isControlledValue ? String(controlledValue) : internalValue;

    const isControlledVisible = controlledVisible !== undefined;
    const [internalVisible, setInternalVisible] = React.useState<boolean>(defaultVisible);
    const isVisible = isControlledVisible ? controlledVisible : internalVisible;

    const handleToggle = () => {
      if (disabled) return;
      const nextVisible = !isVisible;
      if (!isControlledVisible) {
        setInternalVisible(nextVisible);
      }
      onVisibilityChange?.(nextVisible);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlledValue) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const strength = React.useMemo(() => {
      if (!showStrengthIndicator) return null;
      return calculateStrength(currentPassword);
    }, [showStrengthIndicator, calculateStrength, currentPassword]);

    const iconSizeClass = {
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    }[size];

    const resolvedLeftElement = leftElement ?? (showLockIcon ? (
      <Lock className={cn(iconSizeClass, 'text-alcspower-muted-foreground pointer-events-none')} />
    ) : undefined);

    const toggleButton = showToggle ? (
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        aria-label={isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        className={cn(
          'p-1 rounded-md text-alcspower-muted-foreground hover:text-alcspower-foreground hover:bg-alcspower-surface-muted transition-colors cursor-pointer',
          'disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alcspower-focus-ring'
        )}
      >
        {isVisible ? (
          <EyeOff className={iconSizeClass} aria-hidden="true" />
        ) : (
          <Eye className={iconSizeClass} aria-hidden="true" />
        )}
      </button>
    ) : null;

    const resolvedRightElement = (
      <div className="flex items-center gap-1.5 shrink-0">
        {rightElement}
        {toggleButton}
      </div>
    );

    return (
      <div className={cn('w-full space-y-2', containerClassName)}>
        <Input
          ref={ref}
          id={id}
          type={isVisible ? 'text' : 'password'}
          value={currentPassword}
          onChange={handleChange}
          size={size}
          disabled={disabled}
          leftElement={resolvedLeftElement}
          rightElement={resolvedRightElement}
          className={cn('pe-10', className)}
          {...props}
        />

        {showStrengthIndicator && strength && Boolean(currentPassword) && (
          <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
            {/* Barra segmentada de 4 niveles */}
            <div
              className="flex items-center gap-1.5 h-1.5 w-full"
              role="meter"
              aria-label="Fortaleza de la contraseña"
              aria-valuenow={strength.score}
              aria-valuemin={0}
              aria-valuemax={4}
              aria-valuetext={strength.label}
            >
              {[1, 2, 3, 4].map((step) => {
                const isActive = strength.score >= step;
                const activeColor = STRENGTH_COLORS[strength.score]?.bar || 'bg-alcspower-primary';
                return (
                  <div
                    key={step}
                    className={cn(
                      'flex-1 h-full rounded-full transition-all duration-300',
                      isActive ? activeColor : 'bg-alcspower-surface-muted/60 dark:bg-slate-700'
                    )}
                  />
                );
              })}
            </div>

            {/* Etiqueta y sugerencias */}
            <div className="flex items-center justify-between text-xs">
              <span className={cn('font-medium', STRENGTH_COLORS[strength.score]?.text)}>
                Seguridad: {strength.label}
              </span>
              {strength.hints && strength.hints.length > 0 && (
                <span className="text-alcspower-muted-foreground truncate max-w-[200px]">
                  Falta: {strength.hints[0]}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
