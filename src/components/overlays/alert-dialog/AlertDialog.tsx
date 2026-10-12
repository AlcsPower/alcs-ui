import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { buttonVariants } from '../../forms/button';
import { Spinner } from '../../feedback/spinner';

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;

export const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-alcspower-overlay/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-5 border border-alcspower-border/80 bg-alcspower-surface-card p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-3xl',
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

export const AlertDialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className
    )}
    {...props}
  />
));
AlertDialogHeader.displayName = 'AlertDialogHeader';

export const AlertDialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 sm:gap-0 pt-2',
      className
    )}
    {...props}
  />
));
AlertDialogFooter.displayName = 'AlertDialogFooter';

export const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-tight tracking-tight text-alcspower-foreground',
      className
    )}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

export const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-alcspower-muted-foreground leading-relaxed', className)}
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

export const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & {
    variant?: 'primary' | 'destructive' | 'secondary' | 'outline';
  }
>(({ className, variant = 'destructive', ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants({ variant }), className)}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

export const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: 'outline' }), className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

/* ==========================================================================
   ConfirmDialog (High-Level Composite)
   ========================================================================== */

export interface ConfirmDialogProps {
  /** Controla el estado abierto/cerrado */
  open?: boolean;
  /** Callback al cambiar la apertura */
  onOpenChange?: (open: boolean) => void;
  /** Elemento desencadenante opcional */
  trigger?: React.ReactNode;
  /** Título principal de la alerta de confirmación */
  title: React.ReactNode;
  /** Descripción o detalles explicativos de las consecuencias */
  description?: React.ReactNode;
  /** Texto del botón de confirmación */
  confirmLabel?: string;
  /** Texto del botón de cancelación */
  cancelLabel?: string;
  /** Nivel semántico de la confirmación */
  variant?: 'destructive' | 'warning' | 'info';
  /** Callback ejecutado al confirmar (puede ser asíncrono) */
  onConfirm?: () => void | Promise<void>;
  /** Callback al cancelar o cerrar */
  onCancel?: () => void;
  /** Muestra indicador de carga y deshabilita botones */
  isLoading?: boolean;
  /** Ícono personalizado superior */
  icon?: React.ReactNode;
  /** Contenido secundario opcional dentro del diálogo */
  children?: React.ReactNode;
}

const VARIANT_ICONS = {
  destructive: AlertTriangle,
  warning: AlertCircle,
  info: Info,
};

const VARIANT_BADGE_CLASSES = {
  destructive: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 ring-4 ring-rose-500/5',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 ring-4 ring-amber-500/5',
  info: 'bg-alcspower-primary/10 text-alcspower-primary border-alcspower-primary/20 ring-4 ring-alcspower-primary/5',
};

const VARIANT_ACTION_VARIANTS: Record<'destructive' | 'warning' | 'info', 'destructive' | 'primary' | 'secondary'> = {
  destructive: 'destructive',
  warning: 'primary',
  info: 'primary',
};

/**
 * ConfirmDialog
 * Diálogo modal semántico accesible de confirmación para acciones críticas, irreversibles o destructivas.
 */
export function ConfirmDialog({
  open: controlledOpen,
  onOpenChange,
  trigger,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'destructive',
  onConfirm,
  onCancel,
  isLoading = false,
  icon,
  children,
}: ConfirmDialogProps) {
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const [internalLoading, setInternalLoading] = React.useState(false);
  const loading = isLoading || internalLoading;

  const IconComponent = VARIANT_ICONS[variant];

  const handleAction = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onConfirm) {
      setOpen(false);
      return;
    }
    const result = onConfirm();
    if (result instanceof Promise) {
      e.preventDefault();
      setInternalLoading(true);
      try {
        await result;
        setOpen(false);
      } catch {
        // error handling
      } finally {
        setInternalLoading(false);
      }
    } else {
      setOpen(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <div className="flex items-start gap-4">
          <div
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-transform',
              VARIANT_BADGE_CLASSES[variant]
            )}
          >
            {icon || <IconComponent className="h-5 w-5" aria-hidden="true" />}
          </div>

          <div className="flex-1 space-y-1">
            <AlertDialogHeader className="text-left space-y-1">
              <AlertDialogTitle>{title}</AlertDialogTitle>
              {description && (
                <AlertDialogDescription>{description}</AlertDialogDescription>
              )}
            </AlertDialogHeader>
            {children && <div className="pt-2">{children}</div>}
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} disabled={loading}>
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            variant={VARIANT_ACTION_VARIANTS[variant]}
            onClick={handleAction}
            disabled={loading}
          >
            {loading && <Spinner size="sm" className="mr-2" />}
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
