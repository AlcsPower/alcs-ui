import * as React from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../../overlays/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../overlays/command';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
  icon?: React.ReactNode;
  description?: string;
}

export const comboboxVariants = cva(
  'box-border group relative flex w-full items-center justify-between text-alcspower-foreground transition-all outline-none border font-sans select-none',
  {
    variants: {
      size: {
        sm: 'h-8 min-h-[32px] text-xs rounded-lg pl-3 pr-9',
        md: 'h-10 min-h-[40px] text-sm rounded-xl pl-3.5 pr-10',
        lg: 'h-12 min-h-[48px] text-base rounded-xl pl-4 pr-11',
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

export interface ComboboxSingleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'defaultValue' | 'onChange'>,
    VariantProps<typeof comboboxVariants> {
  multiple?: false;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  clearable?: boolean;
  hasError?: boolean;
  size?: 'sm' | 'md' | 'lg';
  popoverClassName?: string;
  showFooter?: boolean;
}

export interface ComboboxMultiProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'defaultValue' | 'onChange'>,
    VariantProps<typeof comboboxVariants> {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  clearable?: boolean;
  hasError?: boolean;
  size?: 'sm' | 'md' | 'lg';
  popoverClassName?: string;
  showCount?: boolean;
  showFooter?: boolean;
}

export type ComboboxProps = ComboboxSingleProps | ComboboxMultiProps;

export const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (props, ref) => {
    const {
      className,
      options,
      placeholder = 'Selecciona una opción...',
      searchPlaceholder = 'Buscar...',
      emptyText = 'No se encontraron resultados.',
      clearable = true,
      hasError = false,
      size = 'md',
      disabled = false,
      popoverClassName,
      id,
      multiple,
      value,
      defaultValue,
      onChange,
      showFooter = true,
      ...restProps
    } = props;

    const [open, setOpen] = React.useState(false);

    // Agrupar opciones
    const groupedOptions = React.useMemo(() => {
      const groups: Record<string, ComboboxOption[]> = {};
      const ungrouped: ComboboxOption[] = [];

      options.forEach((opt) => {
        if (opt.group) {
          const groupName = opt.group;
          if (!groups[groupName]) groups[groupName] = [];
          groups[groupName]!.push(opt);
        } else {
          ungrouped.push(opt);
        }
      });

      return { groups, ungrouped };
    }, [options]);

    // ==========================================
    // MODO SELECCIÓN SIMPLE
    // ==========================================
    const isSingleControlled = value !== undefined;
    const [internalSingleValue, setInternalSingleValue] = React.useState<string | undefined>(
      defaultValue as string | undefined
    );
    const singleValue = isSingleControlled ? (value as string | undefined) : internalSingleValue;

    if (!multiple) {
      const singleOnChange = onChange as ((val: string | undefined) => void) | undefined;
      const selectedOption = options.find((opt) => opt.value === singleValue);

      const handleSelect = (val: string) => {
        const nextVal = val === singleValue ? undefined : val;
        if (!isSingleControlled) {
          setInternalSingleValue(nextVal);
        }
        singleOnChange?.(nextVal);
        setOpen(false);
      };

      const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isSingleControlled) {
          setInternalSingleValue(undefined);
        }
        singleOnChange?.(undefined);
      };

      return (
        <div
          className={cn(
            'box-border',
            comboboxVariants({ size, hasError }),
            disabled && 'cursor-not-allowed opacity-60 bg-alcspower-surface-muted border-alcspower-border/60 shadow-none hover:shadow-none hover:border-alcspower-border/60',
            open && !hasError && 'border-alcspower-primary ring-2 ring-alcspower-primary/20 shadow-xs',
            className
          )}
        >
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                ref={ref}
                id={id}
                type="button"
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-invalid={hasError ? true : undefined}
                className={cn(
                  'flex-1 flex items-center justify-between gap-2 truncate text-left outline-none bg-transparent min-w-0 cursor-pointer disabled:cursor-not-allowed h-full border-0 p-0 m-0',
                  !selectedOption && 'text-alcspower-muted-foreground'
                )}
                {...restProps}
              >
                <span className="truncate flex items-center gap-2">
                  {selectedOption?.icon && (
                    <span className="shrink-0 text-base">{selectedOption.icon}</span>
                  )}
                  <span className={cn('truncate', !selectedOption && 'text-alcspower-muted-foreground font-normal')}>
                    {selectedOption ? selectedOption.label : placeholder}
                  </span>
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              className={cn(
                'w-[var(--radix-popover-trigger-width)] min-w-[260px] p-0 rounded-2xl border border-alcspower-border/80 shadow-xl overflow-hidden bg-alcspower-surface z-50',
                popoverClassName
              )}
              align="start"
              sideOffset={6}
            >
              <Command className="border-0 shadow-none rounded-none bg-transparent">
                <CommandInput
                  placeholder={searchPlaceholder}
                  shortcut={null}
                  className="border-b border-alcspower-border/60 px-4"
                />
                <CommandList className="max-h-64 p-1.5 space-y-1 [scrollbar-width:thin]">
                  <CommandEmpty>{emptyText}</CommandEmpty>
                  {groupedOptions.ungrouped.length > 0 && (
                    <CommandGroup>
                      {groupedOptions.ungrouped.map((option) => {
                        const isSelected = singleValue === option.value;
                        return (
                          <CommandItem
                            key={option.value}
                            value={option.label}
                            disabled={option.disabled}
                            onSelect={() => handleSelect(option.value)}
                            className={cn(
                              'flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium cursor-pointer',
                              isSelected
                                ? 'bg-alcspower-primary text-alcspower-primary-foreground data-[selected=true]:bg-alcspower-primary/95 shadow-xs font-semibold'
                                : 'text-alcspower-foreground hover:bg-alcspower-primary/10 hover:text-alcspower-primary data-[selected=true]:bg-alcspower-primary/10 data-[selected=true]:text-alcspower-primary'
                            )}
                          >
                            {option.icon && (
                              <div
                                className={cn(
                                  'w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-sm',
                                  isSelected
                                    ? 'bg-alcspower-primary-foreground/20 text-alcspower-primary-foreground'
                                    : 'bg-alcspower-surface-muted text-alcspower-muted-foreground group-hover:bg-alcspower-surface group-hover:text-alcspower-primary'
                                )}
                              >
                                {option.icon}
                              </div>
                            )}
                            <span className="flex-1 truncate">{option.label}</span>
                            <Check
                              className={cn(
                                'ml-auto h-4 w-4 shrink-0',
                                isSelected ? 'opacity-100 text-alcspower-primary-foreground' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  )}
                  {Object.entries(groupedOptions.groups).map(([groupName, groupOpts]) => (
                    <CommandGroup key={groupName} heading={groupName}>
                      {groupOpts.map((option) => {
                        const isSelected = singleValue === option.value;
                        return (
                          <CommandItem
                            key={option.value}
                            value={option.label}
                            disabled={option.disabled}
                            onSelect={() => handleSelect(option.value)}
                            className={cn(
                              'flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium cursor-pointer',
                              isSelected
                                ? 'bg-alcspower-primary text-alcspower-primary-foreground data-[selected=true]:bg-alcspower-primary/95 shadow-xs font-semibold'
                                : 'text-alcspower-foreground hover:bg-alcspower-primary/10 hover:text-alcspower-primary data-[selected=true]:bg-alcspower-primary/10 data-[selected=true]:text-alcspower-primary'
                            )}
                          >
                            {option.icon && (
                              <div
                                className={cn(
                                  'w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-sm',
                                  isSelected
                                    ? 'bg-alcspower-primary-foreground/20 text-alcspower-primary-foreground'
                                    : 'bg-alcspower-surface-muted text-alcspower-muted-foreground group-hover:bg-alcspower-surface group-hover:text-alcspower-primary'
                                )}
                              >
                                {option.icon}
                              </div>
                            )}
                            <span className="flex-1 truncate">{option.label}</span>
                            <Check
                              className={cn(
                                'ml-auto h-4 w-4 shrink-0',
                                isSelected ? 'opacity-100 text-alcspower-primary-foreground' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  ))}
                </CommandList>
                {showFooter && (
                  <div className="flex items-center justify-between border-t border-alcspower-border/60 bg-alcspower-surface-muted/30 px-3.5 py-2 text-[11px] text-alcspower-muted-foreground select-none">
                    <div className="flex items-center gap-2.5">
                      <span className="flex items-center gap-1">
                        <kbd className="h-4.5 px-1 rounded border border-alcspower-border/70 bg-alcspower-surface font-mono text-[10px] font-semibold text-alcspower-foreground">
                          ↑↓
                        </kbd>
                        navegar
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="h-4.5 px-1 rounded border border-alcspower-border/70 bg-alcspower-surface font-mono text-[10px] font-semibold text-alcspower-foreground">
                          ↵
                        </kbd>
                        seleccionar
                      </span>
                    </div>
                    <span>esc cerrar</span>
                  </div>
                )}
              </Command>
            </PopoverContent>
          </Popover>

          {/* Botón de Limpiar */}
          {clearable && selectedOption && !disabled ? (
            <button
              type="button"
              aria-label="Limpiar selección"
              onClick={handleClear}
              className={cn(
                'absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all cursor-pointer z-10 border-0 p-0',
                'bg-alcspower-surface-muted hover:bg-alcspower-border text-alcspower-muted-foreground hover:text-alcspower-foreground',
                'opacity-0 group-hover:opacity-100 focus:opacity-100',
                size === 'sm' ? 'right-8 w-5 h-5' : size === 'lg' ? 'right-10 w-6 h-6' : 'right-9 w-[22px] h-[22px]'
              )}
            >
              <X className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
            </button>
          ) : null}

          {/* Chevron */}
          <ChevronDown
            className={cn(
              'absolute top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200',
              hasError ? 'text-alcspower-destructive' : 'text-alcspower-muted-foreground/70',
              open && 'rotate-180 text-alcspower-primary',
              size === 'sm' ? 'right-3 h-3.5 w-3.5' : size === 'lg' ? 'right-4 h-[18px] w-[18px]' : 'right-3.5 h-4 w-4'
            )}
          />
        </div>
      );
    }

    // ==========================================
    // MODO SELECCIÓN MÚLTIPLE
    // ==========================================
    const isMultiControlled = value !== undefined;
    const [internalMultiValue, setInternalMultiValue] = React.useState<string[]>(
      (defaultValue as string[] | undefined) || []
    );
    const multiValue = isMultiControlled ? ((value as string[] | undefined) || []) : internalMultiValue;
    const multiOnChange = onChange as ((val: string[]) => void) | undefined;
    const selectedOptions = options.filter((opt) => multiValue.includes(opt.value));
    const showCount = (props as ComboboxMultiProps).showCount ?? true;

    const handleToggle = (val: string) => {
      const nextValues = multiValue.includes(val)
        ? multiValue.filter((v) => v !== val)
        : [...multiValue, val];
      if (!isMultiControlled) {
        setInternalMultiValue(nextValues);
      }
      multiOnChange?.(nextValues);
    };

    const handleRemoveChip = (e: React.MouseEvent, val: string) => {
      e.stopPropagation();
      const nextValues = multiValue.filter((v) => v !== val);
      if (!isMultiControlled) {
        setInternalMultiValue(nextValues);
      }
      multiOnChange?.(nextValues);
    };

    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isMultiControlled) {
        setInternalMultiValue([]);
      }
      multiOnChange?.([]);
    };

    return (
      <div
        className={cn(
          'box-border',
          comboboxVariants({ size, hasError }),
          disabled && 'cursor-not-allowed opacity-60 bg-alcspower-surface-muted border-alcspower-border/60 shadow-none hover:shadow-none hover:border-alcspower-border/60',
          'h-auto py-1.5 flex-wrap gap-1.5',
          size === 'sm' ? 'pl-2.5 pr-14' : size === 'lg' ? 'pl-3.5 pr-16' : 'pl-3 pr-14',
          open && !hasError && 'border-alcspower-primary ring-2 ring-alcspower-primary/20 shadow-xs',
          className
        )}
      >
        <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
          {selectedOptions.map((opt) => (
            <span
              key={opt.value}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full font-semibold select-none transition-all duration-150 animate-in fade-in zoom-in-95',
                'bg-alcspower-primary/10 border border-alcspower-primary/25 text-alcspower-primary',
                size === 'sm' ? 'py-0.5 px-2 text-xs' : 'py-1 px-2.5 text-xs',
                'max-w-[220px]'
              )}
            >
              {opt.icon && <span className="shrink-0 text-xs">{opt.icon}</span>}
              <span className="truncate">{opt.label}</span>
              {!disabled && (
                <button
                  type="button"
                  aria-label={`Eliminar ${opt.label}`}
                  onClick={(e) => handleRemoveChip(e, opt.value)}
                  className="w-4 h-4 rounded-full inline-flex items-center justify-center bg-alcspower-primary/20 hover:bg-alcspower-primary hover:text-alcspower-primary-foreground transition-colors cursor-pointer shrink-0 border-0 p-0 text-alcspower-primary"
                >
                  <X className="w-2.5 h-2.5 min-w-[10px] min-h-[10px] shrink-0" strokeWidth={2.5} />
                </button>
              )}
            </span>
          ))}

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                ref={ref}
                id={id}
                type="button"
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-invalid={hasError ? true : undefined}
                className={cn(
                  'flex-1 min-w-[80px] text-left outline-none bg-transparent cursor-pointer disabled:cursor-not-allowed text-xs font-medium py-1 border-0 p-0 m-0',
                  selectedOptions.length === 0
                    ? 'text-alcspower-muted-foreground'
                    : 'text-alcspower-muted-foreground/70 hover:text-alcspower-foreground'
                )}
                {...restProps}
              >
                {selectedOptions.length === 0 ? placeholder : searchPlaceholder}
              </button>
            </PopoverTrigger>
            <PopoverContent
              className={cn(
                'w-[var(--radix-popover-trigger-width)] min-w-[260px] p-0 rounded-2xl border border-alcspower-border/80 shadow-xl overflow-hidden bg-alcspower-surface z-50',
                popoverClassName
              )}
              align="start"
              sideOffset={6}
            >
              <Command className="border-0 shadow-none rounded-none bg-transparent">
                <CommandInput
                  placeholder={searchPlaceholder}
                  shortcut={null}
                  className="border-b border-alcspower-border/60 px-4"
                />
                <CommandList className="max-h-64 p-1.5 space-y-1 [scrollbar-width:thin]">
                  <CommandEmpty>{emptyText}</CommandEmpty>
                  {groupedOptions.ungrouped.length > 0 && (
                    <CommandGroup>
                      {groupedOptions.ungrouped.map((option) => {
                        const isSelected = multiValue.includes(option.value);
                        return (
                          <CommandItem
                            key={option.value}
                            value={option.label}
                            disabled={option.disabled}
                            onSelect={() => handleToggle(option.value)}
                            className={cn(
                              'flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium cursor-pointer',
                              isSelected
                                ? 'bg-alcspower-primary text-alcspower-primary-foreground data-[selected=true]:bg-alcspower-primary/95 shadow-xs font-semibold'
                                : 'text-alcspower-foreground hover:bg-alcspower-primary/10 hover:text-alcspower-primary data-[selected=true]:bg-alcspower-primary/10 data-[selected=true]:text-alcspower-primary'
                            )}
                          >
                            {option.icon && (
                              <div
                                className={cn(
                                  'w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-sm',
                                  isSelected
                                    ? 'bg-alcspower-primary-foreground/20 text-alcspower-primary-foreground'
                                    : 'bg-alcspower-surface-muted text-alcspower-muted-foreground group-hover:bg-alcspower-surface group-hover:text-alcspower-primary'
                                )}
                              >
                                {option.icon}
                              </div>
                            )}
                            <span className="flex-1 truncate">{option.label}</span>
                            <Check
                              className={cn(
                                'ml-auto h-4 w-4 shrink-0',
                                isSelected ? 'opacity-100 text-alcspower-primary-foreground' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  )}
                  {Object.entries(groupedOptions.groups).map(([groupName, groupOpts]) => (
                    <CommandGroup key={groupName} heading={groupName}>
                      {groupOpts.map((option) => {
                        const isSelected = multiValue.includes(option.value);
                        return (
                          <CommandItem
                            key={option.value}
                            value={option.label}
                            disabled={option.disabled}
                            onSelect={() => handleToggle(option.value)}
                            className={cn(
                              'flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium cursor-pointer',
                              isSelected
                                ? 'bg-alcspower-primary text-alcspower-primary-foreground data-[selected=true]:bg-alcspower-primary/95 shadow-xs font-semibold'
                                : 'text-alcspower-foreground hover:bg-alcspower-primary/10 hover:text-alcspower-primary data-[selected=true]:bg-alcspower-primary/10 data-[selected=true]:text-alcspower-primary'
                            )}
                          >
                            {option.icon && (
                              <div
                                className={cn(
                                  'w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-sm',
                                  isSelected
                                    ? 'bg-alcspower-primary-foreground/20 text-alcspower-primary-foreground'
                                    : 'bg-alcspower-surface-muted text-alcspower-muted-foreground group-hover:bg-alcspower-surface group-hover:text-alcspower-primary'
                                )}
                              >
                                {option.icon}
                              </div>
                            )}
                            <span className="flex-1 truncate">{option.label}</span>
                            <Check
                              className={cn(
                                'ml-auto h-4 w-4 shrink-0',
                                isSelected ? 'opacity-100 text-alcspower-primary-foreground' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  ))}
                </CommandList>
                {showFooter && (
                  <div className="flex items-center justify-between border-t border-alcspower-border/60 bg-alcspower-surface-muted/30 px-3.5 py-2 text-[11px] text-alcspower-muted-foreground select-none">
                    <div className="flex items-center gap-2.5">
                      <span className="flex items-center gap-1">
                        <kbd className="h-4.5 px-1 rounded border border-alcspower-border/70 bg-alcspower-surface font-mono text-[10px] font-semibold text-alcspower-foreground">
                          ↑↓
                        </kbd>
                        navegar
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="h-4.5 px-1 rounded border border-alcspower-border/70 bg-alcspower-surface font-mono text-[10px] font-semibold text-alcspower-foreground">
                          ↵
                        </kbd>
                        seleccionar
                      </span>
                    </div>
                    <span>esc cerrar</span>
                  </div>
                )}
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Badge contador */}
        {showCount && selectedOptions.length > 0 && (
          <span className="text-[11px] font-semibold text-alcspower-muted-foreground bg-alcspower-surface-muted border border-alcspower-border/60 px-2 py-0.5 rounded-full select-none shrink-0 self-center ml-auto mr-1">
            {selectedOptions.length} seleccionada{selectedOptions.length !== 1 ? 's' : ''}
          </span>
        )}

        {/* Botón de limpiar todo */}
        {clearable && selectedOptions.length > 0 && !disabled ? (
          <button
            type="button"
            aria-label="Limpiar todas las opciones"
            onClick={handleClearAll}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all cursor-pointer z-10 border-0 p-0',
              'bg-alcspower-surface-muted hover:bg-alcspower-border text-alcspower-muted-foreground hover:text-alcspower-foreground',
              'opacity-0 group-hover:opacity-100 focus:opacity-100',
              size === 'sm' ? 'right-8 w-5 h-5' : size === 'lg' ? 'right-10 w-6 h-6' : 'right-9 w-[22px] h-[22px]'
            )}
          >
            <X className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
          </button>
        ) : null}

        {/* Chevron */}
        <ChevronDown
          className={cn(
            'absolute top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200',
            hasError ? 'text-alcspower-destructive' : 'text-alcspower-muted-foreground/70',
            open && 'rotate-180 text-alcspower-primary',
            size === 'sm' ? 'right-3 h-3.5 w-3.5' : size === 'lg' ? 'right-4 h-[18px] w-[18px]' : 'right-3.5 h-4 w-4'
          )}
        />
      </div>
    );
  }
);
Combobox.displayName = 'Combobox';
