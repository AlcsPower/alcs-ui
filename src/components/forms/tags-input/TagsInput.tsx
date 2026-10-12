import * as React from 'react';
import { X, Broom } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const tagsInputVariants = cva(
  'box-border flex w-full flex-wrap items-center gap-1.5 font-medium bg-alcspower-surface text-alcspower-foreground transition-all duration-150 outline-none border-[1.5px] shadow-2xs cursor-text',
  {
    variants: {
      size: {
        sm: 'min-h-8 px-2 py-1 text-xs rounded-lg',
        md: 'min-h-10 px-2.5 py-1.5 text-sm rounded-xl',
        lg: 'min-h-12 px-3 py-2 text-base rounded-xl',
      },
      hasError: {
        true: 'border-alcspower-destructive bg-alcspower-destructive/5 ring-3 ring-alcspower-destructive/15 focus-within:border-alcspower-destructive focus-within:ring-3 focus-within:ring-alcspower-destructive/15',
        false: 'border-alcspower-border hover:border-alcspower-border-subtle focus-within:border-alcspower-primary focus-within:ring-3 focus-within:ring-alcspower-primary/15',
      },
      disabled: {
        true: 'cursor-not-allowed bg-alcspower-surface-muted text-alcspower-muted-foreground opacity-60 shadow-none pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
      disabled: false,
    },
  }
);

export interface TagsInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>,
    VariantProps<typeof tagsInputVariants> {
  /** Lista de etiquetas controlada */
  value?: string[];
  /** Lista de etiquetas no controlada por defecto */
  defaultValue?: string[];
  /** Callback disparado cada vez que cambia la lista de etiquetas */
  onChange?: (tags: string[]) => void;
  /** Texto del placeholder cuando no hay etiquetas o en el input interno */
  placeholder?: string;
  /** Teclas delimitadoras que crean una etiqueta al presionarse (por defecto ['Enter', ',']) */
  delimiterKeys?: string[];
  /** Cantidad máxima de etiquetas permitidas */
  maxTags?: number;
  /** Permite agregar etiquetas repetidas (por defecto false) */
  allowDuplicates?: boolean;
  /** Muestra botón con icono para limpiar todas las etiquetas (por defecto false) */
  clearable?: boolean;
  /** Icono personalizado para el botón de limpiar (por defecto Broom de lucide-react) */
  clearIcon?: React.ReactNode;
  /** Función para validar o filtrar cada etiqueta antes de agregarla */
  validateTag?: (tag: string) => boolean;
  /** Función para transformar el texto de la etiqueta (ej: a minúsculas o sin espacios) */
  transformTag?: (tag: string) => string;
  /** Deshabilita la edición */
  disabled?: boolean;
  /** Solo lectura */
  readOnly?: boolean;
  /** Silueta visual de los chips de etiquetas ('rounded' o 'squircle') */
  shape?: 'rounded' | 'squircle';
  /** ID del control para asociar con etiquetas <label htmlFor="..."> */
  id?: string;
  /** Nombre del control para envío en formularios estándar */
  name?: string;
  /** Etiqueta accesible para lectores de pantalla */
  'aria-label'?: string;
  /** Referencia de accesibilidad */
  'aria-labelledby'?: string;
}

const CHIP_SIZE_CLASSES = {
  sm: 'h-5 px-1.5 text-[11px] gap-1',
  md: 'h-6 px-2 text-xs gap-1.5',
  lg: 'h-7 px-2.5 text-sm gap-2',
};

const CLEAR_ICON_SIZE_CLASSES = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-4.5 w-4.5',
};

/**
 * TagsInput
 * Control de formulario especializado para captura interactiva de etiquetas, categorías y palabras clave.
 * Admite navegación por teclado, eliminación en retroceso, pegado masivo delimitado y diseño contemporáneo.
 */
export const TagsInput = React.forwardRef<HTMLDivElement, TagsInputProps>(
  (
    {
      value: controlledValue,
      defaultValue = [],
      onChange,
      placeholder = 'Agregar etiqueta...',
      delimiterKeys = ['Enter', ','],
      maxTags,
      allowDuplicates = false,
      clearable = false,
      clearIcon,
      validateTag,
      transformTag,
      size = 'md',
      shape = 'rounded',
      hasError = false,
      disabled = false,
      readOnly = false,
      id,
      name,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalTags, setInternalTags] = React.useState<string[]>(defaultValue);
    const tags = isControlled ? controlledValue : internalTags;

    const [inputValue, setInputValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const updateTags = (nextTags: string[]) => {
      if (!isControlled) {
        setInternalTags(nextTags);
      }
      onChange?.(nextTags);
    };

    const addTag = (rawText: string) => {
      let text = rawText.trim();
      if (!text) return;

      if (transformTag) {
        text = transformTag(text);
      }

      if (!text) return;

      if (maxTags && tags.length >= maxTags) return;

      if (!allowDuplicates && tags.some((t) => t.toLowerCase() === text.toLowerCase())) {
        return;
      }

      if (validateTag && !validateTag(text)) {
        return;
      }

      updateTags([...tags, text]);
      setInputValue('');
    };

    const removeTag = (indexToRemove: number) => {
      if (disabled || readOnly) return;
      const nextTags = tags.filter((_, idx) => idx !== indexToRemove);
      updateTags(nextTags);
      inputRef.current?.focus();
    };

    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled || readOnly) return;
      updateTags([]);
      setInputValue('');
      inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;

      if (delimiterKeys.includes(e.key)) {
        e.preventDefault();
        addTag(inputValue);
      } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
        e.preventDefault();
        removeTag(tags.length - 1);
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;
      const pasted = e.clipboardData.getData('text/plain');
      if (!pasted) return;

      // Detecta comas, saltos de línea o tabuladores
      const tokens = pasted
        .split(/[\n,\t]+/)
        .map((t) => t.trim())
        .filter(Boolean);

      if (tokens.length > 1) {
        e.preventDefault();
        const availableSlots = maxTags ? maxTags - tags.length : Infinity;
        const validTokens: string[] = [];

        for (const token of tokens) {
          if (validTokens.length >= availableSlots) break;
          let processed = transformTag ? transformTag(token) : token;
          if (!processed) continue;

          const exists =
            !allowDuplicates &&
            (tags.some((t) => t.toLowerCase() === processed.toLowerCase()) ||
              validTokens.some((t) => t.toLowerCase() === processed.toLowerCase()));

          if (exists) continue;
          if (validateTag && !validateTag(processed)) continue;

          validTokens.push(processed);
        }

        if (validTokens.length > 0) {
          updateTags([...tags, ...validTokens]);
          setInputValue('');
        }
      }
    };

    const handleContainerClick = () => {
      if (!disabled && !readOnly) {
        inputRef.current?.focus();
      }
    };

    const isMaxReached = Boolean(maxTags && tags.length >= maxTags);

    const chipRadiusClass =
      shape === 'squircle' ? 'rounded-lg' : 'rounded-full';

    return (
      <div
        ref={ref}
        onClick={handleContainerClick}
        data-disabled={disabled ? 'true' : undefined}
        data-invalid={hasError ? 'true' : undefined}
        className={cn(
          tagsInputVariants({ size: size ?? 'md', hasError, disabled }),
          className
        )}
        {...props}
      >
        {/* Lista de tags */}
        <div role="list" aria-label="Etiquetas seleccionadas" className="contents">
          {tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              role="listitem"
              className={cn(
                'inline-flex items-center font-medium bg-alcspower-primary/10 text-alcspower-primary border border-alcspower-primary/20 transition-all select-none',
                chipRadiusClass,
                CHIP_SIZE_CLASSES[size ?? 'md']
              )}
            >
              <span className="truncate max-w-[200px]">{tag}</span>
              {!disabled && !readOnly && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(index);
                  }}
                  aria-label={`Eliminar ${tag}`}
                  className="border-0 bg-transparent shadow-none rounded-full p-0.5 text-alcspower-primary/70 hover:text-alcspower-primary hover:bg-alcspower-primary/20 transition-colors cursor-pointer"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              )}
            </span>
          ))}
        </div>

        {/* Input interno */}
        {!disabled && !readOnly && !isMaxReached && (
          <input
            ref={inputRef}
            id={id}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            aria-label={ariaLabel || (id ? undefined : placeholder || 'Agregar etiqueta')}
            aria-labelledby={ariaLabelledby}
            placeholder={tags.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[90px] border-0 bg-transparent p-0 text-alcspower-foreground placeholder:text-alcspower-muted-foreground shadow-none outline-none focus:outline-none focus:ring-0 font-normal text-inherit"
          />
        )}

        {name && (
          <input
            type="hidden"
            name={name}
            value={tags.join(',')}
          />
        )}

        {/* Acciones del lado derecho: limpiar todo y contador */}
        <div className="ms-auto flex items-center gap-2 text-xs text-alcspower-muted-foreground select-none shrink-0">
          {clearable && tags.length > 0 && !disabled && !readOnly && (
            <button
              type="button"
              onClick={handleClearAll}
              aria-label="Limpiar todas las etiquetas"
              title="Limpiar todas las etiquetas"
              className="border-0 bg-transparent p-1 rounded-md text-alcspower-muted-foreground hover:text-alcspower-foreground hover:bg-alcspower-surface-muted transition-colors cursor-pointer shadow-none flex items-center justify-center"
            >
              {clearIcon || (
                <Broom
                  className={CLEAR_ICON_SIZE_CLASSES[size ?? 'md']}
                  aria-hidden="true"
                />
              )}
            </button>
          )}

          {maxTags && (
            <span className="text-[10px] font-mono opacity-80">
              {tags.length}/{maxTags}
            </span>
          )}
        </div>
      </div>
    );
  }
);

TagsInput.displayName = 'TagsInput';
