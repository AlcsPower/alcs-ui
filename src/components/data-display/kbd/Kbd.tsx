import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

// ==========================================
// Constantes y Mapeo de Símbolos
// ==========================================

export const KBD_SYMBOLS = {
  cmd: '⌘',
  command: '⌘',
  shift: '⇧',
  alt: '⌥',
  option: '⌥',
  ctrl: 'Ctrl',
  control: 'Ctrl',
  enter: '↵',
  return: '↵',
  escape: 'Esc',
  esc: 'Esc',
  tab: '⇥',
  backspace: '⌫',
  delete: 'Del',
  up: '↑',
  down: '↓',
  left: '←',
  right: '→',
  space: 'Espacio',
} as const;

export type KbdKey = keyof typeof KBD_SYMBOLS;

// ==========================================
// Variantes CVA
// ==========================================

export const kbdVariants = cva(
  'inline-flex items-center justify-center font-mono font-semibold select-none tabular-nums tracking-tight transition-colors align-middle leading-none',
  {
    variants: {
      variant: {
        outline:
          'border border-alcspower-border bg-alcspower-surface text-alcspower-foreground shadow-[0_1.5px_0_1px_rgba(0,0,0,0.06)] dark:shadow-[0_1.5px_0_1px_rgba(255,255,255,0.08)]',
        solid:
          'bg-alcspower-surface-muted text-alcspower-foreground border border-transparent shadow-none',
        subtle:
          'bg-alcspower-surface-muted/50 border border-alcspower-border-subtle text-alcspower-muted-foreground shadow-2xs',
        ghost:
          'bg-transparent border border-transparent text-alcspower-muted-foreground',
      },
      size: {
        xs: 'h-4 min-w-[1rem] px-1 text-[10px] rounded',
        sm: 'h-5 min-w-[1.25rem] px-1.5 text-[11px] rounded-md',
        md: 'h-6 min-w-[1.5rem] px-2 text-xs rounded-md',
        lg: 'h-7 min-w-[1.75rem] px-2.5 text-sm rounded-lg',
      },
      shape: {
        rounded: '',
        squircle: 'rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'sm',
      shape: 'rounded',
    },
  }
);

// ==========================================
// Kbd Props e Implementación
// ==========================================

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {
  as?: 'kbd' | 'span';
}

/**
 * Primitiva accesible `<kbd>` para representar teclas o atajos de teclado individuales.
 */
export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  (
    {
      as: Component = 'kbd',
      variant,
      size,
      shape,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(kbdVariants({ variant, size, shape }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Kbd.displayName = 'Kbd';

// ==========================================
// KbdGroup
// ==========================================

export interface KbdGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  separator?: React.ReactNode;
}

/**
 * Contenedor para combinaciones de teclas con espaciado y separadores semánticos (`+`).
 */
export const KbdGroup = React.forwardRef<HTMLDivElement, KbdGroupProps>(
  ({ separator, className, children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);

    return (
      <div
        ref={ref}
        role="group"
        aria-label="Combinación de atajos de teclado"
        className={cn('inline-flex items-center gap-1', className)}
        {...props}
      >
        {separator
          ? childrenArray.map((child, index) => (
              <React.Fragment key={index}>
                {child}
                {index < childrenArray.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="text-[11px] font-mono text-alcspower-muted-foreground select-none px-0.5"
                  >
                    {separator}
                  </span>
                )}
              </React.Fragment>
            ))
          : children}
      </div>
    );
  }
);
KbdGroup.displayName = 'KbdGroup';
