import * as React from 'react';
import { cn } from '../../../lib/utils';
import {
  Spinner,
  type SpinnerVariantType,
  type SpinnerColorType
} from '../spinner';
import { Progress } from '../progress';

export interface LoadingOverlayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Determina si el overlay de carga está visible.
   * @default true
   */
  visible?: boolean;
  /**
   * Texto descriptivo principal del estado de carga. Si es null o false, no se muestra texto.
   * @default 'Cargando...'
   */
  label?: React.ReactNode;
  /**
   * Texto descriptivo secundario o de detalle (ej. '3 de 12 registros').
   */
  description?: React.ReactNode;
  /**
   * Porcentaje numérico (0 a 100) para mostrar una barra de progreso integrada.
   */
  progress?: number;
  /**
   * Tamaño del indicador de giro (spinner).
   * @default 'md'
   */
  spinnerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Variante gráfica del Spinner: 'classic', 'ring', 'dots', 'bars', 'pulse' o 'dual-ring'.
   * @default 'classic'
   */
  spinnerVariant?: SpinnerVariantType;
  /**
   * Color semántico del Spinner: 'primary', 'success', 'warning', 'error', 'destructive', 'info', 'gray', 'white' o 'current'.
   * @default 'primary'
   */
  spinnerColor?: SpinnerColorType;
  /**
   * Nodo o componente de spinner personalizado para sustituir el Spinner por defecto.
   */
  spinner?: React.ReactNode;
  /**
   * Nivel de difuminado del fondo del overlay (backdrop blur).
   * @default 'sm'
   */
  blur?: 'none' | 'sm' | 'md' | 'lg';
}

export const LoadingOverlay = React.forwardRef<
  HTMLDivElement,
  LoadingOverlayProps
>(
  (
    {
      visible = true,
      label = 'Cargando...',
      description,
      progress,
      spinnerSize = 'md',
      spinnerVariant = 'classic',
      spinnerColor = 'primary',
      spinner,
      blur = 'sm',
      className,
      children,
      ...props
    },
    ref
  ) => {
    if (!visible) {
      return null;
    }

    const blurClasses = {
      none: '',
      sm: 'backdrop-blur-[2px]',
      md: 'backdrop-blur-sm',
      lg: 'backdrop-blur-md'
    }[blur];

    const accessibilityLabel =
      (props as any)['aria-label'] ||
      (typeof label === 'string' && label.length > 0
        ? typeof description === 'string' && description.length > 0
          ? `${label}: ${description}`
          : label
        : undefined);

    const progressVariant =
      spinnerColor === 'error' || spinnerColor === 'destructive'
        ? 'destructive'
        : spinnerColor === 'success'
        ? 'success'
        : spinnerColor === 'warning'
        ? 'warning'
        : spinnerColor === 'info'
        ? 'info'
        : 'default';

    return (
      <div
        ref={ref}
        role="status"
        aria-busy="true"
        aria-label={accessibilityLabel}
        className={cn(
          'absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 rounded-[inherit] bg-alcspower-surface/80 dark:bg-alcspower-surface/85 transition-all animate-in fade-in-50',
          blurClasses,
          className
        )}
        {...props}
      >
        {spinner ?? (
          <Spinner
            variant={spinnerVariant}
            size={spinnerSize}
            color={spinnerColor}
            aria-hidden="true"
          />
        )}
        {label ? (
          <p
            aria-hidden="true"
            className={cn(
              'select-none',
              description || typeof progress === 'number'
                ? 'text-xs font-semibold text-alcspower-foreground'
                : 'text-xs font-medium text-alcspower-muted-foreground'
            )}
          >
            {label}
          </p>
        ) : null}
        {description ? (
          <p
            aria-hidden="true"
            className="text-[11px] text-alcspower-muted-foreground select-none -mt-1"
          >
            {description}
          </p>
        ) : null}
        {typeof progress === 'number' ? (
          <div className="w-36 max-w-[80%] mt-0.5">
            <Progress
              value={progress}
              size="sm"
              variant={progressVariant}
            />
          </div>
        ) : null}
        {children}
      </div>
    );
  }
);

LoadingOverlay.displayName = 'LoadingOverlay';
