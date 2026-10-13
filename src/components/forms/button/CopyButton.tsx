import * as React from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../../overlays/tooltip';
import { cn } from '../../../lib/utils';

export type CopyButtonVariant = 'outlined' | 'filled' | 'inline' | 'ghost' | 'primary' | 'secondary' | 'outline';
export type CopyButtonSize = 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon' | 'icon-lg';

export const copyButtonVariants = cva(
  'group relative inline-flex items-center justify-center font-sans font-medium select-none outline-none cursor-pointer transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-alcspower-primary/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none motion-reduce:transform-none',
  {
    variants: {
      variant: {
        outlined:
          'border-[1.5px] border-alcspower-border/80 bg-alcspower-surface text-alcspower-muted-foreground shadow-2xs hover:border-alcspower-primary/30 hover:bg-alcspower-primary/5 hover:text-alcspower-primary hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0',
        filled:
          'border-[1.5px] border-alcspower-primary bg-alcspower-primary text-white shadow-xs hover:bg-alcspower-primary-hover hover:border-alcspower-primary-hover hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:bg-alcspower-primary-active',
        inline:
          'absolute right-1.5 top-1/2 -translate-y-1/2 border-transparent bg-transparent text-alcspower-muted-foreground hover:bg-alcspower-surface-muted hover:text-alcspower-primary hover:translate-y-[-50%] active:bg-alcspower-surface-subtle shadow-none',
        // Aliases para compatibilidad con Button
        ghost:
          'border-transparent bg-transparent text-alcspower-muted-foreground hover:bg-alcspower-surface-muted hover:text-alcspower-primary active:bg-alcspower-surface-subtle',
        primary:
          'border-[1.5px] border-alcspower-primary bg-alcspower-primary text-white shadow-xs hover:bg-alcspower-primary-hover hover:border-alcspower-primary-hover hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:bg-alcspower-primary-active',
        secondary:
          'border-[1.5px] border-alcspower-border/80 bg-alcspower-surface text-alcspower-muted-foreground shadow-2xs hover:border-alcspower-primary/30 hover:bg-alcspower-primary/5 hover:text-alcspower-primary hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0',
        outline:
          'border-[1.5px] border-alcspower-border/80 bg-alcspower-surface text-alcspower-muted-foreground shadow-2xs hover:border-alcspower-primary/30 hover:bg-alcspower-primary/5 hover:text-alcspower-primary hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0',
      },
      size: {
        sm: 'h-7 w-7 rounded-lg',
        md: 'h-9 w-9 rounded-xl',
        lg: 'h-11 w-11 rounded-xl',
        // Aliases
        'icon-sm': 'h-7 w-7 rounded-lg',
        icon: 'h-9 w-9 rounded-xl',
        'icon-lg': 'h-11 w-11 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'outlined',
      size: 'md',
    },
  }
);

const SIZE_ICON_MAP: Record<string, { wrapper: string; icon: string }> = {
  sm: { wrapper: 'w-3.5 h-3.5', icon: 'h-3.5 w-3.5' },
  'icon-sm': { wrapper: 'w-3.5 h-3.5', icon: 'h-3.5 w-3.5' },
  md: { wrapper: 'w-4.5 h-4.5', icon: 'h-4.5 w-4.5' },
  icon: { wrapper: 'w-4.5 h-4.5', icon: 'h-4.5 w-4.5' },
  lg: { wrapper: 'w-5.5 h-5.5', icon: 'h-5.5 w-5.5' },
  'icon-lg': { wrapper: 'w-5.5 h-5.5', icon: 'h-5.5 w-5.5' },
};

export interface CopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'onCopy' | 'onError' | 'children'>,
    VariantProps<typeof copyButtonVariants> {
  /** Contenido personalizado o render prop recibiendo el estado copiado */
  children?: React.ReactNode | ((copied: boolean) => React.ReactNode);
  /** Texto o valor que se copiará al portapapeles */
  value: string;
  /** Duración en milisegundos durante la cual se muestra el estado copiado (predeterminado: 2000) */
  timeout?: number;
  /** Texto del tooltip en estado de reposo (predeterminado: 'Copiar') */
  tooltipText?: string;
  /** Texto del tooltip cuando el valor ha sido copiado con éxito (predeterminado: '¡Copiado!') */
  copiedTooltipText?: string;
  /** Texto del tooltip si ocurre un fallo al acceder al portapapeles */
  errorTooltipText?: string;
  /** Habilita o desactiva el tooltip flotante (predeterminado: true) */
  showTooltip?: boolean;
  /** Callback ejecutado tras una copia exitosa */
  onCopy?: (value: string) => void;
  /** Callback ejecutado en caso de error al acceder al portapapeles */
  onError?: (error: unknown) => void;
  /** Icono personalizado para el estado de reposo */
  icon?: React.ElementType;
  /** Icono personalizado para el estado copiado */
  copiedIcon?: React.ElementType;
  /** Icono personalizado para el estado de error */
  errorIcon?: React.ElementType;
  /** Etiqueta de texto externa adyacente */
  label?: React.ReactNode;
  /** Posición de la etiqueta externa ('left' | 'right') */
  labelPlacement?: 'left' | 'right';
}

/**
 * `CopyButton` es un botón interactivo de un solo clic para copiar texto al portapapeles.
 * Ofrece micro-animación fluida de icono (Copy → Check esmeralda con rotación y scale pop),
 * efecto de halo/glow sutil en hover, variantes `outlined`, `filled` e `inline`, y tooltip accesible.
 */
export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      timeout = 2000,
      tooltipText = 'Copiar',
      copiedTooltipText = '¡Copiado!',
      errorTooltipText = 'Error al copiar',
      showTooltip = true,
      onCopy,
      onError,
      icon: IdleIcon = Copy,
      copiedIcon: CopiedIcon = Check,
      errorIcon: ErrIcon = AlertCircle,
      variant = 'outlined',
      size = 'md',
      label,
      labelPlacement = 'right',
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const [status, setStatus] = React.useState<'idle' | 'copied' | 'error'>('idle');
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const handleCopy = React.useCallback(
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (disabled || !value) return;

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(value);
          } else {
            // Fallback para entornos donde Clipboard API no está expuesto
            const textArea = document.createElement('textarea');
            textArea.value = value;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
          }

          setStatus('copied');
          onCopy?.(value);

          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            setStatus('idle');
          }, timeout);
        } catch (err) {
          setStatus('error');
          onError?.(err);

          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            setStatus('idle');
          }, timeout);
        }
      },
      [value, disabled, timeout, onCopy, onError]
    );

    const isCopied = status === 'copied';
    const isError = status === 'error';

    const buttonLabel = isCopied ? copiedTooltipText : isError ? errorTooltipText : tooltipText;
    const isFilled = variant === 'filled' || variant === 'primary';

    const sizeKey = (size as string) || 'md';
    const iconDim = SIZE_ICON_MAP[sizeKey] ?? SIZE_ICON_MAP['md']!;

    // Clases dinámicas según estado
    const statusClasses = cn(
      isCopied && !isFilled && 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300',
      isCopied && isFilled && 'border-emerald-600 bg-emerald-600 text-white shadow-emerald-500/20 hover:bg-emerald-700 hover:border-emerald-700',
      isError && !isFilled && 'border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300',
      isError && isFilled && 'border-rose-600 bg-rose-600 text-white'
    );

    const buttonElement = (
      <button
        ref={ref}
        type="button"
        onClick={handleCopy}
        disabled={disabled}
        aria-label={buttonLabel}
        aria-live="polite"
        className={cn(copyButtonVariants({ variant, size }), statusClasses, className)}
        {...props}
      >
        {children ? (
          typeof children === 'function' ? (
            (children as unknown as (copied: boolean) => React.ReactNode)(isCopied)
          ) : (
            children
          )
        ) : (
          <div
            className={cn(
              'relative flex items-center justify-center pointer-events-none',
              iconDim.wrapper
            )}
          >
            {/* Halo / Glow sutil */}
            <span
              className={cn(
                'absolute -inset-1.5 rounded-full blur-[6px] opacity-0 transition-opacity duration-200 pointer-events-none',
                isFilled
                  ? 'bg-white/30'
                  : isCopied
                  ? 'bg-emerald-500/25'
                  : isError
                  ? 'bg-rose-500/25'
                  : 'bg-alcspower-primary/20',
                (isCopied || isError) && 'opacity-100',
                'group-hover:opacity-100'
              )}
              aria-hidden="true"
            />

            {/* Icono de Reposo (Copy) */}
            <span
              className={cn(
                'absolute inset-0 flex items-center justify-center transition-all duration-250 ease-out',
                isCopied || isError
                  ? 'opacity-0 scale-50 rotate-90'
                  : 'opacity-100 scale-100 rotate-0'
              )}
            >
              <IdleIcon className={cn(iconDim.icon, 'transition-transform group-hover:scale-105')} />
            </span>

            {/* Icono de Copiado (Check) */}
            <span
              className={cn(
                'absolute inset-0 flex items-center justify-center transition-all duration-250 ease-out',
                isCopied
                  ? 'opacity-100 scale-100 rotate-0 text-emerald-600 dark:text-emerald-400'
                  : 'opacity-0 scale-50 -rotate-90 pointer-events-none',
                isFilled && isCopied && 'text-white'
              )}
            >
              <CopiedIcon className={cn(iconDim.icon, 'stroke-[2.5]')} />
            </span>

            {/* Icono de Error */}
            <span
              className={cn(
                'absolute inset-0 flex items-center justify-center transition-all duration-250 ease-out',
                isError
                  ? 'opacity-100 scale-100 rotate-0 text-rose-600 dark:text-rose-400'
                  : 'opacity-0 scale-50 pointer-events-none',
                isFilled && isError && 'text-white'
              )}
            >
              <ErrIcon className={cn(iconDim.icon, 'stroke-[2.5]')} />
            </span>
          </div>
        )}
      </button>
    );

    const contentWithTooltip = showTooltip ? (
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger asChild>{buttonElement}</TooltipTrigger>
          <TooltipContent
            side="top"
            className={cn(
              'z-50 text-[11px] font-semibold py-1 px-2.5 rounded-md shadow-md select-none',
              isCopied
                ? 'bg-emerald-800 text-white border-emerald-700'
                : isError
                ? 'bg-rose-800 text-white border-rose-700'
                : 'bg-slate-900 dark:bg-slate-800 text-white border-slate-700'
            )}
          >
            {buttonLabel}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      buttonElement
    );

    if (label) {
      return (
        <div className="inline-flex items-center gap-2 select-none">
          {labelPlacement === 'left' && (
            <span className="text-xs font-semibold text-alcspower-foreground">{label}</span>
          )}
          {contentWithTooltip}
          {labelPlacement === 'right' && (
            <span className="text-xs font-semibold text-alcspower-foreground">{label}</span>
          )}
        </div>
      );
    }

    return contentWithTooltip;
  }
);

CopyButton.displayName = 'CopyButton';
