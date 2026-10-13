import * as React from 'react';
import { Copy, Check } from 'lucide-react';
import { Button, type ButtonProps } from './Button';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../../overlays/tooltip';
import { cn } from '../../../lib/utils';

export interface CopyButtonProps extends Omit<ButtonProps, 'onClick' | 'onCopy' | 'onError'> {
  /** Texto o valor que se copiará al portapapeles */
  value: string;
  /** Duración en milisegundos durante la cual se muestra el estado de éxito (predeterminado: 2000) */
  timeout?: number;
  /** Texto del tooltip en estado de reposo (predeterminado: 'Copiar') */
  tooltipText?: string;
  /** Texto del tooltip cuando el valor ha sido copiado con éxito (predeterminado: '¡Copiado!') */
  copiedTooltipText?: string;
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
}

/**
 * `CopyButton` es un botón interactivo accesible para copiar texto al portapapeles con un clic.
 * Ofrece micro-animación con cambio de icono a Check, halo esmeralda y feedback mediante Tooltip.
 */
export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      timeout = 2000,
      tooltipText = 'Copiar',
      copiedTooltipText = '¡Copiado!',
      showTooltip = true,
      onCopy,
      onError,
      icon: IdleIcon = Copy,
      copiedIcon: CopiedIcon = Check,
      variant = 'ghost',
      size = 'icon-sm',
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false);
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

          setCopied(true);
          onCopy?.(value);

          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            setCopied(false);
          }, timeout);
        } catch (err) {
          onError?.(err);
        }
      },
      [value, disabled, timeout, onCopy, onError]
    );

    const buttonLabel = copied ? copiedTooltipText : tooltipText;

    const renderButton = (
      <Button
        ref={ref}
        type="button"
        variant={variant}
        size={size}
        onClick={handleCopy}
        disabled={disabled}
        aria-label={buttonLabel}
        aria-live="polite"
        className={cn(
          'transition-colors duration-200',
          copied && 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300',
          className
        )}
        {...props}
      >
        {children ? (
          typeof children === 'function' ? (
            // Soporte para render prop
            (children as unknown as (c: boolean) => React.ReactNode)(copied)
          ) : (
            children
          )
        ) : copied ? (
          <CopiedIcon className="h-4 w-4 animate-in zoom-in-75 duration-200 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <IdleIcon className="h-4 w-4 text-alcspower-muted-foreground transition-transform hover:scale-105" />
        )}
      </Button>
    );

    if (!showTooltip) {
      return renderButton;
    }

    return (
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger asChild>{renderButton}</TooltipTrigger>
          <TooltipContent side="top" className="text-[11px] py-1 px-2">
            {buttonLabel}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

CopyButton.displayName = 'CopyButton';
