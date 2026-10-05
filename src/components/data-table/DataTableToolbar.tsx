import * as React from 'react';
import { type Table, type Column } from '@tanstack/react-table';
import { Search, SlidersHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Input } from '../input';
import { Button } from '../button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../dropdown-menu';

export interface DataTableToolbarProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  searchPlaceholder?: string;
  showSearch?: boolean;
  showColumnVisibility?: boolean;
  toolbar?: React.ReactNode;
  children?: React.ReactNode;
}

function getColumnTitle<TData>(column: Column<TData, unknown>): string {
  if (typeof column.columnDef.header === 'string') {
    return column.columnDef.header;
  }
  const meta = column.columnDef.meta as
    | { title?: string; label?: string }
    | undefined;
  if (meta?.title) return meta.title;
  if (meta?.label) return meta.label;
  return column.id.replace(/[-_]/g, ' ');
}

export const DataTableToolbar = React.forwardRef(
  <TData,>(
    {
      table,
      searchPlaceholder = 'Buscar...',
      showSearch = true,
      showColumnVisibility = true,
      toolbar,
      children,
      className,
      ...props
    }: DataTableToolbarProps<TData>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const hideableColumns = table
      .getAllColumns()
      .filter((column) => column.getCanHide());

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 py-4',
          className
        )}
        {...props}
      >
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {showSearch && (
            <Input
              placeholder={searchPlaceholder}
              value={(table.getState().globalFilter as string) ?? ''}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              leftElement={<Search className="h-4 w-4" />}
              className="h-9 w-full sm:w-[250px] lg:w-[300px]"
              aria-label={searchPlaceholder}
            />
          )}
          {children}
          {toolbar}
        </div>
        {showColumnVisibility && hideableColumns.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto flex h-9 gap-2"
                aria-label="Alternar visibilidad de columnas"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Columnas</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Alternar columnas</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {hideableColumns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {getColumnTitle(column)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    );
  }
) as (<TData>(
  props: DataTableToolbarProps<TData> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement) & { displayName?: string };

DataTableToolbar.displayName = 'DataTableToolbar';

