import * as React from 'react';
import { cn } from '../../lib/utils';
import { Spinner } from '../spinner';

export interface LoadingOverlayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Determina si el overlay de carga está visible.
   * @default true
   */
  visible?: boolean;
  /**
   * Texto descriptivo del estado de carga.
   * @default 'Cargando...'
   */
  label?: string;
  /**
   * Tamaño del indicador de giro (spinner).
   * @default 'md'
   */
  spinnerSize?: 'sm' | 'md' | 'lg' | 'xl';
}

export const LoadingOverlay = React.forwardRef<
  HTMLDivElement,
  LoadingOverlayProps
>(
  (
    {
      visible = true,
      label = 'Cargando...',
      spinnerSize = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    if (!visible) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="status"
        aria-busy="true"
        aria-label={label || undefined}
        className={cn(
          'absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 rounded-inherit bg-alcspower-surface/75 backdrop-blur-[1px] transition-all animate-in fade-in-50',
          className
        )}
        {...props}
      >
        <Spinner size={spinnerSize} aria-hidden="true" />
        {label ? (
          <p
            aria-hidden="true"
            className="text-xs font-medium text-alcspower-muted-foreground"
          >
            {label}
          </p>
        ) : null}
        {children}
      </div>
    );
  }
);

LoadingOverlay.displayName = 'LoadingOverlay';
