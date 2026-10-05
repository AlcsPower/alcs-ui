import * as React from 'react';
import { type Table } from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../button';

export interface DataTablePaginationProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  showSelectedCount?: boolean;
}

export const DataTablePagination = React.forwardRef(
  <TData,>(
    {
      table,
      showSelectedCount,
      className,
      ...props
    }: DataTablePaginationProps<TData>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const isSelectionEnabled =
      showSelectedCount ??
      (table.options.enableRowSelection !== false &&
        table.options.enableRowSelection !== undefined);

    const selectedCount = table.getFilteredSelectedRowModel().rows.length;
    const totalCount = table.getFilteredRowModel().rows.length;
    const pageIndex = table.getState().pagination.pageIndex;
    const pageCount = Math.max(1, table.getPageCount());

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4',
          className
        )}
        {...props}
      >
        <div className="flex-1 text-sm text-alcspower-muted-foreground">
          {isSelectionEnabled ? (
            <span>
              {selectedCount} de {totalCount} fila(s) seleccionadas.
            </span>
          ) : null}
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center justify-center text-sm font-medium text-alcspower-foreground">
            Página {pageIndex + 1} de {pageCount}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              aria-label="Ir a la primera página"
              title="Ir a la primera página"
            >
              <span className="sr-only">Ir a la primera página</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Ir a la página anterior"
              title="Ir a la página anterior"
            >
              <span className="sr-only">Ir a la página anterior</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Ir a la página siguiente"
              title="Ir a la página siguiente"
            >
              <span className="sr-only">Ir a la página siguiente</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              aria-label="Ir a la última página"
              title="Ir a la última página"
            >
              <span className="sr-only">Ir a la última página</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
) as (<TData>(
  props: DataTablePaginationProps<TData> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement) & { displayName?: string };

DataTablePagination.displayName = 'DataTablePagination';

