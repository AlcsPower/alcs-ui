import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Info, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export const alertVariants = cva(
  'relative w-full rounded-lg border p-4 text-sm [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-current transition-colors',
  {
    variants: {
      variant: {
        info: 'bg-alcspower-info-subtle border-alcspower-info-border text-alcspower-info [&>svg]:text-alcspower-info',
        success: 'bg-alcspower-success-subtle border-alcspower-success-border text-alcspower-success [&>svg]:text-alcspower-success',
        warning: 'bg-alcspower-warning-subtle border-alcspower-warning-border text-alcspower-warning [&>svg]:text-alcspower-warning',
        destructive: 'bg-alcspower-destructive-subtle border-alcspower-destructive-border text-alcspower-destructive [&>svg]:text-alcspower-destructive',
        danger: 'bg-alcspower-destructive-subtle border-alcspower-destructive-border text-alcspower-destructive [&>svg]:text-alcspower-destructive'
      }
    },
    defaultVariants: {
      variant: 'info'
    }
  }
);

const defaultIcons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  destructive: AlertCircle,
  danger: AlertCircle
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Permite ocultar el icono por defecto */
  hideIcon?: boolean;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', hideIcon = false, children, ...props }, ref) => {
    const IconComponent = defaultIcons[variant || 'info'];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {!hideIcon && <IconComponent className="h-5 w-5" aria-hidden="true" />}
        {children}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed opacity-95', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';
