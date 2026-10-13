import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const containerVariants = cva('w-full box-border', {
  variants: {
    maxWidth: {
      sm: 'max-w-(--breakpoint-sm)',
      md: 'max-w-(--breakpoint-md)',
      lg: 'max-w-(--breakpoint-lg)',
      xl: 'max-w-(--breakpoint-xl)',
      '2xl': 'max-w-(--breakpoint-2xl)',
      prose: 'max-w-prose',
      full: 'max-w-full',
    },
    padding: {
      none: 'px-0',
      sm: 'px-4 sm:px-6',
      md: 'px-4 sm:px-6 lg:px-8',
      lg: 'px-6 sm:px-8 lg:px-12',
      xl: 'px-8 sm:px-12 lg:px-16',
    },
    centered: {
      true: 'mx-auto',
      false: 'mx-0',
    },
  },
  defaultVariants: {
    maxWidth: 'xl',
    padding: 'md',
    centered: true,
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  /** Elemento HTML a renderizar (ej. 'div', 'main', 'section', 'article'). Predeterminado: 'div'. */
  as?: React.ElementType;
}

/**
 * `Container` es el primitivo de envoltura responsiva de `@alcspower/ui`.
 * Centra y delimita horizontalmente el contenido según la escala de quiebres institucionales.
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      as: Component = 'div',
      maxWidth,
      padding,
      centered,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(containerVariants({ maxWidth, padding, centered }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';
