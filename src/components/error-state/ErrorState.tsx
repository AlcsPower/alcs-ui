import * as React from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export type ErrorStateVariant =
  | 'default'
  | 'inside-card'
  | 'compact'
  | 'minimal';

export type ErrorStateSize =
  | 'compact'
  | 'default'
  | 'large'
  | 'sm'
  | 'md'
  | 'lg';

export type ErrorStateSeverity =
  | 'error'
  | 'destructive'
  | 'warning'
  | 'info'
  | 'primary'
  | 'gray';

export interface ErrorStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Icono a mostrar. Si no se provee, se usa AlertCircle por defecto. Si es null o false, no se renderiza icono */
  icon?: React.ReactNode | null | false;
  /** Si es true (por defecto), envuelve el icono en un halo difuminado estilo glow con animación de flotación */
  iconWrapper?: boolean;
  /** Nivel de severidad o color temático del halo y del icono: error, warning, info, primary, gray */
  severity?: ErrorStateSeverity;
  /** Alias de severity */
  color?: ErrorStateSeverity;
  /** Tamaño del estado de error: compact/sm, default/md, large/lg */
  size?: ErrorStateSize;
  /** Variante de contenedor: default, inside-card, compact, minimal */
  variant?: ErrorStateVariant;
  /** Nivel del encabezado HTML para el título (h1, h2, h3, h4, h5, h6). Por defecto h4 */
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Título principal del error */
  title: React.ReactNode;
  /** Descripción o mensaje explicativo secundario */
  description?: React.ReactNode;
  /** Código de error técnico visible en badge (ej. ERR_CONNECTION_TIMEOUT) */
  code?: React.ReactNode;
  /** Detalles técnicos expandibles (stack trace, payload, id de dispositivo, etc.) */
  details?: React.ReactNode;
  /** Estado inicial del acordeón de detalles técnicos */
  defaultDetailsExpanded?: boolean;
  /** Texto del botón para expandir detalles técnicos */
  detailsLabel?: string;
  /** Texto del botón para contraer detalles técnicos */
  hideDetailsLabel?: string;
  /** Acción principal (botón de reintentar, volver, etc.) */
  action?: React.ReactNode;
  /** Acción secundaria opcional */
  secondaryAction?: React.ReactNode;
  /** Desactiva la animación flotante del icono */
  disableAnimation?: boolean;
}

export const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    {
      className,
      icon,
      iconWrapper = true,
      severity,
      color,
      size = 'default',
      variant = 'default',
      headingLevel: Heading = 'h4',
      title,
      description,
      code,
      details,
      defaultDetailsExpanded = false,
      detailsLabel = 'Ver detalles técnicos',
      hideDetailsLabel = 'Ocultar detalles técnicos',
      action,
      secondaryAction,
      disableAnimation = false,
      role = 'alert',
      ...props
    },
    ref
  ) => {
    const [isDetailsOpen, setIsDetailsOpen] = React.useState(defaultDetailsExpanded);

    const isCompact = size === 'compact' || size === 'sm' || variant === 'compact';
    const isLarge = size === 'large' || size === 'lg';

    const rawColor = severity || color || 'error';
    const normalizedSeverity: ErrorStateSeverity =
      rawColor === 'destructive' ? 'error' : rawColor;

    const variantClasses = {
      default: '',
      'inside-card': 'inside-card error-state-inside-card',
      compact: 'compact error-state-compact',
      minimal: 'minimal error-state-minimal',
    }[variant];

    const sizeClasses = isCompact
      ? 'compact error-state-compact'
      : isLarge
      ? 'large error-state-large'
      : '';

    const iconSizeClass = isCompact
      ? 'small compact'
      : isLarge
      ? 'large'
      : '';

    const titleClasses = isCompact
      ? 'text-[15px] sm:text-base font-bold'
      : isLarge
      ? 'text-xl sm:text-[22px] font-bold'
      : 'text-lg sm:text-xl font-bold';

    const descriptionClasses = isCompact
      ? 'text-xs sm:text-[13px] max-w-sm'
      : isLarge
      ? 'text-sm sm:text-[15px] max-w-lg'
      : 'text-sm max-w-md';

    const renderIcon = () => {
      if (icon === null || icon === false) {
        return null;
      }

      const iconElement = icon || (
        <AlertCircle className="h-6 w-6 stroke-[1.8]" aria-hidden="true" />
      );

      if (!iconWrapper) {
        return (
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-alcspower-destructive-subtle text-alcspower-destructive">
            {iconElement}
          </div>
        );
      }

      return (
        <div
          className={cn(
            'error-icon-wrapper',
            normalizedSeverity,
            iconSizeClass,
            disableAnimation && 'no-animation'
          )}
          aria-hidden="true"
        >
          {iconElement}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        role={role}
        className={cn(
          'error-state min-h-[320px]',
          variantClasses,
          sizeClasses,
          className
        )}
        {...props}
      >
        {renderIcon()}

        {code && (
          <div className="error-code">
            {code}
          </div>
        )}

        {title && (
          <Heading
            className={cn(
              'error-title tracking-tight text-alcspower-foreground',
              titleClasses
            )}
          >
            {title}
          </Heading>
        )}

        {description && (
          <p
            className={cn(
              'error-description text-alcspower-muted-foreground',
              descriptionClasses
            )}
          >
            {description}
          </p>
        )}

        {(action || secondaryAction) && (
          <div className="error-actions mt-2 flex flex-wrap items-center justify-center gap-2.5">
            {action}
            {secondaryAction}
          </div>
        )}

        {details && (
          <>
            <button
              type="button"
              className="error-details-toggle"
              onClick={() => setIsDetailsOpen((prev) => !prev)}
              aria-expanded={isDetailsOpen}
            >
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-200',
                  isDetailsOpen && 'rotate-180'
                )}
                aria-hidden="true"
              />
              {isDetailsOpen ? hideDetailsLabel : detailsLabel}
            </button>
            {isDetailsOpen && (
              <div className="error-details visible">
                {details}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

ErrorState.displayName = 'ErrorState';
