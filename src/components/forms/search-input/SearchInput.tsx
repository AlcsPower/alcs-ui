import * as React from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Input, type InputProps } from '../input/Input';
import { Kbd } from '../../data-display/kbd';

export interface SearchInputProps
  extends Omit<InputProps, 'leftElement' | 'rightElement'> {
  /** Callback disparado cuando el término de búsqueda cambia (con debounce si aplica) */
  onSearch?: (value: string) => void;
  /** Milisegundos de debounce para el callback onSearch (por defecto 300) */
  debounceMs?: number;
  /** Muestra un spinner animado en el slot derecho cuando una búsqueda está en curso */
  isLoading?: boolean;
  /** Habilita el botón de limpieza cuando el campo tiene texto (por defecto true) */
  clearable?: boolean;
  /** Callback ejecutado al hacer clic en el botón de limpiar */
  onClear?: () => void;
  /** Texto o símbolo de atajo de teclado a mostrar (ej: '⌘K' o '/') */
  shortcut?: string;
  /** Enfoque automático al presionar la tecla del atajo a nivel de ventana */
  enableShortcutListener?: boolean;
}

/**
 * Campo de búsqueda interactivo con debounce integrado, botón para limpiar,
 * estado de carga con spinner y soporte para atajos de teclado accesibles.
 */
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value: controlledValue,
      defaultValue = '',
      onChange,
      onSearch,
      debounceMs = 300,
      isLoading = false,
      clearable = true,
      onClear,
      shortcut,
      enableShortcutListener = false,
      placeholder = 'Buscar...',
      size = 'md',
      disabled,
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const internalInputRef = React.useRef<HTMLInputElement | null>(null);

    // Combinar refs
    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        internalInputRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [ref]
    );

    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState<string>(String(defaultValue));
    const value = isControlled ? String(controlledValue) : internalValue;

    const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(e);

      if (onSearch) {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        if (debounceMs > 0) {
          debounceTimerRef.current = setTimeout(() => {
            onSearch(newValue);
          }, debounceMs);
        } else {
          onSearch(newValue);
        }
      }
    };

    React.useEffect(() => {
      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
      };
    }, []);

    const handleClear = () => {
      if (disabled) return;
      if (!isControlled) {
        setInternalValue('');
      }
      onClear?.();
      onSearch?.('');

      if (internalInputRef.current) {
        internalInputRef.current.value = '';
        internalInputRef.current.focus();

        // Disparar evento synthetic change
        const event = new Event('input', { bubbles: true });
        internalInputRef.current.dispatchEvent(event);
      }
    };

    // Listener global de atajo de teclado opcional
    React.useEffect(() => {
      if (!enableShortcutListener || !shortcut) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
        const modKey = isMac ? e.metaKey : e.ctrlKey;

        if (shortcut.includes('K') && modKey && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          internalInputRef.current?.focus();
        } else if (shortcut === '/' && e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          internalInputRef.current?.focus();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [enableShortcutListener, shortcut]);

    const showClearButton = clearable && Boolean(value) && !disabled;

    const iconSizeClass = {
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    }[size];

    return (
      <Input
        ref={setRefs}
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        size={size}
        disabled={disabled}
        className={cn('pe-9', className)}
        containerClassName={containerClassName}
        leftElement={
          <Search className={cn(iconSizeClass, 'text-alcspower-muted-foreground pointer-events-none')} />
        }
        rightElement={
          <div className="flex items-center gap-1.5 shrink-0">
            {isLoading && (
              <Loader2 className={cn(iconSizeClass, 'animate-spin text-alcspower-primary')} />
            )}

            {showClearButton && !isLoading && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Limpiar búsqueda"
                className="p-1 rounded-md text-alcspower-muted-foreground hover:text-alcspower-foreground hover:bg-alcspower-surface-muted transition-colors cursor-pointer"
              >
                <X className={iconSizeClass} />
              </button>
            )}

            {shortcut && !value && !isLoading && (
              <Kbd
                size={size === 'lg' ? 'sm' : 'xs'}
                variant="subtle"
                className="pointer-events-none opacity-80"
              >
                {shortcut}
              </Kbd>
            )}
          </div>
        }
        {...props}
      />
    );
  }
);
SearchInput.displayName = 'SearchInput';
