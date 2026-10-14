import * as React from 'react';
import { Lock, Eye, EyeOff, Check } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Input, type InputProps } from '../input/Input';

export interface PasswordRequirement {
  id: string;
  label: string;
  met: boolean;
}

export interface PasswordStrength {
  /** Puntuación de fortaleza de 0 (vacía) a 4 (muy robusta) */
  score: 0 | 1 | 2 | 3 | 4;
  /** Etiqueta legible del nivel de seguridad */
  label: string;
  /** Lista detallada de requisitos y su estado de cumplimiento */
  requirements?: PasswordRequirement[];
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
  /** Muestra el checklist de requisitos de seguridad cumplidos (por defecto false) */
  showRequirements?: boolean;
  /** Función personalizada para evaluar la fortaleza de la contraseña */
  calculateStrength?: (password: string) => PasswordStrength;
  /** Muestra el ícono de candado de seguridad a la izquierda (por defecto true) */
  showLockIcon?: boolean;
}

/** Evaluador de fortaleza de contraseña de 4 niveles */
export function defaultPasswordStrengthCalculator(password: string): PasswordStrength {
  const reqs: PasswordRequirement[] = [
    {
      id: 'length',
      label: 'Mínimo 8 caracteres',
      met: Boolean(password && password.length >= 8),
    },
    {
      id: 'cases',
      label: 'Mayúsculas y minúsculas',
      met: Boolean(password && /[A-Z]/.test(password) && /[a-z]/.test(password)),
    },
    {
      id: 'numbers',
      label: 'Números incluidos',
      met: Boolean(password && /[0-9]/.test(password)),
    },
    {
      id: 'symbols',
      label: 'Caracteres especiales',
      met: Boolean(password && /[^A-Za-z0-9]/.test(password)),
    },
  ];

  if (!password) {
    return {
      score: 0,
      label: 'Vacía',
      requirements: reqs,
      hints: ['Mínimo 8 caracteres'],
    };
  }

  const metCount = reqs.filter((r) => r.met).length;
  const hints = reqs.filter((r) => !r.met).map((r) => r.label);

  const labels = ['Vacía', 'Débil', 'Regular', 'Buena', 'Muy robusta'];
  const score = Math.min(Math.max(metCount, 1), 4) as 1 | 2 | 3 | 4;

  return {
    score,
    label: labels[score] || 'Débil',
    requirements: reqs,
    hints: hints.length > 0 ? hints : undefined,
  };
}

const STRENGTH_STYLES: Record<
  number,
  { bar: string; text: string; bg: string }
> = {
  0: {
    bar: 'bg-slate-200 dark:bg-slate-700',
    text: 'text-slate-400',
    bg: 'bg-slate-100 dark:bg-slate-800',
  },
  1: {
    bar: 'bg-rose-500',
    text: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-950/40',
  },
  2: {
    bar: 'bg-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
  },
  3: {
    bar: 'bg-blue-500',
    text: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
  },
  4: {
    bar: 'bg-emerald-500',
    text: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
  },
};

/**
 * PasswordInput
 * Campo de contraseña rediseñado con:
 * - Botón de alternancia (ojo) sin bordes, en gris suave, con cambio de silueta y halo/sombra solo en hover.
 * - Icono de candado izquierdo de seguridad con halo/glow radial acorde al estado.
 * - Barra medidora animada y lista de requisitos de seguridad visuales.
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
      showRequirements = false,
      calculateStrength = defaultPasswordStrengthCalculator,
      showLockIcon = true,
      leftElement,
      rightElement,
      size = 'md',
      disabled,
      hasError = false,
      hasSuccess = false,
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
      if (!showStrengthIndicator && !showRequirements) return null;
      return calculateStrength(currentPassword);
    }, [showStrengthIndicator, showRequirements, calculateStrength, currentPassword]);

    const iconSizeClass = {
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    }[size];

    // Glow y colores del icono de candado izquierdo
    const lockGlowClass = hasError
      ? 'text-rose-600 dark:text-rose-400'
      : hasSuccess
        ? 'text-emerald-600 dark:text-emerald-400'
        : 'text-alcspower-primary group-focus-within/password:text-alcspower-primary text-slate-500';

    const lockBgGlow = hasError
      ? 'bg-rose-500/15'
      : hasSuccess
        ? 'bg-emerald-500/15'
        : 'bg-indigo-500/15';

    const resolvedLeftElement =
      leftElement !== undefined ? (
        leftElement
      ) : showLockIcon ? (
        <div className="relative flex items-center justify-center pointer-events-none select-none">
          {/* Halo sutil */}
          <span
            className={cn(
              'absolute -inset-1.5 rounded-full filter blur-[5px] opacity-75 transition-colors',
              lockBgGlow
            )}
            aria-hidden="true"
          />
          <Lock className={cn(iconSizeClass, lockGlowClass, 'relative z-10')} strokeWidth={1.8} />
        </div>
      ) : undefined;

    // Botón del ojo: sin bordes, gris suave, cambia de forma, y solo se sombrea en hover
    const toggleButton = showToggle ? (
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        aria-label={isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        title={isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        className={cn(
          'group/eye relative inline-flex items-center justify-center p-1 border-0 bg-transparent rounded-full outline-none cursor-pointer select-none transition-transform duration-200',
          'hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alcspower-focus-ring/40',
          disabled && 'opacity-40 cursor-not-allowed hover:scale-100'
        )}
      >
        <span className="relative flex items-center justify-center">
          {/* Halo / sombra radial suave SOLO en hover sin borde */}
          <span
            className={cn(
              'absolute -inset-2 rounded-full pointer-events-none transition-opacity duration-200',
              'bg-[radial-gradient(circle,rgba(107,114,128,0.20)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,transparent_70%)]',
              'filter blur-[4px] opacity-0 group-hover/eye:opacity-100'
            )}
            aria-hidden="true"
          />
          {isVisible ? (
            <EyeOff
              className={cn(
                iconSizeClass,
                'relative z-10 transition-colors duration-200',
                'text-slate-400 dark:text-slate-500 group-hover/eye:text-slate-600 dark:group-hover/eye:text-slate-300'
              )}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          ) : (
            <Eye
              className={cn(
                iconSizeClass,
                'relative z-10 transition-colors duration-200',
                'text-slate-400 dark:text-slate-500 group-hover/eye:text-slate-600 dark:group-hover/eye:text-slate-300'
              )}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          )}
        </span>
      </button>
    ) : null;

    const resolvedRightElement = (
      <div className="flex items-center gap-1.5 shrink-0">
        {rightElement}
        {toggleButton}
      </div>
    );

    return (
      <div className={cn('w-full space-y-2 group/password', containerClassName)}>
        <Input
          ref={ref}
          id={id}
          type={isVisible ? 'text' : 'password'}
          value={currentPassword}
          onChange={handleChange}
          size={size}
          disabled={disabled}
          hasError={hasError}
          hasSuccess={hasSuccess}
          leftElement={resolvedLeftElement}
          rightElement={resolvedRightElement}
          className={cn('pe-10 tracking-widest font-mono placeholder:tracking-normal placeholder:font-sans', className)}
          {...props}
        />

        {showStrengthIndicator && strength && Boolean(currentPassword) && (
          <div className="space-y-2 pt-0.5 animate-in fade-in slide-in-from-top-1 duration-200">
            {/* 4 barras animadas */}
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
                const activeColor = STRENGTH_STYLES[strength.score]?.bar || 'bg-alcspower-primary';
                return (
                  <div
                    key={step}
                    className={cn(
                      'flex-1 h-full rounded-full transition-all duration-300',
                      isActive ? activeColor : 'bg-slate-200 dark:bg-slate-700'
                    )}
                  />
                );
              })}
            </div>

            {/* Etiqueta de nivel y hint */}
            <div className="flex items-center justify-between text-xs">
              <span className={cn('font-semibold', STRENGTH_STYLES[strength.score]?.text)}>
                Seguridad: {strength.label}
              </span>
              {strength.hints && strength.hints.length > 0 && (
                <span className="text-slate-500 dark:text-slate-400 text-[11px] truncate max-w-[220px]">
                  Falta: {strength.hints[0]}
                </span>
              )}
            </div>

            {/* Checklist de requisitos detallados si aplica */}
            {(showRequirements || (strength.requirements && strength.requirements.length > 0 && showRequirements)) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                {strength.requirements?.map((req) => (
                  <div
                    key={req.id}
                    className={cn(
                      'flex items-center gap-1.5 transition-colors',
                      req.met
                        ? 'text-emerald-700 dark:text-emerald-400 font-medium'
                        : 'text-slate-400 dark:text-slate-500'
                    )}
                  >
                    <span
                      className={cn(
                        'w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors',
                        req.met ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-transparent'
                      )}
                    >
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span>{req.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
