import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { Spinner } from '../../feedback/spinner';

export const buttonVariants = cva(
  'box-border inline-flex items-center justify-center font-medium whitespace-nowrap transition-all duration-150 ease-out select-none outline-none border focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-alcspower-primary/20 focus-visible:border-alcspower-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 disabled:transform-none disabled:shadow-none aria-busy:opacity-90 motion-reduce:transition-none motion-reduce:transform-none cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'border-transparent bg-alcspower-primary text-alcspower-primary-foreground shadow-2xs hover:bg-alcspower-primary-hover hover:shadow-xs active:bg-alcspower-primary-active active:scale-[0.98]',
        secondary:
          'border-alcspower-border/80 bg-alcspower-surface text-alcspower-foreground shadow-2xs hover:bg-alcspower-surface-muted hover:border-alcspower-border active:bg-alcspower-surface-subtle active:scale-[0.98]',
        outline:
          'border-alcspower-border bg-alcspower-surface/40 text-alcspower-foreground shadow-2xs hover:border-alcspower-border-subtle hover:bg-alcspower-surface active:bg-alcspower-surface-muted active:scale-[0.98]',
        ghost:
          'border-transparent bg-transparent text-alcspower-muted-foreground hover:text-alcspower-foreground hover:bg-alcspower-surface-muted active:bg-alcspower-surface-subtle active:scale-[0.98]',
        destructive:
          'border-transparent bg-alcspower-destructive text-alcspower-destructive-foreground shadow-2xs hover:bg-alcspower-destructive-hover active:bg-alcspower-destructive-active focus-visible:ring-alcspower-destructive/20 focus-visible:border-alcspower-destructive active:scale-[0.98]',
        /** @deprecated Alias para 'destructive'. Utilice 'destructive' en su lugar. */
        danger:
          'border-transparent bg-alcspower-destructive text-alcspower-destructive-foreground shadow-2xs hover:bg-alcspower-destructive-hover active:bg-alcspower-destructive-active focus-visible:ring-alcspower-destructive/20 focus-visible:border-alcspower-destructive active:scale-[0.98]',
        link:
          'border-0 bg-transparent text-alcspower-primary underline-offset-4 hover:underline p-0 h-auto font-medium hover:text-alcspower-primary-hover active:opacity-75'
      },
      size: {
        sm: 'h-8 px-3.5 text-xs rounded-lg gap-1.5',
        md: 'h-10 px-4 py-2 text-sm rounded-xl gap-2',
        lg: 'h-12 px-6 text-base rounded-xl gap-2.5',
        icon: 'h-10 w-10 p-0 rounded-xl',
        'icon-sm': 'h-8 w-8 p-0 rounded-lg',
        'icon-lg': 'h-12 w-12 p-0 rounded-xl'
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
    const isInert = Boolean(disabled || isLoading);
    const Comp = asChild ? Slot : 'button';
    const spinnerSize = size === 'lg' || size === 'icon-lg' ? 'md' : 'sm';

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isInert) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      props.onClick?.(e);
    };

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
        className={cn(
          buttonVariants({ variant, size, className }),
          isInert && asChild && 'pointer-events-none cursor-not-allowed opacity-45'
        )}
        ref={ref}
        disabled={asChild ? undefined : isInert}
        aria-disabled={isInert ? true : undefined}
        aria-busy={isLoading}
        tabIndex={isInert && asChild ? -1 : props.tabIndex}
        {...props}
        onClick={handleClick}
      >
        {content}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
