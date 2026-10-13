import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const stackVariants = cva('flex box-border', {
  variants: {
    direction: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },
    spacing: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      '2xl': 'gap-12',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
  },
  defaultVariants: {
    direction: 'vertical',
    spacing: 'md',
    align: 'stretch',
    justify: 'start',
    wrap: false,
  },
});

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  /** Elemento HTML a renderizar. Predeterminado: 'div'. */
  as?: React.ElementType;
  /** Elemento o componente divisor intercalado entre cada hijo directo (ej. <Separator />) */
  divider?: React.ReactNode;
}

/**
 * `Stack` es el primitivo de distribución unidimensional flexbox de `@alcspower/ui`.
 * Facilita el apilamiento vertical u horizontal con espaciados semánticos y divisores automáticos.
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      as: Component = 'div',
      direction,
      spacing,
      align,
      justify,
      wrap,
      divider,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const validChildren = React.Children.toArray(children).filter(Boolean);
    const content = divider
      ? validChildren.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {index < validChildren.length - 1 && (
              <span className="shrink-0 flex items-center justify-center self-stretch" aria-hidden="true">
                {divider}
              </span>
            )}
          </React.Fragment>
        ))
      : children;

    return (
      <Component
        ref={ref}
        className={cn(stackVariants({ direction, spacing, align, justify, wrap }), className)}
        {...props}
      >
        {content}
      </Component>
    );
  }
);

Stack.displayName = 'Stack';
