import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const gridVariants = cva('grid box-border w-full', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      12: 'grid-cols-12',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      '2xl': 'gap-12',
    },
    flow: {
      row: 'grid-flow-row',
      col: 'grid-flow-col',
      dense: 'grid-flow-dense',
      'row-dense': 'grid-flow-row-dense',
      'col-dense': 'grid-flow-col-dense',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
  },
  defaultVariants: {
    cols: 1,
    gap: 'md',
    flow: 'row',
    align: 'stretch',
  },
});

const COLS_SM_MAP: Record<number, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
  6: 'sm:grid-cols-6',
  12: 'sm:grid-cols-12',
};

const COLS_MD_MAP: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
  12: 'md:grid-cols-12',
};

const COLS_LG_MAP: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
  12: 'lg:grid-cols-12',
};

const COLS_XL_MAP: Record<number, string> = {
  1: 'xl:grid-cols-1',
  2: 'xl:grid-cols-2',
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
  5: 'xl:grid-cols-5',
  6: 'xl:grid-cols-6',
  12: 'xl:grid-cols-12',
};

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  /** Elemento HTML a renderizar. Predeterminado: 'div'. */
  as?: React.ElementType;
  /** Columnas en pantalla pequeña (≥640px) */
  colsSm?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  /** Columnas en pantalla mediana (≥768px) */
  colsMd?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  /** Columnas en pantalla grande (≥1024px) */
  colsLg?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  /** Columnas en pantalla extra grande (≥1280px) */
  colsXl?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
}

/**
 * `Grid` es el primitivo de rejilla CSS bidimensional de `@alcspower/ui`.
 * Ofrece control intuitivo de columnas base y quiebres responsivos fluidos.
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      as: Component = 'div',
      cols,
      gap,
      flow,
      align,
      colsSm,
      colsMd,
      colsLg,
      colsXl,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const responsiveClasses = [
      colsSm && COLS_SM_MAP[colsSm],
      colsMd && COLS_MD_MAP[colsMd],
      colsLg && COLS_LG_MAP[colsLg],
      colsXl && COLS_XL_MAP[colsXl],
    ].filter(Boolean);

    return (
      <Component
        ref={ref}
        className={cn(
          gridVariants({ cols, gap, flow, align }),
          responsiveClasses,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Grid.displayName = 'Grid';

/* -------------------------------------------------------------------------- */
/*                                  GridItem                                  */
/* -------------------------------------------------------------------------- */

const COL_SPAN_MAP: Record<number | 'full', string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  12: 'col-span-12',
  full: 'col-span-full',
};

const ROW_SPAN_MAP: Record<number | 'full', string> = {
  1: 'row-span-1',
  2: 'row-span-2',
  3: 'row-span-3',
  4: 'row-span-4',
  5: 'row-span-5',
  6: 'row-span-6',
  full: 'row-span-full',
};

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Elemento HTML a renderizar. Predeterminado: 'div'. */
  as?: React.ElementType;
  /** Cuántas columnas abarca este elemento */
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'full';
  /** Cuántas filas abarca este elemento */
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 'full';
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ as: Component = 'div', colSpan, rowSpan, className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          colSpan && COL_SPAN_MAP[colSpan],
          rowSpan && ROW_SPAN_MAP[rowSpan],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

GridItem.displayName = 'GridItem';
