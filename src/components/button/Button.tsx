import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Spinner } from '../spinner';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alcspower-ring focus-visible:ring-offset-2 ring-offset-alcspower-surface disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-alcspower-primary text-alcspower-primary-foreground hover:bg-alcspower-primary-hover active:bg-alcspower-primary-active shadow-sm',
        secondary:
          'bg-alcspower-secondary text-alcspower-secondary-foreground hover:bg-alcspower-secondary-hover border border-alcspower-border shadow-sm',
        outline:
          'border border-alcspower-border bg-transparent hover:bg-alcspower-surface-muted text-alcspower-foreground',
        ghost:
          'hover:bg-alcspower-surface-muted text-alcspower-foreground',
        destructive:
          'bg-alcspower-destructive text-alcspower-destructive-foreground hover:bg-alcspower-destructive-hover active:bg-alcspower-destructive-active shadow-sm focus-visible:ring-alcspower-destructive',
        /** @deprecated Alias para 'destructive'. Utilice 'destructive' en su lugar. */
        danger:
          'bg-alcspower-destructive text-alcspower-destructive-foreground hover:bg-alcspower-destructive-hover active:bg-alcspower-destructive-active shadow-sm focus-visible:ring-alcspower-destructive',
        link:
          'text-alcspower-primary underline-offset-4 hover:underline p-0 h-auto'
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

    let content = children;
    if (isLoading) {
      if (asChild && React.isValidElement(children)) {
        const childElement = children as React.ReactElement<any>;
        content = React.cloneElement(
          childElement,
          undefined,
          <Spinner size="sm" className="mr-2" />,
          loadingText || childElement.props.children
        );
      } else {
        content = (
          <>
            <Spinner size="sm" className="mr-2" />
            {loadingText || children}
          </>
        );
      }
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
