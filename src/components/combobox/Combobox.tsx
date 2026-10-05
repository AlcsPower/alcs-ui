import * as React from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../command';
import { datePickerVariants } from '../date-picker';
import { Badge } from '../badge';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface ComboboxSingleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange'>,
    VariantProps<typeof datePickerVariants> {
  multiple?: false;
  value?: string;
  onChange?: (value: string | undefined) => void;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  clearable?: boolean;
  hasError?: boolean;
  size?: 'sm' | 'md' | 'lg';
  popoverClassName?: string;
}

export interface ComboboxMultiProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange'>,
    VariantProps<typeof datePickerVariants> {
  multiple: true;
  value?: string[];
  onChange?: (value: string[]) => void;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  clearable?: boolean;
  hasError?: boolean;
  size?: 'sm' | 'md' | 'lg';
  popoverClassName?: string;
}

export type ComboboxProps = ComboboxSingleProps | ComboboxMultiProps;

export const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (props, ref) => {
    const {
      className,
      options,
      placeholder = 'Selecciona una opción...',
      searchPlaceholder = 'Buscar opción...',
      emptyText = 'No se encontraron resultados.',
      clearable = true,
      hasError = false,
      size = 'md',
      disabled = false,
      popoverClassName,
      id,
      multiple,
      value,
      onChange,
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

    // Modo selección simple
    if (!multiple) {
      const singleValue = value as string | undefined;
      const singleOnChange = onChange as ((val: string | undefined) => void) | undefined;
      const selectedOption = options.find((opt) => opt.value === singleValue);

      const handleSelect = (val: string) => {
        const nextVal = val === singleValue ? undefined : val;
        singleOnChange?.(nextVal);
        setOpen(false);
      };

      const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        singleOnChange?.(undefined);
      };

      const iconSize =
        size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';

      return (
        <div
          className={cn(
            'relative flex w-full items-center justify-between',
            datePickerVariants({ size, hasError }),
            'focus-within:ring-2 focus-within:ring-alcspower-ring focus-within:ring-offset-2 ring-offset-alcspower-surface',
            disabled && 'cursor-not-allowed opacity-50 bg-alcspower-surface-muted',
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
                  'flex-1 flex items-center justify-between gap-2 truncate text-left outline-none bg-transparent min-w-0 cursor-pointer disabled:cursor-not-allowed',
                  !selectedOption && 'text-alcspower-muted-foreground'
                )}
                {...restProps}
              >
                <span className="truncate">
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronsUpDown className={cn(iconSize, 'opacity-50 shrink-0 ml-1')} />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className={cn('w-[var(--radix-popover-trigger-width)] min-w-[200px] p-0', popoverClassName)}
              align="start"
            >
              <Command>
                <CommandInput placeholder={searchPlaceholder} />
                <CommandList>
                  <CommandEmpty>{emptyText}</CommandEmpty>
                  {groupedOptions.ungrouped.length > 0 && (
                    <CommandGroup>
                      {groupedOptions.ungrouped.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          disabled={option.disabled}
                          onSelect={() => handleSelect(option.value)}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              singleValue === option.value
                                ? 'opacity-100 text-alcspower-primary'
                                : 'opacity-0'
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                  {Object.entries(groupedOptions.groups).map(([groupName, groupOpts]) => (
                    <CommandGroup key={groupName} heading={groupName}>
                      {groupOpts.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          disabled={option.disabled}
                          onSelect={() => handleSelect(option.value)}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              singleValue === option.value
                                ? 'opacity-100 text-alcspower-primary'
                                : 'opacity-0'
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {clearable && selectedOption && !disabled ? (
            <button
              type="button"
              aria-label="Limpiar selección"
              onClick={handleClear}
              className="ml-1 rounded-alcspower-sm p-0.5 opacity-60 hover:opacity-100 hover:bg-alcspower-surface-muted focus:outline-none focus:ring-1 focus:ring-alcspower-ring text-alcspower-foreground shrink-0"
            >
              <X className={iconSize} />
            </button>
          ) : null}
        </div>
      );
    }

    // Modo selección múltiple
    const multiValue = (value as string[] | undefined) || [];
    const multiOnChange = onChange as ((val: string[]) => void) | undefined;
    const selectedOptions = options.filter((opt) => multiValue.includes(opt.value));

    const handleToggle = (val: string) => {
      const nextValues = multiValue.includes(val)
        ? multiValue.filter((v) => v !== val)
        : [...multiValue, val];
      multiOnChange?.(nextValues);
    };

    const handleRemoveChip = (e: React.MouseEvent, val: string) => {
      e.stopPropagation();
      multiOnChange?.(multiValue.filter((v) => v !== val));
    };

    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      multiOnChange?.([]);
    };

    const iconSize =
      size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';

    return (
      <div
        className={cn(
          'relative flex w-full items-center justify-between flex-wrap gap-1.5',
          datePickerVariants({ size, hasError }),
          'h-auto min-h-[2.5rem] py-1.5',
          'focus-within:ring-2 focus-within:ring-alcspower-ring focus-within:ring-offset-2 ring-offset-alcspower-surface',
          disabled && 'cursor-not-allowed opacity-50 bg-alcspower-surface-muted',
          className
        )}
      >
        <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
          {selectedOptions.map((opt) => (
            <Badge
              key={opt.value}
              variant="secondary"
              className="text-xs py-0.5 px-2 flex items-center gap-1 max-w-[200px] truncate"
            >
              <span className="truncate">{opt.label}</span>
              {!disabled && (
                <button
                  type="button"
                  aria-label={`Eliminar ${opt.label}`}
                  onClick={(e) => handleRemoveChip(e, opt.value)}
                  className="rounded-full hover:bg-alcspower-surface-muted p-0.5 inline-flex focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Badge>
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
                  'flex-1 min-w-[80px] text-left outline-none bg-transparent cursor-pointer disabled:cursor-not-allowed text-xs',
                  selectedOptions.length === 0 ? 'text-alcspower-muted-foreground' : 'text-transparent'
                )}
                {...restProps}
              >
                {selectedOptions.length === 0 ? placeholder : ''}
              </button>
            </PopoverTrigger>
            <PopoverContent
              className={cn('w-[var(--radix-popover-trigger-width)] min-w-[220px] p-0', popoverClassName)}
              align="start"
            >
              <Command>
                <CommandInput placeholder={searchPlaceholder} />
                <CommandList>
                  <CommandEmpty>{emptyText}</CommandEmpty>
                  {groupedOptions.ungrouped.length > 0 && (
                    <CommandGroup>
                      {groupedOptions.ungrouped.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          disabled={option.disabled}
                          onSelect={() => handleToggle(option.value)}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              multiValue.includes(option.value)
                                ? 'opacity-100 text-alcspower-primary'
                                : 'opacity-0'
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                  {Object.entries(groupedOptions.groups).map(([groupName, groupOpts]) => (
                    <CommandGroup key={groupName} heading={groupName}>
                      {groupOpts.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          disabled={option.disabled}
                          onSelect={() => handleToggle(option.value)}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              multiValue.includes(option.value)
                                ? 'opacity-100 text-alcspower-primary'
                                : 'opacity-0'
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-1 ml-2 shrink-0">
          {clearable && selectedOptions.length > 0 && !disabled ? (
            <button
              type="button"
              aria-label="Limpiar todas las opciones"
              onClick={handleClearAll}
              className="rounded-alcspower-sm p-0.5 opacity-60 hover:opacity-100 hover:bg-alcspower-surface-muted focus:outline-none focus:ring-1 focus:ring-alcspower-ring text-alcspower-foreground"
            >
              <X className={iconSize} />
            </button>
          ) : null}
          <ChevronsUpDown className={cn(iconSize, 'opacity-50')} />
        </div>
      </div>
    );
  }
);
Combobox.displayName = 'Combobox';
