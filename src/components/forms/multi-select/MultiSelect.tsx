import * as React from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../../overlays/popover';
import { Checkbox } from '../checkbox';
import { Spinner } from '../../feedback/spinner';
import { Kbd } from '../../data-display/kbd';
import { Badge } from '../../data-display/badge';

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
  icon?: React.ReactNode;
  description?: string;
  badge?: string;
}

export const multiSelectVariants = cva(
  'box-border group relative flex w-full items-center justify-between text-alcspower-foreground transition-all outline-none border font-sans select-none cursor-pointer',
  {
    variants: {
      size: {
        sm: 'min-h-[32px] text-xs rounded-lg py-1 pl-2.5 pr-2 gap-1.5',
        md: 'min-h-[40px] text-sm rounded-xl py-1.5 pl-3 pr-2.5 gap-1.5',
        lg: 'min-h-[48px] text-base rounded-xl py-2 pl-3.5 pr-3 gap-2',
      },
      hasError: {
        true: 'border-alcspower-destructive bg-alcspower-destructive/5 text-alcspower-foreground ring-alcspower-destructive/20 focus-within:ring-2 focus-within:ring-alcspower-destructive/20 focus-within:border-alcspower-destructive',
        false:
          'border-alcspower-border bg-alcspower-surface hover:border-alcspower-border-strong hover:shadow-xs focus-within:border-alcspower-primary focus-within:ring-2 focus-within:ring-alcspower-primary/20 focus-within:shadow-xs shadow-2xs',
      },
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
    },
  }
);

export interface MultiSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>,
    VariantProps<typeof multiSelectVariants> {
  /** Lista de opciones disponibles */
  options: MultiSelectOption[];
  /** Valores seleccionados (modo controlado) */
  value?: string[];
  /** Valores seleccionados por defecto (modo no controlado) */
  defaultValue?: string[];
  /** Callback invocado cuando cambia la selección */
  onChange?: (value: string[]) => void;
  /** Texto placeholder cuando no hay selección */
  placeholder?: string;
  /** Placeholder del campo de búsqueda */
  searchPlaceholder?: string;
  /** Mensaje cuando la búsqueda no produce resultados */
  emptyText?: string;
  /** Modo de visualización de los elementos en el disparador */
  displayMode?: 'chips' | 'summary' | 'hybrid';
  /** Número máximo de chips visibles antes de colapsar en "+N más" (modo hybrid) */
  maxCount?: number;
  /** Permite limpiar toda la selección con un botón rápido en el trigger */
  clearable?: boolean;
  /** Muestra la barra de búsqueda en el menú desplegable */
  showSearch?: boolean;
  /** Muestra el botón de "Seleccionar todos" en el encabezado */
  showSelectAll?: boolean;
  /** Muestra el contador de seleccionados en la cabecera del menú */
  showCount?: boolean;
  /** Muestra la barra de ayuda de teclado en el pie del menú */
  showFooter?: boolean;
  /** Estado de carga asíncrona de opciones */
  isLoading?: boolean;
  /** Deshabilita la interacción con el control */
  disabled?: boolean;
  /** Clases CSS adicionales para el contenedor del Popover */
  popoverClassName?: string;
  /** Variante visual de los chips de selección */
  chipVariant?: 'primary' | 'secondary' | 'outline';
  /** Función de filtrado personalizada */
  filterFn?: (option: MultiSelectOption, query: string) => boolean;
  /** ID para asociación de accesibilidad con Field o Label */
  id?: string;
  /** Nombre del campo para formularios nativos */
  name?: string;
  /** Atributo aria-describedby para mensajes de error o pistas */
  'aria-describedby'?: string;
  /** Atributo aria-invalid */
  'aria-invalid'?: boolean | 'true' | 'false';
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      className,
      options = [],
      value,
      defaultValue,
      onChange,
      placeholder = 'Selecciona opciones...',
      searchPlaceholder = 'Buscar opciones...',
      emptyText = 'No se encontraron resultados.',
      displayMode = 'hybrid',
      maxCount = 3,
      clearable = true,
      showSearch = true,
      showSelectAll = true,
      showCount = true,
      showFooter = true,
      isLoading = false,
      disabled = false,
      hasError = false,
      size = 'md',
      popoverClassName,
      chipVariant = 'primary',
      filterFn,
      id,
      name,
      'aria-describedby': ariaDescribedby,
      'aria-invalid': ariaInvalid,
      ...restProps
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);
    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isMultiLine, setIsMultiLine] = React.useState(false);

    // Estado controlado vs no controlado
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<string[]>(
      defaultValue || []
    );
    const selectedValues = isControlled ? value || [] : internalValue;

    // Actualizar valor
    const updateValues = React.useCallback(
      (newValues: string[]) => {
        if (!isControlled) {
          setInternalValue(newValues);
        }
        onChange?.(newValues);
      },
      [isControlled, onChange]
    );

    // Opciones seleccionadas completas
    const selectedOptions = React.useMemo(() => {
      const valueMap = new Map(options.map((opt) => [opt.value, opt]));
      return selectedValues
        .map((v) => valueMap.get(v))
        .filter((opt): opt is MultiSelectOption => Boolean(opt));
    }, [options, selectedValues]);

    // Opciones habilitadas para calcular "Seleccionar todos"
    const enabledOptions = React.useMemo(() => {
      return options.filter((opt) => !opt.disabled);
    }, [options]);

    // Filtrar opciones por búsqueda
    const filteredOptions = React.useMemo(() => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return options;

      if (filterFn) {
        return options.filter((opt) => filterFn(opt, searchQuery));
      }

      return options.filter(
        (opt) =>
          opt.label.toLowerCase().includes(q) ||
          opt.description?.toLowerCase().includes(q) ||
          opt.group?.toLowerCase().includes(q) ||
          opt.badge?.toLowerCase().includes(q)
      );
    }, [options, searchQuery, filterFn]);

    // Agrupar opciones filtradas
    const groupedOptions = React.useMemo(() => {
      const groups: Record<string, MultiSelectOption[]> = {};
      const ungrouped: MultiSelectOption[] = [];

      filteredOptions.forEach((opt) => {
        if (opt.group) {
          if (!groups[opt.group]) groups[opt.group] = [];
          groups[opt.group]!.push(opt);
        } else {
          ungrouped.push(opt);
        }
      });

      return { groups, ungrouped };
    }, [filteredOptions]);

    // Lista plana de opciones visibles para navegación por teclado
    const flatVisibleOptions = React.useMemo(() => {
      const list: MultiSelectOption[] = [...groupedOptions.ungrouped];
      Object.values(groupedOptions.groups).forEach((opts) => {
        list.push(...opts);
      });
      return list;
    }, [groupedOptions]);

    // Toggle de opción individual
    const handleToggleOption = (optionValue: string) => {
      if (disabled) return;
      const option = options.find((o) => o.value === optionValue);
      if (option?.disabled) return;

      const next = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];

      updateValues(next);
    };

    // Remover chip específico
    const handleRemoveChip = (e: React.MouseEvent, optionValue: string) => {
      e.stopPropagation();
      if (disabled) return;
      updateValues(selectedValues.filter((v) => v !== optionValue));
    };

    // Limpiar toda la selección
    const handleClearAll = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (disabled) return;
      updateValues([]);
    };

    // Seleccionar o deseleccionar todos los disponibles
    const allEnabledSelected =
      enabledOptions.length > 0 &&
      enabledOptions.every((opt) => selectedValues.includes(opt.value));
    const someEnabledSelected =
      enabledOptions.some((opt) => selectedValues.includes(opt.value)) &&
      !allEnabledSelected;

    const handleToggleSelectAll = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (disabled || enabledOptions.length === 0) return;

      if (allEnabledSelected) {
        const enabledValuesSet = new Set(enabledOptions.map((o) => o.value));
        updateValues(selectedValues.filter((v) => !enabledValuesSet.has(v)));
      } else {
        const newSet = new Set([...selectedValues, ...enabledOptions.map((o) => o.value)]);
        updateValues(Array.from(newSet));
      }
    };

    // Foco automático en el buscador al abrir
    React.useEffect(() => {
      if (open && showSearch) {
        setFocusedIndex(-1);
        const timer = setTimeout(() => {
          searchInputRef.current?.focus();
        }, 50);
        return () => clearTimeout(timer);
      } else {
        setSearchQuery('');
        setFocusedIndex(-1);
        return undefined;
      }
    }, [open, showSearch]);

    // Detectar si los chips ocupan 2 filas o más para anclar las acciones en la esquina inferior derecha
    React.useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const checkMultiLine = () => {
        if (selectedValues.length === 0 || displayMode === 'summary') {
          setIsMultiLine(false);
          return;
        }
        const threshold = size === 'sm' ? 36 : size === 'lg' ? 52 : 44;
        setIsMultiLine(el.offsetHeight > threshold);
      };

      checkMultiLine();

      if (typeof ResizeObserver !== 'undefined') {
        const observer = new ResizeObserver(() => {
          checkMultiLine();
        });
        observer.observe(el);
        return () => observer.disconnect();
      }
      return undefined;
    }, [size, selectedValues, displayMode]);

    // Navegación por teclado dentro del popover
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen(true);
        }
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = prev + 1;
          return next >= flatVisibleOptions.length ? 0 : next;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = prev - 1;
          return next < 0 ? flatVisibleOptions.length - 1 : next;
        });
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < flatVisibleOptions.length) {
          const targetOpt = flatVisibleOptions[focusedIndex];
          if (targetOpt && !targetOpt.disabled) {
            handleToggleOption(targetOpt.value);
          }
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      }
    };

    // Renderizado de los chips seleccionados (sin botones anidados dentro del trigger)
    const renderChips = () => {
      const isHybrid = displayMode === 'hybrid';
      const visibleChips = isHybrid
        ? selectedOptions.slice(0, maxCount)
        : selectedOptions;
      const hiddenCount = isHybrid
        ? Math.max(0, selectedOptions.length - maxCount)
        : 0;

      const chipClasses = cn(
        'inline-flex items-center gap-1 rounded-full font-medium select-none transition-all duration-150 animate-in fade-in zoom-in-95 max-w-[180px]',
        chipVariant === 'primary' &&
          'bg-alcspower-primary/10 border border-alcspower-primary/20 text-alcspower-primary',
        chipVariant === 'secondary' &&
          'bg-alcspower-surface-muted border border-alcspower-border text-alcspower-foreground',
        chipVariant === 'outline' &&
          'bg-transparent border border-alcspower-border-strong text-alcspower-foreground',
        size === 'sm' ? 'py-0.5 px-2 text-[11px]' : size === 'lg' ? 'py-1 px-3 text-xs' : 'py-0.5 px-2.5 text-xs'
      );

      return (
        <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
          {visibleChips.map((opt) => (
            <span key={opt.value} className={chipClasses} title={opt.label}>
              {opt.icon && <span className="shrink-0 text-xs">{opt.icon}</span>}
              <span className="truncate">{opt.label}</span>
              {!disabled && (
                <button
                  type="button"
                  aria-label={`Eliminar ${opt.label}`}
                  onClick={(e) => handleRemoveChip(e, opt.value)}
                  className="w-3.5 h-3.5 rounded-full inline-flex items-center justify-center bg-transparent hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer shrink-0 border-0 p-0 text-current"
                >
                  <X className="w-2.5 h-2.5 shrink-0" strokeWidth={2.5} />
                </button>
              )}
            </span>
          ))}

          {hiddenCount > 0 && (
            <span
              className={cn(
                'inline-flex items-center justify-center rounded-full font-semibold border text-alcspower-muted-foreground bg-alcspower-surface-muted border-alcspower-border/70 select-none shrink-0',
                size === 'sm' ? 'py-0.5 px-1.5 text-[10px]' : 'py-0.5 px-2 text-xs'
              )}
              title={`${hiddenCount} más seleccionados: ${selectedOptions
                .slice(maxCount)
                .map((o) => o.label)
                .join(', ')}`}
            >
              +{hiddenCount} más
            </span>
          )}
        </div>
      );
    };

    // Renderizado del contenido interno del popover
    const renderPopoverContent = () => (
      <>
        {/* Cabecera: Buscador */}
        {showSearch && (
          <div className="relative border-b border-alcspower-border/60 px-3 py-2 bg-alcspower-surface flex items-center gap-2">
            <Search className="w-4 h-4 text-alcspower-muted-foreground shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setFocusedIndex(-1);
              }}
              placeholder={searchPlaceholder}
              className="flex-1 bg-transparent border-0 p-0 text-sm outline-none placeholder:text-alcspower-muted-foreground text-alcspower-foreground"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Limpiar búsqueda"
                className="w-4 h-4 rounded-full flex items-center justify-center text-alcspower-muted-foreground hover:text-alcspower-foreground border-0 p-0 bg-transparent cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Barra de herramientas / Acciones rápidas */}
        {(showSelectAll || showCount) && (
          <div className="flex items-center justify-between px-3 py-2 border-b border-alcspower-border/50 bg-alcspower-surface-muted/30 text-xs">
            {showSelectAll && (
              <div
                role="button"
                tabIndex={0}
                onClick={handleToggleSelectAll}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    handleToggleSelectAll();
                  }
                }}
                className={cn(
                  'inline-flex items-center gap-2 text-xs font-medium text-alcspower-foreground hover:text-alcspower-primary transition-colors cursor-pointer select-none outline-none focus-visible:ring-1 focus-visible:ring-alcspower-primary rounded',
                  (disabled || enabledOptions.length === 0) &&
                    'opacity-50 cursor-not-allowed pointer-events-none'
                )}
              >
                <Checkbox
                  checked={
                    allEnabledSelected
                      ? true
                      : someEnabledSelected
                      ? 'indeterminate'
                      : false
                  }
                  tabIndex={-1}
                  className="pointer-events-none"
                />
                <span>
                  {allEnabledSelected ? 'Deseleccionar todos' : 'Seleccionar todos'}
                </span>
              </div>
            )}

            {showCount && (
              <span className="text-[11px] font-medium text-alcspower-muted-foreground ml-auto">
                {selectedValues.length} de {options.length}
              </span>
            )}
          </div>
        )}

        {/* Lista de Opciones */}
        <div
          role="listbox"
          aria-multiselectable="true"
          className="max-h-64 overflow-y-auto p-1.5 space-y-1 [scrollbar-width:thin]"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-sm text-alcspower-muted-foreground">
              <Spinner size="sm" />
              <span>Cargando opciones...</span>
            </div>
          ) : filteredOptions.length === 0 ? (
            <div className="py-8 text-center text-sm text-alcspower-muted-foreground">
              {emptyText}
            </div>
          ) : (
            <>
              {/* Opciones no agrupadas */}
              {groupedOptions.ungrouped.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                const flatIdx = flatVisibleOptions.indexOf(option);
                const isFocused = focusedIndex === flatIdx;

                return (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled}
                    onClick={() => handleToggleOption(option.value)}
                    onMouseEnter={() => setFocusedIndex(flatIdx)}
                    className={cn(
                      'flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm transition-colors cursor-pointer select-none',
                      option.disabled &&
                        'opacity-40 cursor-not-allowed pointer-events-none bg-transparent',
                      isSelected
                        ? 'bg-alcspower-primary/10 text-alcspower-primary font-medium'
                        : 'text-alcspower-foreground hover:bg-alcspower-primary/5 hover:text-alcspower-primary',
                      isFocused && 'ring-1 ring-alcspower-primary/30 bg-alcspower-primary/5'
                    )}
                  >
                    <Checkbox
                      checked={isSelected}
                      disabled={option.disabled}
                      tabIndex={-1}
                      className="pointer-events-none"
                    />
                    {option.icon && (
                      <div className="shrink-0 text-base flex items-center justify-center">
                        {option.icon}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-medium">{option.label}</div>
                      {option.description && (
                        <div className="text-xs text-alcspower-muted-foreground truncate">
                          {option.description}
                        </div>
                      )}
                    </div>
                    {option.badge && (
                      <Badge
                        variant="outline"
                        size="sm"
                        className="shrink-0 text-[10px] py-0 px-1.5 h-4.5 font-semibold bg-alcspower-surface-muted text-alcspower-muted-foreground border-alcspower-border"
                      >
                        {option.badge}
                      </Badge>
                    )}
                  </div>
                );
              })}

              {/* Opciones agrupadas */}
              {Object.entries(groupedOptions.groups).map(([groupName, groupOpts]) => (
                <div key={groupName} className="pt-1.5 first:pt-0">
                  <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-alcspower-muted-foreground/80 flex items-center justify-between">
                    <span>{groupName}</span>
                    <span className="text-[10px] opacity-70">({groupOpts.length})</span>
                  </div>
                  <div className="space-y-0.5">
                    {groupOpts.map((option) => {
                      const isSelected = selectedValues.includes(option.value);
                      const flatIdx = flatVisibleOptions.indexOf(option);
                      const isFocused = focusedIndex === flatIdx;

                      return (
                        <div
                          key={option.value}
                          role="option"
                          aria-selected={isSelected}
                          aria-disabled={option.disabled}
                          onClick={() => handleToggleOption(option.value)}
                          onMouseEnter={() => setFocusedIndex(flatIdx)}
                          className={cn(
                            'flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm transition-colors cursor-pointer select-none',
                            option.disabled &&
                              'opacity-40 cursor-not-allowed pointer-events-none bg-transparent',
                            isSelected
                              ? 'bg-alcspower-primary/10 text-alcspower-primary font-medium'
                              : 'text-alcspower-foreground hover:bg-alcspower-primary/5 hover:text-alcspower-primary',
                            isFocused && 'ring-1 ring-alcspower-primary/30 bg-alcspower-primary/5'
                          )}
                        >
                          <Checkbox
                            checked={isSelected}
                            disabled={option.disabled}
                            tabIndex={-1}
                            className="pointer-events-none"
                          />
                          {option.icon && (
                            <div className="shrink-0 text-base flex items-center justify-center">
                              {option.icon}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="truncate font-medium">{option.label}</div>
                            {option.description && (
                              <div className="text-xs text-alcspower-muted-foreground truncate">
                                {option.description}
                              </div>
                            )}
                          </div>
                          {option.badge && (
                            <Badge
                              variant="outline"
                              size="sm"
                              className="shrink-0 text-[10px] py-0 px-1.5 h-4.5 font-semibold bg-alcspower-surface-muted text-alcspower-muted-foreground border border-alcspower-border"
                            >
                              {option.badge}
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Pie de página con ayuda de teclado */}
        {showFooter && (
          <div className="flex items-center justify-between border-t border-alcspower-border/60 bg-alcspower-surface-muted/30 px-3 py-1.5 text-[11px] text-alcspower-muted-foreground select-none">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5">
                <Kbd size="xs">↑↓</Kbd>
                navegar
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd size="xs">Espacio</Kbd>
                marcar
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Kbd size="xs">Esc</Kbd>
              cerrar
            </span>
          </div>
        )}
      </>
    );

    return (
      <div
        ref={containerRef}
        className={cn(
          multiSelectVariants({ size, hasError }),
          disabled &&
            'cursor-not-allowed opacity-60 bg-alcspower-surface-muted border-alcspower-border/60 shadow-none hover:shadow-none hover:border-alcspower-border/60',
          open && !hasError && 'border-alcspower-primary ring-2 ring-alcspower-primary/20 shadow-xs',
          className
        )}
        onKeyDown={handleKeyDown}
        {...restProps}
      >
        {/* Campo oculto para soporte de formularios nativos */}
        {name && (
          <select
            name={name}
            multiple
            value={selectedValues}
            onChange={() => {}}
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {/* Disparador según el estado */}
        {selectedValues.length === 0 ? (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                ref={ref}
                id={id}
                type="button"
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-invalid={hasError || ariaInvalid ? true : undefined}
                aria-describedby={ariaDescribedby}
                className="flex-1 flex items-center justify-between text-left outline-none bg-transparent min-w-0 cursor-pointer disabled:cursor-not-allowed border-0 p-0 m-0"
              >
                <span className="text-alcspower-muted-foreground truncate select-none font-normal">
                  {placeholder}
                </span>
              </button>
            </PopoverTrigger>

            <PopoverContent
              className={cn(
                'w-[var(--radix-popover-trigger-width)] min-w-[280px] max-w-[420px] p-0 rounded-2xl border border-alcspower-border/80 shadow-xl overflow-hidden bg-alcspower-surface z-50 text-alcspower-foreground',
                popoverClassName
              )}
              align="start"
              sideOffset={6}
            >
              {renderPopoverContent()}
            </PopoverContent>
          </Popover>
        ) : displayMode === 'summary' ? (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                ref={ref}
                id={id}
                type="button"
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-invalid={hasError || ariaInvalid ? true : undefined}
                aria-describedby={ariaDescribedby}
                className="flex-1 flex items-center text-left outline-none bg-transparent min-w-0 cursor-pointer disabled:cursor-not-allowed border-0 p-0 m-0"
              >
                <span className="font-medium text-alcspower-foreground flex items-center gap-1.5 truncate">
                  <span className="inline-flex items-center justify-center rounded-full bg-alcspower-primary/10 text-alcspower-primary text-xs font-semibold px-2 py-0.5">
                    {selectedValues.length}
                  </span>
                  <span>
                    {selectedValues.length === 1 ? 'opción seleccionada' : 'opciones seleccionadas'}
                  </span>
                </span>
              </button>
            </PopoverTrigger>

            <PopoverContent
              className={cn(
                'w-[var(--radix-popover-trigger-width)] min-w-[280px] max-w-[420px] p-0 rounded-2xl border border-alcspower-border/80 shadow-xl overflow-hidden bg-alcspower-surface z-50 text-alcspower-foreground',
                popoverClassName
              )}
              align="start"
              sideOffset={6}
            >
              {renderPopoverContent()}
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex-1 flex items-center gap-1.5 min-w-0 flex-wrap">
            {renderChips()}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  ref={ref}
                  id={id}
                  type="button"
                  disabled={disabled}
                  aria-haspopup="listbox"
                  aria-expanded={open}
                  aria-invalid={hasError || ariaInvalid ? true : undefined}
                  aria-describedby={ariaDescribedby}
                  aria-label={`${selectedValues.length} opciones seleccionadas. ${placeholder}`}
                  className="flex-1 min-w-[30px] self-stretch text-left outline-none bg-transparent cursor-pointer disabled:cursor-not-allowed border-0 p-0 m-0"
                />
              </PopoverTrigger>

              <PopoverContent
                className={cn(
                  'w-[var(--radix-popover-trigger-width)] min-w-[280px] max-w-[420px] p-0 rounded-2xl border border-alcspower-border/80 shadow-xl overflow-hidden bg-alcspower-surface z-50 text-alcspower-foreground',
                  popoverClassName
                )}
                align="start"
                sideOffset={6}
              >
                {renderPopoverContent()}
              </PopoverContent>
            </Popover>
          </div>
        )}

        {/* Acciones fijas a la derecha del trigger */}
        <div
          className={cn(
            'flex items-center gap-1.5 shrink-0 ml-auto pointer-events-auto transition-all',
            isMultiLine ? (size === 'lg' ? 'self-end mb-1' : 'self-end mb-0.5') : 'self-center'
          )}
        >
          {/* Botón de limpiar selección rápida */}
          {clearable && selectedValues.length > 0 && !disabled && (
            <button
              type="button"
              aria-label="Limpiar selección"
              onClick={handleClearAll}
              className={cn(
                'flex items-center justify-center rounded-full transition-all cursor-pointer border-0 p-0',
                'bg-alcspower-surface-muted hover:bg-alcspower-border text-alcspower-muted-foreground hover:text-alcspower-foreground',
                size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
              )}
            >
              <X className={size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3'} strokeWidth={2.5} />
            </button>
          )}

          {/* Icono de chevron indicador */}
          <ChevronDown
            className={cn(
              'pointer-events-none transition-transform duration-200',
              hasError ? 'text-alcspower-destructive' : 'text-alcspower-muted-foreground/70',
              open && 'rotate-180 text-alcspower-primary',
              size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-[18px] w-[18px]' : 'h-4 w-4'
            )}
          />
        </div>
      </div>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
