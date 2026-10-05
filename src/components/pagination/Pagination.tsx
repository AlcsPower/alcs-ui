import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

/* ------------------------------------------------------------------ */
/*  Pagination (nav wrapper)                                           */
/* ------------------------------------------------------------------ */

export interface PaginationProps extends React.ComponentProps<'nav'> {}

export const Pagination: React.FC<PaginationProps> = ({
  className,
  ...props
}) => (
  <nav
    role="navigation"
    aria-label="Paginación"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

/* ------------------------------------------------------------------ */
/*  PaginationContent                                                  */
/* ------------------------------------------------------------------ */

export const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

/* ------------------------------------------------------------------ */
/*  PaginationItem                                                     */
/* ------------------------------------------------------------------ */

export const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

/* ------------------------------------------------------------------ */
/*  PaginationLink (button)                                            */
/* ------------------------------------------------------------------ */

export const paginationLinkVariants = cva(
  'inline-flex items-center justify-center rounded-alcspower-md border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alcspower-ring focus-visible:ring-offset-2 ring-offset-alcspower-surface disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      isActive: {
        true:  'bg-alcspower-primary text-alcspower-primary-foreground border-alcspower-primary hover:bg-alcspower-primary-hover',
        false: 'bg-alcspower-surface text-alcspower-foreground border-alcspower-border hover:bg-alcspower-surface-muted',
      },
      size: {
        sm: 'h-8 min-w-8 px-2.5 text-xs',
        md: 'h-9 min-w-9 px-3 text-sm',
      }
    },
    defaultVariants: { isActive: false, size: 'md' }
  }
);

export interface PaginationLinkProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof paginationLinkVariants> {}

export const PaginationLink = React.forwardRef<
  HTMLButtonElement,
  PaginationLinkProps
>(({ className, isActive, size, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-current={isActive ? 'page' : undefined}
    className={cn(paginationLinkVariants({ isActive, size }), className)}
    {...props}
  />
));
PaginationLink.displayName = 'PaginationLink';

/* ------------------------------------------------------------------ */
/*  PaginationPrevious                                                 */
/* ------------------------------------------------------------------ */

export const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof PaginationLink>
>(({ className, children, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Ir a la página anterior"
    className={cn('gap-1', className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>{children ?? 'Anterior'}</span>
  </PaginationLink>
));
PaginationPrevious.displayName = 'PaginationPrevious';

/* ------------------------------------------------------------------ */
/*  PaginationNext                                                     */
/* ------------------------------------------------------------------ */

export const PaginationNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof PaginationLink>
>(({ className, children, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Ir a la página siguiente"
    className={cn('gap-1', className)}
    {...props}
  >
    <span>{children ?? 'Siguiente'}</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
));
PaginationNext.displayName = 'PaginationNext';

/* ------------------------------------------------------------------ */
/*  PaginationEllipsis                                                 */
/* ------------------------------------------------------------------ */

export interface PaginationEllipsisProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export const PaginationEllipsis: React.FC<PaginationEllipsisProps> = ({
  className,
  ...props
}) => (
  <span
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal aria-hidden="true" className="h-4 w-4 text-alcspower-muted-foreground" />
    <span className="sr-only">Más páginas</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';
