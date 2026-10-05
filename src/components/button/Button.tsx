import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Spinner } from '../spinner';

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold whitespace-nowrap transition-all duration-200 ease-out select-none outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-alcspower-surface focus-visible:ring-alcspower-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 disabled:transform-none disabled:shadow-none aria-busy:opacity-90 motion-reduce:transition-none motion-reduce:transform-none',
  {
    variants: {
      variant: {
        primary:
          'bg-alcspower-primary text-alcspower-primary-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-alcspower-primary-hover hover:shadow-md hover:-translate-y-0.5 active:bg-alcspower-primary-active active:translate-y-0 active:shadow-sm',
        secondary:
          'bg-alcspower-secondary text-alcspower-secondary-foreground border border-alcspower-border shadow-sm hover:bg-alcspower-secondary-hover hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:bg-alcspower-surface-muted',
        outline:
          'border border-alcspower-border-subtle bg-transparent text-alcspower-foreground shadow-sm hover:border-alcspower-border hover:bg-alcspower-surface-subtle hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:bg-alcspower-surface-muted',
        ghost:
          'bg-transparent text-alcspower-muted-foreground hover:text-alcspower-foreground hover:bg-alcspower-surface-muted active:bg-alcspower-secondary active:text-alcspower-foreground',
        destructive:
          'bg-alcspower-destructive text-alcspower-destructive-foreground shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-alcspower-destructive-hover hover:shadow-md hover:-translate-y-0.5 active:bg-alcspower-destructive-active active:translate-y-0 active:shadow-sm focus-visible:ring-alcspower-destructive',
        /** @deprecated Alias para 'destructive'. Utilice 'destructive' en su lugar. */
        danger:
          'bg-alcspower-destructive text-alcspower-destructive-foreground shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-alcspower-destructive-hover hover:shadow-md hover:-translate-y-0.5 active:bg-alcspower-destructive-active active:translate-y-0 active:shadow-sm focus-visible:ring-alcspower-destructive',
        link:
          'text-alcspower-primary underline-offset-4 hover:underline p-0 h-auto font-semibold hover:text-alcspower-primary-hover active:opacity-75'
      },
      size: {
        sm: 'h-8 px-3.5 text-xs rounded-sm gap-1.5',
        md: 'h-10 px-5 py-2 text-sm rounded-md gap-2',
        lg: 'h-12 px-7 text-base rounded-lg gap-2.5',
        icon: 'h-10 w-10 p-0 rounded-md',
        'icon-sm': 'h-8 w-8 p-0 rounded-sm',
        'icon-lg': 'h-12 w-12 p-0 rounded-lg'
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
    const spinnerSize = size === 'lg' || size === 'icon-lg' ? 'md' : 'sm';

    let content = children;
    if (isLoading) {
      if (asChild && React.isValidElement(children)) {
        const childElement = children as React.ReactElement<any>;
        content = React.cloneElement(
          childElement,
          undefined,
          <Spinner size={spinnerSize} />,
          loadingText || childElement.props.children
        );
      } else {
        content = (
          <>
            <Spinner size={spinnerSize} />
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
