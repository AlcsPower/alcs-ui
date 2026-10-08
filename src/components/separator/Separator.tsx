import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const separatorVariants = cva('shrink-0 transition-all select-none', {
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full min-h-[24px] self-stretch'
    },
    variant: {
      default: '',
      soft: '',
      thick: '',
      dashed: '',
      dotted: '',
      gradient: ''
    },
    color: {
      default: '',
      primary: '',
      success: '',
      warning: '',
      error: '',
      destructive: ''
    },
    inset: {
      true: '',
      false: ''
    }
  },
  compoundVariants: [
    // HORIZONTAL + VARIANT
    {
      orientation: 'horizontal',
      variant: 'default',
      className: 'h-[1px] bg-slate-200 dark:bg-slate-800'
    },
    {
      orientation: 'horizontal',
      variant: 'soft',
      className: 'h-[1px] bg-slate-100 dark:bg-slate-800/60'
    },
    {
      orientation: 'horizontal',
      variant: 'thick',
      className: 'h-[2px] bg-slate-300 dark:bg-slate-700'
    },
    {
      orientation: 'horizontal',
      variant: 'dashed',
      className: 'h-[1px] bg-transparent separator-dashed-horizontal text-slate-300 dark:text-slate-600'
    },
    {
      orientation: 'horizontal',
      variant: 'dotted',
      className: 'h-[2px] bg-transparent separator-dotted-horizontal text-slate-300 dark:text-slate-600'
    },
    {
      orientation: 'horizontal',
      variant: 'gradient',
      className: 'h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600'
    },

    // VERTICAL + VARIANT
    {
      orientation: 'vertical',
      variant: 'default',
      className: 'w-[1px] bg-slate-200 dark:bg-slate-800'
    },
    {
      orientation: 'vertical',
      variant: 'soft',
      className: 'w-[1px] bg-slate-100 dark:bg-slate-800/60'
    },
    {
      orientation: 'vertical',
      variant: 'thick',
      className: 'w-[2px] bg-slate-300 dark:bg-slate-700'
    },
    {
      orientation: 'vertical',
      variant: 'dashed',
      className: 'w-[1px] bg-transparent separator-dashed-vertical text-slate-300 dark:text-slate-600'
    },
    {
      orientation: 'vertical',
      variant: 'dotted',
      className: 'w-[2px] bg-transparent separator-dotted-vertical text-slate-300 dark:text-slate-600'
    },
    {
      orientation: 'vertical',
      variant: 'gradient',
      className: 'w-[1px] bg-gradient-to-b from-transparent via-slate-300 to-transparent dark:via-slate-600'
    },

    // COLORS
    {
      color: 'primary',
      orientation: 'horizontal',
      className: 'h-[2px] bg-alcspower-primary dark:bg-blue-500 border-alcspower-primary dark:border-blue-500'
    },
    {
      color: 'primary',
      orientation: 'vertical',
      className: 'w-[2px] bg-alcspower-primary dark:bg-blue-500 border-alcspower-primary dark:border-blue-500'
    },
    {
      color: 'success',
      orientation: 'horizontal',
      className: 'h-[2px] bg-emerald-500 dark:bg-emerald-400 border-emerald-500 dark:border-emerald-400'
    },
    {
      color: 'success',
      orientation: 'vertical',
      className: 'w-[2px] bg-emerald-500 dark:bg-emerald-400 border-emerald-500 dark:border-emerald-400'
    },
    {
      color: 'warning',
      orientation: 'horizontal',
      className: 'h-[2px] bg-amber-500 dark:bg-amber-400 border-amber-500 dark:border-amber-400'
    },
    {
      color: 'warning',
      orientation: 'vertical',
      className: 'w-[2px] bg-amber-500 dark:bg-amber-400 border-amber-500 dark:border-amber-400'
    },
    {
      color: 'error',
      orientation: 'horizontal',
      className: 'h-[2px] bg-red-500 dark:bg-red-400 border-red-500 dark:border-red-400'
    },
    {
      color: 'error',
      orientation: 'vertical',
      className: 'w-[2px] bg-red-500 dark:bg-red-400 border-red-500 dark:border-red-400'
    },
    {
      color: 'destructive',
      orientation: 'horizontal',
      className: 'h-[2px] bg-red-500 dark:bg-red-400 border-red-500 dark:border-red-400'
    },
    {
      color: 'destructive',
      orientation: 'vertical',
      className: 'w-[2px] bg-red-500 dark:bg-red-400 border-red-500 dark:border-red-400'
    },

    // INSET
    {
      orientation: 'horizontal',
      inset: true,
      className: 'mx-6 w-auto'
    },
    {
      orientation: 'vertical',
      inset: true,
      className: 'my-3 h-auto'
    }
  ],
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'default',
    color: 'default',
    inset: false
  }
});

export type SeparatorVariant = 'default' | 'soft' | 'thick' | 'dashed' | 'dotted' | 'gradient';
export type SeparatorColor = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'destructive';
export type SeparatorLabelVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'destructive';

export interface SeparatorProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
      'color' | 'orientation'
    >,
    VariantProps<typeof separatorVariants> {
  /** Orientación del separador */
  orientation?: 'horizontal' | 'vertical';
  /** Estilo visual del trazo */
  variant?: SeparatorVariant;
  /** Color semántico o de marca */
  color?: SeparatorColor;
  /** Texto o contenido decorativo central */
  label?: React.ReactNode;
  /** Variante visual de la etiqueta de texto */
  labelVariant?: SeparatorLabelVariant;
  /** Si debe tener margen interior en los extremos */
  inset?: boolean;
}

export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      orientation = 'horizontal',
      decorative = true,
      variant = 'default',
      color = 'default',
      inset = false,
      label,
      labelVariant,
      children,
      ...props
    },
    ref
  ) => {
    const textContent = label ?? children;
    const resolvedLabelVariant: SeparatorLabelVariant =
      labelVariant ?? (color && color !== 'default' ? color : 'default');

    // MODO CON TEXTO
    if (textContent !== undefined && textContent !== null) {
      if (orientation === 'vertical') {
        return (
          <div
            role="none"
            className={cn(
              'inline-flex flex-col items-center gap-2 h-full min-h-[48px]',
              inset && 'my-3',
              className
            )}
          >
            <SeparatorPrimitive.Root
              ref={ref}
              decorative={decorative}
              orientation="vertical"
              className={cn(
                separatorVariants({ orientation: 'vertical', variant, color, inset: false }),
                'flex-1 min-h-[12px]'
              )}
              {...props}
            />
            <span
              className={cn(
                'text-[11px] font-semibold tracking-wider px-1.5 py-0.5 rounded whitespace-nowrap shrink-0 transition-colors',
                resolvedLabelVariant === 'default' &&
                  'text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900',
                resolvedLabelVariant === 'primary' &&
                  'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70',
                resolvedLabelVariant === 'success' &&
                  'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70',
                resolvedLabelVariant === 'warning' &&
                  'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/70',
                (resolvedLabelVariant === 'error' || resolvedLabelVariant === 'destructive') &&
                  'text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/70'
              )}
            >
              {textContent}
            </span>
            <SeparatorPrimitive.Root
              decorative={decorative}
              orientation="vertical"
              className={cn(
                separatorVariants({ orientation: 'vertical', variant, color, inset: false }),
                'flex-1 min-h-[12px]'
              )}
            />
          </div>
        );
      }

      // Horizontal con texto
      return (
        <div
          role="none"
          className={cn(
            'flex items-center gap-4 w-full my-4',
            inset && 'px-6',
            className
          )}
        >
          <SeparatorPrimitive.Root
            ref={ref}
            decorative={decorative}
            orientation="horizontal"
            className={cn(
              separatorVariants({ orientation: 'horizontal', variant, color, inset: false }),
              'flex-1'
            )}
            {...props}
          />
          <span
            className={cn(
              'text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap shrink-0 transition-colors shadow-2xs',
              resolvedLabelVariant === 'default' &&
                'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
              resolvedLabelVariant === 'primary' &&
                'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300',
              resolvedLabelVariant === 'success' &&
                'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300',
              resolvedLabelVariant === 'warning' &&
                'bg-amber-50 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300',
              (resolvedLabelVariant === 'error' || resolvedLabelVariant === 'destructive') &&
                'bg-red-50 text-red-700 dark:bg-red-950/70 dark:text-red-300'
            )}
          >
            {textContent}
          </span>
          <SeparatorPrimitive.Root
            decorative={decorative}
            orientation="horizontal"
            className={cn(
              separatorVariants({ orientation: 'horizontal', variant, color, inset: false }),
              'flex-1'
            )}
          />
        </div>
      );
    }

    // MODO ESTÁNDAR (Línea pura sin texto)
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          separatorVariants({ orientation, variant, color, inset }),
          className
        )}
        {...props}
      />
    );
  }
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export interface SeparatorWithTextProps extends SeparatorProps {
  children?: React.ReactNode;
}

export const SeparatorWithText = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorWithTextProps
>(({ children, label, ...props }, ref) => (
  <Separator ref={ref} label={label ?? children} {...props} />
));
SeparatorWithText.displayName = 'SeparatorWithText';

export { Separator as default };
