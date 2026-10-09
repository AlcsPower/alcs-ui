import * as React from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '../../../lib/utils';

export type EmptyStateVariant = 'default' | 'dashed' | 'inside-card' | 'compact' | 'minimal';
export type EmptyStateSize = 'compact' | 'default' | 'large' | 'sm' | 'md' | 'lg';
export type EmptyStateColor =
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'destructive'
  | 'info'
  | 'gray';

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Icono a mostrar. Si no se provee, se usa Inbox por defecto. Si es null o false, no se renderiza icono */
  icon?: React.ReactNode | null | false;
  /** Si es true (por defecto), envuelve el icono en un halo difuminado estilo glow con animación de flotación */
  iconWrapper?: boolean;
  /** Color temático del halo y del icono: primary, success, warning, error, info, gray */
  color?: EmptyStateColor;
  /** Tamaño del estado vacío: compact/sm, default/md, large/lg */
  size?: EmptyStateSize;
  /** Variante de contenedor: default/dashed, inside-card, compact, minimal */
  variant?: EmptyStateVariant;
  /** Nivel del encabezado HTML para el título (h2, h3, h4, etc.) */
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Título principal del estado vacío */
  title: React.ReactNode;
  /** Descripción o mensaje explicativo secundario */
  description?: React.ReactNode;
  /** Acción principal (botón o grupo de controles) */
  action?: React.ReactNode;
  /** Acción secundaria opcional */
  secondaryAction?: React.ReactNode;
  /** Desactiva la animación flotante del icono (además del respeto automático a prefers-reduced-motion) */
  disableAnimation?: boolean;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      icon,
      iconWrapper = true,
      color = 'primary',
      size = 'default',
      variant = 'default',
      headingLevel: Heading = 'h3',
      title,
      description,
      action,
      secondaryAction,
      disableAnimation = false,
      role = 'status',
      ...props
    },
    ref
  ) => {
    const isCompact = size === 'compact' || size === 'sm' || variant === 'compact';
    const isLarge = size === 'large' || size === 'lg';

    const normalizedColor: EmptyStateColor =
      color === 'destructive' ? 'error' : color;

    const variantClasses = {
      default: '',
      dashed: '',
      'inside-card': 'inside-card empty-state-inside-card',
      compact: 'compact empty-state-compact',
      minimal: 'minimal empty-state-minimal'
    }[variant];

    const sizeClasses = isCompact
      ? 'compact empty-state-compact'
      : isLarge
      ? 'large empty-state-large'
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
        <Inbox aria-hidden="true" className="h-full w-full stroke-[1.8]" />
      );

      if (!iconWrapper) {
        return <div className="mb-4">{iconElement}</div>;
      }

      return (
        <div
          className={cn(
            'empty-icon-wrapper',
            normalizedColor,
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
          'empty-state',
          variantClasses,
          sizeClasses,
          className
        )}
        {...props}
      >
        {renderIcon()}

        {title && (
          <Heading
            className={cn(
              'empty-title tracking-tight text-alcspower-foreground',
              titleClasses
            )}
          >
            {title}
          </Heading>
        )}

        {description && (
          <p
            className={cn(
              'empty-description mt-2 leading-relaxed text-alcspower-muted-foreground',
              descriptionClasses
            )}
          >
            {description}
          </p>
        )}

        {(action || secondaryAction) && (
          <div className="empty-actions mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {action}
            {secondaryAction}
          </div>
        )}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
