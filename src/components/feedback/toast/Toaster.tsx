import * as React from 'react';
import { Toaster as Sonner, type ToasterProps as SonnerToasterProps } from 'sonner';
import { Check, AlertCircle, AlertTriangle, Info, Loader2, X, Bell } from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface ToasterProps extends SonnerToasterProps {
  /**
   * Clases adicionales para el contenedor o los toasts
   */
  className?: string;
}

const defaultIcons = {
  success: (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400">
      <Check className="h-4 w-4 stroke-[2.5]" />
    </div>
  ),
  error: (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-400">
      <AlertCircle className="h-4 w-4 stroke-[2.5]" />
    </div>
  ),
  warning: (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-400">
      <AlertTriangle className="h-4 w-4 stroke-[2.5]" />
    </div>
  ),
  info: (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-400">
      <Info className="h-4 w-4 stroke-[2.5]" />
    </div>
  ),
  loading: (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-400">
      <Loader2 className="h-4 w-4 stroke-[2.5] animate-spin" />
    </div>
  ),
  close: <X className="h-3.5 w-3.5" />,
};

/**
 * Componente `Toaster` institucional de `@alcspower/ui`.
 * Basado en `sonner`, con soporte completo de tema claro/oscuro,
 * iconos contextuales tipo squircle, barra de progreso y tokens semánticos.
 */
export const Toaster: React.FC<ToasterProps> = ({
  position = 'bottom-right',
  closeButton = true,
  richColors = false,
  expand = true,
  duration = 4000,
  gap = 12,
  toastOptions,
  icons,
  ...props
}) => {
  return (
    <Sonner
      position={position}
      closeButton={closeButton}
      richColors={richColors}
      expand={expand}
      duration={duration}
      gap={gap}
      className="toaster group font-sans"
      icons={{
        ...defaultIcons,
        ...icons,
      }}
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-alcspower-surface group-[.toaster]:text-alcspower-text-primary group-[.toaster]:border-alcspower-border group-[.toaster]:shadow-alcspower-lg group-[.toaster]:rounded-xl group-[.toaster]:text-sm group-[.toaster]:border group-[.toaster]:p-3.5 group-[.toaster]:gap-3',
          title: 'group-[.toast]:font-semibold group-[.toast]:text-alcspower-text-primary text-sm',
          description: 'group-[.toast]:text-alcspower-text-secondary text-xs mt-0.5',
          actionButton:
            'group-[.toast]:bg-indigo-600 group-[.toast]:text-white group-[.toast]:font-medium group-[.toast]:rounded-lg group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-xs hover:group-[.toast]:bg-indigo-700 transition-colors shadow-sm',
          cancelButton:
            'group-[.toast]:bg-transparent group-[.toast]:text-alcspower-text-secondary group-[.toast]:font-medium group-[.toast]:rounded-lg group-[.toast]:px-2.5 group-[.toast]:py-1.5 group-[.toast]:text-xs hover:group-[.toast]:bg-alcspower-surface-muted transition-colors',
          closeButton:
            'group-[.toast]:bg-transparent group-[.toast]:text-alcspower-text-muted group-[.toast]:border-0 hover:group-[.toast]:text-alcspower-text-primary hover:group-[.toast]:bg-alcspower-surface-muted transition-colors',
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  );
};

Toaster.displayName = 'Toaster';

export interface ToastCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Variante semántica del toast
   * @default 'default'
   */
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  /**
   * Título principal de la notificación
   */
  title?: React.ReactNode;
  /**
   * Descripción o detalle secundario
   */
  description?: React.ReactNode;
  /**
   * Ícono personalizado (anula el ícono predeterminado de la variante)
   */
  icon?: React.ReactNode;
  /**
   * Botón de acción principal
   */
  action?: {
    label: React.ReactNode;
    onClick?: () => void;
  };
  /**
   * Botón de cancelación / descarte
   */
  cancel?: {
    label: React.ReactNode;
    onClick?: () => void;
  };
  /**
   * Manejador de evento al hacer clic en el botón de cerrar
   */
  onClose?: () => void;
  /**
   * Si debe mostrar la barra de progreso/acento inferior
   * @default true
   */
  showProgress?: boolean;
  /**
   * Porcentaje de completado de la barra de progreso (0 a 100)
   * @default 100
   */
  progressPercent?: number;
}

/**
 * Componente `ToastCard` para renderizado estático o incrustado de notificaciones toast.
 * Presenta el mismo diseño squircle, barra inferior y botones de acción que los toasts activos.
 */
export const ToastCard = React.forwardRef<HTMLDivElement, ToastCardProps>(
  (
    {
      variant = 'default',
      title,
      description,
      icon,
      action,
      cancel,
      onClose,
      showProgress = true,
      progressPercent = 100,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const renderIcon = () => {
      if (icon !== undefined) return icon;
      switch (variant) {
        case 'success':
          return (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400">
              <Check className="h-4 w-4 stroke-[2.5]" />
            </div>
          );
        case 'error':
          return (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-400">
              <AlertCircle className="h-4 w-4 stroke-[2.5]" />
            </div>
          );
        case 'warning':
          return (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-400">
              <AlertTriangle className="h-4 w-4 stroke-[2.5]" />
            </div>
          );
        case 'info':
          return (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-400">
              <Info className="h-4 w-4 stroke-[2.5]" />
            </div>
          );
        default:
          return (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-alcspower-surface-muted text-alcspower-text-secondary">
              <Bell className="h-4 w-4 stroke-[2]" />
            </div>
          );
      }
    };

    const getProgressBarColor = () => {
      switch (variant) {
        case 'success':
          return 'bg-emerald-500';
        case 'error':
          return 'bg-rose-500';
        case 'warning':
          return 'bg-amber-500';
        case 'info':
          return 'bg-blue-500';
        default:
          return 'bg-indigo-600';
      }
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          'relative flex flex-col overflow-hidden rounded-xl border border-alcspower-border bg-alcspower-surface p-4 text-alcspower-text-primary shadow-alcspower-md transition-all',
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3.5 w-full">
          {renderIcon()}

          <div className="flex-1 min-w-0 pr-6">
            {title && (
              <div className="font-semibold text-sm text-alcspower-text-primary leading-tight">
                {title}
              </div>
            )}
            {description && (
              <p className="text-xs text-alcspower-text-secondary mt-1 leading-normal">
                {description}
              </p>
            )}
            {children}

            {(action || cancel) && (
              <div className="mt-3 flex items-center gap-2">
                {action && (
                  <button
                    type="button"
                    onClick={action.onClick}
                    className="inline-flex items-center justify-center rounded-lg border-0 bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 active:scale-95 transition-all"
                  >
                    {action.label}
                  </button>
                )}
                {cancel && (
                  <button
                    type="button"
                    onClick={cancel.onClick}
                    className="inline-flex items-center justify-center rounded-lg border-0 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 px-3 py-1.5 text-xs font-medium active:scale-95 transition-all"
                  >
                    {cancel.label}
                  </button>
                )}
              </div>
            )}
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar notificación"
              className="absolute top-3.5 right-3.5 inline-flex h-6 w-6 items-center justify-center rounded-md border-0 bg-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-alcspower-surface-muted shadow-none outline-none transition-colors"
            >
              <X className="h-4 w-4 stroke-[1.75]" />
            </button>
          )}
        </div>

        {showProgress && (
          <div
            className={cn('absolute bottom-0 left-0 h-[3px] rounded-b-xl', getProgressBarColor())}
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          />
        )}
      </div>
    );
  }
);

ToastCard.displayName = 'ToastCard';
