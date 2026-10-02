import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Spinner } from '../spinner';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mific-ring focus-visible:ring-offset-2 ring-offset-mific-surface disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-mific-primary text-mific-primary-foreground hover:bg-mific-primary-hover active:bg-mific-primary-active shadow-sm',
        secondary:
          'bg-mific-secondary text-mific-secondary-foreground hover:bg-mific-secondary-hover border border-mific-border shadow-sm',
        outline:
          'border border-mific-border bg-transparent hover:bg-mific-surface-muted text-mific-foreground',
        ghost:
          'hover:bg-mific-surface-muted text-mific-foreground',
        danger:
          'bg-mific-destructive text-mific-destructive-foreground hover:bg-mific-destructive-hover active:bg-mific-destructive-active shadow-sm focus-visible:ring-mific-destructive',
        link:
          'text-mific-primary underline-offset-4 hover:underline p-0 h-auto'
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10 p-0'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Permite renderizar como un elemento hijo (ej. <a> o <Link>) manteniendo accesibilidad y estilos */
  asChild?: boolean;
  /** Muestra un indicador de carga y desactiva la interacción */
  isLoading?: boolean;
  /** Texto opcional para lectores de pantalla mientras carga */
  loadingText?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      loadingText,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner size="sm" className="mr-2" />
            {loadingText || children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
