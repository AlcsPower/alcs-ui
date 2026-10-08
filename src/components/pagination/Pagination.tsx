import * as React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

/* ------------------------------------------------------------------ */
/*  Tipos y Contexto de Paginación                                    */
/* ------------------------------------------------------------------ */

export type PaginationSize = 'sm' | 'md' | 'lg';
export type PaginationVariant = 'default' | 'filled' | 'minimal';
export type PaginationColor = 'default' | 'primary' | 'success' | 'warning' | 'error';

interface PaginationContextValue {
  size?: PaginationSize;
  variant?: PaginationVariant;
  color?: PaginationColor;
}

const PaginationContext = React.createContext<PaginationContextValue>({
  size: 'md',
  variant: 'default',
  color: 'default'
});

export const usePaginationContext = () => React.useContext(PaginationContext);

/* ------------------------------------------------------------------ */
/*  Pagination (nav wrapper)                                          */
/* ------------------------------------------------------------------ */

export interface PaginationProps extends React.ComponentProps<'nav'> {
  /** Tamaño de los elementos de paginación ('sm' | 'md' | 'lg') */
  size?: PaginationSize;
  /** Variante visual ('default' | 'filled' | 'minimal') */
  variant?: PaginationVariant;
  /** Color semántico ('default' | 'primary' | 'success' | 'warning' | 'error') */
  color?: PaginationColor;
  /** Si debe centrarse horizontalmente (por defecto true) */
  centered?: boolean;
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      size = 'md',
      variant = 'default',
      color = 'default',
      centered = true,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <PaginationContext.Provider value={{ size, variant, color }}>
        <nav
          ref={ref}
          role="navigation"
          aria-label="Paginación"
          className={cn(
            'flex w-full select-none',
            centered ? 'mx-auto justify-center' : 'justify-start',
            className
          )}
          {...props}
        >
          {children}
        </nav>
      </PaginationContext.Provider>
    );
  }
);
Pagination.displayName = 'Pagination';

/* ------------------------------------------------------------------ */
/*  PaginationContent (ul wrapper)                                     */
/* ------------------------------------------------------------------ */

export const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1 sm:gap-1.5 p-0 m-0 list-none', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

/* ------------------------------------------------------------------ */
/*  PaginationItem (li wrapper)                                        */
/* ------------------------------------------------------------------ */

export const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('inline-flex items-center', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

/* ------------------------------------------------------------------ */
/*  paginationLinkVariants (CVA)                                      */
/* ------------------------------------------------------------------ */

export const paginationLinkVariants = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alcspower-ring focus-visible:ring-offset-2 ring-offset-alcspower-surface disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
  {
    variants: {
      isActive: {
        true: '',
        false: ''
      },
      size: {
        sm: 'h-8 min-w-8 px-2.5 text-xs rounded-md',
        md: 'h-9 min-w-9 px-3 text-sm rounded-lg',
        lg: 'h-11 min-w-11 px-4 text-sm font-semibold rounded-xl'
      },
      variant: {
        default: 'border border-alcspower-border shadow-2xs active:translate-y-0',
        filled: 'border border-transparent active:translate-y-0',
        minimal: 'border border-transparent active:translate-y-0'
      },
      color: {
        default: '',
        primary: '',
        success: '',
        warning: '',
        error: ''
      }
    },
    compoundVariants: [
      // 1. INACTIVO + VARIANTE DEFAULT (OUTLINED)
      {
        isActive: false,
        variant: 'default',
        className: 'bg-alcspower-surface text-alcspower-foreground hover:-translate-y-0.5 hover:shadow-xs'
      },
      // 2. INACTIVO + VARIANTE FILLED
      {
        isActive: false,
        variant: 'filled',
        className: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white hover:-translate-y-0.5'
      },
      // 3. INACTIVO + VARIANTE MINIMAL
      {
        isActive: false,
        variant: 'minimal',
        className: 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
      },

      // 4. ACTIVO + DEFAULT COLOR (PRIMARY)
      {
        isActive: true,
        color: ['default', 'primary'],
        variant: ['default', 'filled'],
        className: 'bg-alcspower-primary text-alcspower-primary-foreground border-alcspower-primary font-bold shadow-xs hover:bg-alcspower-primary-hover hover:border-alcspower-primary-hover'
      },
      {
        isActive: true,
        color: ['default', 'primary'],
        variant: 'minimal',
        className: 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border-transparent font-bold shadow-none'
      },

      // 5. ACTIVO + SUCCESS
      {
        isActive: true,
        color: 'success',
        variant: ['default', 'filled'],
        className: 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs hover:bg-emerald-700 hover:border-emerald-700'
      },
      {
        isActive: true,
        color: 'success',
        variant: 'minimal',
        className: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-transparent font-bold shadow-none'
      },

      // 6. ACTIVO + WARNING
      {
        isActive: true,
        color: 'warning',
        variant: ['default', 'filled'],
        className: 'bg-amber-500 text-white border-amber-500 font-bold shadow-xs hover:bg-amber-600 hover:border-amber-600'
      },
      {
        isActive: true,
        color: 'warning',
        variant: 'minimal',
        className: 'bg-amber-50 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border-transparent font-bold shadow-none'
      },

      // 7. ACTIVO + ERROR
      {
        isActive: true,
        color: 'error',
        variant: ['default', 'filled'],
        className: 'bg-red-600 text-white border-red-600 font-bold shadow-xs hover:bg-red-700 hover:border-red-700'
      },
      {
        isActive: true,
        color: 'error',
        variant: 'minimal',
        className: 'bg-red-50 dark:bg-red-950/70 text-red-800 dark:text-red-300 border-transparent font-bold shadow-none'
      },

      // 8. HOVER COLORS PARA BOTONES INACTIVOS
      {
        isActive: false,
        color: ['default', 'primary'],
        variant: 'default',
        className: 'hover:border-blue-200 dark:hover:border-blue-800 hover:bg-blue-50/70 dark:hover:bg-blue-950/40 hover:text-blue-700 dark:hover:text-blue-300'
      },
      {
        isActive: false,
        color: 'success',
        variant: 'default',
        className: 'hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-800 dark:hover:text-emerald-300'
      },
      {
        isActive: false,
        color: 'warning',
        variant: 'default',
        className: 'hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-800 dark:hover:text-amber-300'
      },
      {
        isActive: false,
        color: 'error',
        variant: 'default',
        className: 'hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-800 dark:hover:text-red-300'
      }
    ],
    defaultVariants: {
      isActive: false,
      size: 'md',
      variant: 'default',
      color: 'default'
    }
  }
);

/* ------------------------------------------------------------------ */
/*  PaginationLink (botón o link)                                      */
/* ------------------------------------------------------------------ */

export interface PaginationLinkProps
  extends Omit<React.ComponentProps<'button'>, 'color'>,
    VariantProps<typeof paginationLinkVariants> {}

export const PaginationLink = React.forwardRef<
  HTMLButtonElement,
  PaginationLinkProps
>(({ className, isActive = false, size, variant, color, ...props }, ref) => {
  const context = usePaginationContext();
  const resolvedSize = size ?? context.size ?? 'md';
  const resolvedVariant = variant ?? context.variant ?? 'default';
  const resolvedColor = (color ?? context.color ?? 'default') as PaginationColor;

  return (
    <button
      ref={ref}
      type="button"
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        paginationLinkVariants({
          isActive,
          size: resolvedSize,
          variant: resolvedVariant,
          color: resolvedColor
        }),
        className
      )}
      {...props}
    />
  );
});
PaginationLink.displayName = 'PaginationLink';

/* ------------------------------------------------------------------ */
/*  PaginationPrevious                                                 */
/* ------------------------------------------------------------------ */

export const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof PaginationLink>
>(({ className, children, size, ...props }, ref) => {
  const context = usePaginationContext();
  const resolvedSize = size ?? context.size ?? 'md';

  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-4.5 w-4.5'
  };

  return (
    <PaginationLink
      ref={ref}
      size={resolvedSize}
      aria-label="Ir a la página anterior"
      className={cn('gap-1.5 px-3 font-semibold', className)}
      {...props}
    >
      <ChevronLeft className={iconSizes[resolvedSize]} />
      <span>{children ?? 'Anterior'}</span>
    </PaginationLink>
  );
});
PaginationPrevious.displayName = 'PaginationPrevious';

/* ------------------------------------------------------------------ */
/*  PaginationNext                                                     */
/* ------------------------------------------------------------------ */

export const PaginationNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof PaginationLink>
>(({ className, children, size, ...props }, ref) => {
  const context = usePaginationContext();
  const resolvedSize = size ?? context.size ?? 'md';

  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-4.5 w-4.5'
  };

  return (
    <PaginationLink
      ref={ref}
      size={resolvedSize}
      aria-label="Ir a la página siguiente"
      className={cn('gap-1.5 px-3 font-semibold', className)}
      {...props}
    >
      <span>{children ?? 'Siguiente'}</span>
      <ChevronRight className={iconSizes[resolvedSize]} />
    </PaginationLink>
  );
});
PaginationNext.displayName = 'PaginationNext';

/* ------------------------------------------------------------------ */
/*  PaginationFirst (Ir al inicio: «)                                  */
/* ------------------------------------------------------------------ */

export const PaginationFirst = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof PaginationLink>
>(({ className, children, size, ...props }, ref) => {
  const context = usePaginationContext();
  const resolvedSize = size ?? context.size ?? 'md';

  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-4.5 w-4.5'
  };

  return (
    <PaginationLink
      ref={ref}
      size={resolvedSize}
      aria-label="Ir a la primera página"
      className={cn(children ? 'gap-1.5 px-3' : 'px-0', className)}
      {...props}
    >
      <ChevronsLeft className={iconSizes[resolvedSize]} />
      {children && <span>{children}</span>}
    </PaginationLink>
  );
});
PaginationFirst.displayName = 'PaginationFirst';

/* ------------------------------------------------------------------ */
/*  PaginationLast (Ir al final: »)                                    */
/* ------------------------------------------------------------------ */

export const PaginationLast = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof PaginationLink>
>(({ className, children, size, ...props }, ref) => {
  const context = usePaginationContext();
  const resolvedSize = size ?? context.size ?? 'md';

  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-4.5 w-4.5'
  };

  return (
    <PaginationLink
      ref={ref}
      size={resolvedSize}
      aria-label="Ir a la última página"
      className={cn(children ? 'gap-1.5 px-3' : 'px-0', className)}
      {...props}
    >
      {children && <span>{children}</span>}
      <ChevronsRight className={iconSizes[resolvedSize]} />
    </PaginationLink>
  );
});
PaginationLast.displayName = 'PaginationLast';

/* ------------------------------------------------------------------ */
/*  PaginationEllipsis                                                 */
/* ------------------------------------------------------------------ */

export interface PaginationEllipsisProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  size?: PaginationSize;
}

export const PaginationEllipsis: React.FC<PaginationEllipsisProps> = ({
  className,
  size,
  ...props
}) => {
  const context = usePaginationContext();
  const resolvedSize = size ?? context.size ?? 'md';

  const sizeClasses = {
    sm: 'h-8 min-w-8',
    md: 'h-9 min-w-9',
    lg: 'h-11 min-w-11'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center select-none cursor-default',
        sizeClasses[resolvedSize],
        className
      )}
      {...props}
    >
      <MoreHorizontal aria-hidden="true" className="h-4 w-4 text-alcspower-muted-foreground" />
      <span className="sr-only">Más páginas</span>
    </span>
  );
};
PaginationEllipsis.displayName = 'PaginationEllipsis';

/* ------------------------------------------------------------------ */
/*  PaginationInfo (Indicador: Página X de Y)                         */
/* ------------------------------------------------------------------ */

export interface PaginationInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage?: number;
  totalPages?: number;
  totalResults?: number;
}

export const PaginationInfo: React.FC<PaginationInfoProps> = ({
  className,
  currentPage,
  totalPages,
  totalResults,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 text-xs text-alcspower-muted-foreground font-medium select-none',
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          Página <strong className="font-bold text-alcspower-foreground">{currentPage}</strong> de{' '}
          <strong className="font-bold text-alcspower-foreground">{totalPages}</strong>
          {totalResults !== undefined && (
            <span className="ml-1 text-slate-400">· {totalResults} resultados</span>
          )}
        </>
      )}
    </div>
  );
};
PaginationInfo.displayName = 'PaginationInfo';
