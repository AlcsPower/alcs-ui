import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const scrollbarVariants = cva(
  'flex touch-none select-none transition-colors duration-200 z-10',
  {
    variants: {
      orientation: {
        vertical: 'h-full border-l border-l-transparent hover:bg-alcspower-surface-muted/40',
        horizontal: 'w-full border-t border-t-transparent hover:bg-alcspower-surface-muted/40 flex-col',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    compoundVariants: [
      { orientation: 'vertical', size: 'sm', className: 'w-1.5 p-[1px]' },
      { orientation: 'vertical', size: 'md', className: 'w-2.5 p-0.5' },
      { orientation: 'vertical', size: 'lg', className: 'w-3.5 p-1' },
      { orientation: 'horizontal', size: 'sm', className: 'h-1.5 p-[1px]' },
      { orientation: 'horizontal', size: 'md', className: 'h-2.5 p-0.5' },
      { orientation: 'horizontal', size: 'lg', className: 'h-3.5 p-1' },
    ],
    defaultVariants: {
      orientation: 'vertical',
      size: 'md',
    },
  }
);

export interface ScrollBarProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
      'orientation'
    >,
    VariantProps<typeof scrollbarVariants> {
  /**
   * Clases personalizadas para el pulgar de arrastre (thumb).
   */
  thumbClassName?: string;
}

/**
 * `ScrollBar` representa la pista y el indicador de desplazamiento accesible.
 */
export const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ className, thumbClassName, orientation = 'vertical', size = 'md', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation === 'horizontal' ? 'horizontal' : 'vertical'}
    className={cn(scrollbarVariants({ orientation, size }), className)}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={cn(
        'relative flex-1 rounded-full bg-alcspower-border-strong/50 hover:bg-alcspower-muted-foreground/60 active:bg-alcspower-muted-foreground/80 transition-colors duration-150',
        thumbClassName
      )}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export const ScrollAreaViewport = ScrollAreaPrimitive.Viewport;
export const ScrollAreaThumb = ScrollAreaPrimitive.Thumb;
export const ScrollAreaCorner = ScrollAreaPrimitive.Corner;

export interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  /**
   * Orientación de la barra de desplazamiento:
   * - 'vertical': solo barra vertical (predeterminado)
   * - 'horizontal': solo barra horizontal
   * - 'both': barras en ambos ejes con esquina automática
   */
  orientation?: 'vertical' | 'horizontal' | 'both';
  /**
   * Escala de grosor de las barras ('sm' | 'md' | 'lg').
   * Predeterminado: 'md'.
   */
  scrollbarSize?: 'sm' | 'md' | 'lg';
  /**
   * Clases CSS personalizadas para el contenedor Viewport interno.
   */
  viewportClassName?: string;
  /**
   * Clases personalizadas para el pulgar de arrastre (thumb).
   */
  thumbClassName?: string;
  /**
   * Ref para acceder al nodo DOM del Viewport.
   */
  viewportRef?: React.Ref<HTMLDivElement>;
}

/**
 * `ScrollArea` aumenta el soporte nativo de scroll con barras de desplazamiento
 * personalizables y accesibles que respetan el diseño Craft Minimalist de `@alcspower/ui`.
 */
export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(
  (
    {
      className,
      children,
      orientation = 'vertical',
      scrollbarSize = 'md',
      viewportClassName,
      thumbClassName,
      viewportRef,
      type = 'hover',
      scrollHideDelay = 600,
      ...props
    },
    ref
  ) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      type={type}
      scrollHideDelay={scrollHideDelay}
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        className={cn('h-full w-full rounded-[inherit]', viewportClassName)}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>

      {(orientation === 'vertical' || orientation === 'both') && (
        <ScrollBar
          orientation="vertical"
          size={scrollbarSize}
          thumbClassName={thumbClassName}
        />
      )}

      {(orientation === 'horizontal' || orientation === 'both') && (
        <ScrollBar
          orientation="horizontal"
          size={scrollbarSize}
          thumbClassName={thumbClassName}
        />
      )}

      {orientation === 'both' && <ScrollAreaPrimitive.Corner className="bg-transparent" />}
    </ScrollAreaPrimitive.Root>
  )
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
