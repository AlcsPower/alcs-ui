import * as React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState,
  type PaginationState,
  type VisibilityState,
  type RowSelectionState,
  type ColumnFiltersState,
  type TableState,
  type TableOptions,
  type OnChangeFn,
  flexRender,
} from '@tanstack/react-table';
import { cn } from '../../../lib/utils';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '../table';
import { Checkbox } from '../../forms/checkbox';
import { Skeleton } from '../../feedback/skeleton';
import { EmptyState } from '../../feedback/empty-state';
import { ErrorState } from '../../feedback/error-state';
import { DataTableToolbar } from './DataTableToolbar';
import { DataTablePagination } from './DataTablePagination';

export interface DataTableProps<TData, TValue = any>
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Array de datos para la tabla */
  data: TData[];
  /**
   * Definiciones de columnas de la tabla (`ColumnDef<TData, TValue>[]`).
   * 
   * @example
   * ```tsx
   * // Diferencia clave entre accessorFn y cell:
   * const columns: ColumnDef<SessionRecord>[] = [
   *   {
   *     id: 'ip',
   *     header: 'Dirección IP',
   *     // accessorFn recibe el item/fila crudo: (item: TData) => string
   *     accessorFn: (item) => item.target_ip ?? '—',
   *     // cell recibe el contexto de celda: ({ row }) => JSX, donde row.original es TData
   *     cell: ({ row }) => <span className="font-mono">{row.original.target_ip}</span>,
   *   }
   * ];
   * ```
   */
  columns: ColumnDef<TData, TValue>[];

  // Feature flags
  /** Habilita o deshabilita la paginación (por defecto true) */
  pagination?: boolean;
  /** Habilita o deshabilita la ordenación (por defecto true) */
  sorting?: boolean;
  /** Habilita o deshabilita el filtro de búsqueda global (por defecto true) */
  filtering?: boolean;
  /** Habilita o deshabilita la selección de filas con checkboxes (por defecto false) */
  selectable?: boolean;
  /** Habilita o deshabilita el menú para alternar visibilidad de columnas (por defecto true) */
  columnVisibility?: boolean;

  // Controlled states & handlers
  state?: Partial<TableState>;
  onSortingChange?: OnChangeFn<SortingState>;
  onPaginationChange?: OnChangeFn<PaginationState>;
  onGlobalFilterChange?: OnChangeFn<string>;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;

  // Defaults
  defaultSorting?: SortingState;
  defaultPagination?: PaginationState;
  defaultColumnVisibility?: VisibilityState;
  defaultRowSelection?: RowSelectionState;
  pageSize?: number;

  // Feedback states
  /** Indica si los datos están cargando, mostrando filas de skeleton */
  isLoading?: boolean;
  /** Número de filas de skeleton a mostrar durante la carga (por defecto 5) */
  loadingRowCount?: number;
  /** Nodo o mensaje de error a mostrar si falla la carga */
  error?: React.ReactNode;
  /** Componente o mensaje personalizado cuando no hay filas */
  emptyState?: React.ReactNode;

  // UI options
  /** Hace la tabla responsive con scroll horizontal (por defecto true) */
  responsive?: boolean;
  /** Placeholder para el input de búsqueda global */
  searchPlaceholder?: string;
  /** Elementos o botones adicionales para la barra de herramientas superior */
  toolbar?: React.ReactNode;
  /** Controla explícitamente si se muestra la barra de herramientas */
  showToolbar?: boolean;

  // Custom table options overrides
  tableOptions?: Partial<TableOptions<TData>>;
}

export const DataTable = React.forwardRef(
  <TData, TValue = unknown>(
    {
      data,
      columns,
      pagination = true,
      sorting = true,
      filtering = true,
      selectable = false,
      columnVisibility = true,
      state,
      onSortingChange,
      onPaginationChange,
      onGlobalFilterChange,
      onColumnFiltersChange,
      onColumnVisibilityChange,
      onRowSelectionChange,
      defaultSorting,
      defaultPagination,
      defaultColumnVisibility,
      defaultRowSelection,
      pageSize = 10,
      isLoading = false,
      loadingRowCount = 5,
      error,
      emptyState,
      responsive = true,
      searchPlaceholder = 'Buscar...',
      toolbar,
      showToolbar,
      tableOptions,
      className,
      children,
      ...props
    }: DataTableProps<TData, TValue>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    // Uncontrolled internal states
    const [internalSorting, setInternalSorting] = React.useState<SortingState>(
      defaultSorting ?? []
    );
    const [internalPagination, setInternalPagination] =
      React.useState<PaginationState>(
        defaultPagination ?? { pageIndex: 0, pageSize }
      );
    const [internalGlobalFilter, setInternalGlobalFilter] =
      React.useState<string>('');
    const [internalColumnVisibility, setInternalColumnVisibility] =
      React.useState<VisibilityState>(defaultColumnVisibility ?? {});
    const [internalRowSelection, setInternalRowSelection] =
      React.useState<RowSelectionState>(defaultRowSelection ?? {});

    // State resolution (controlled vs internal)
    const sortingState = state?.sorting ?? internalSorting;
    const paginationState = state?.pagination ?? internalPagination;
    const globalFilterState = state?.globalFilter ?? internalGlobalFilter;
    const columnVisibilityState =
      state?.columnVisibility ?? internalColumnVisibility;
    const rowSelectionState = state?.rowSelection ?? internalRowSelection;

    // Change handlers
    const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
      setInternalSorting(updater);
      onSortingChange?.(updater);
    };

    const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
      setInternalPagination(updater);
      onPaginationChange?.(updater);
    };

    const handleGlobalFilterChange: OnChangeFn<string> = (updater) => {
      setInternalGlobalFilter(updater);
      onGlobalFilterChange?.(updater);
    };

    const handleColumnVisibilityChange: OnChangeFn<VisibilityState> = (
      updater
    ) => {
      setInternalColumnVisibility(updater);
      onColumnVisibilityChange?.(updater);
    };

    const handleRowSelectionChange: OnChangeFn<RowSelectionState> = (
      updater
    ) => {
      setInternalRowSelection(updater);
      onRowSelectionChange?.(updater);
    };

    // Auto-prepend selection column if selectable is true and no 'select' column exists
    const effectiveColumns = React.useMemo(() => {
      if (!selectable) {
        return columns;
      }
      const hasSelect = columns.some((col) => col.id === 'select');
      if (hasSelect) {
        return columns;
      }
      const selectColumn: ColumnDef<TData, unknown> = {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected()
                ? true
                : table.getIsSomePageRowsSelected()
                ? 'indeterminate'
                : false
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Seleccionar todo"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={`Seleccionar fila ${row.index + 1}`}
            disabled={!row.getCanSelect()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      };
      return [selectColumn, ...columns];
    }, [columns, selectable]);

    const table = useReactTable({
      data,
      columns: effectiveColumns,
      state: {
        sorting: sortingState,
        pagination: paginationState,
        globalFilter: globalFilterState,
        columnVisibility: columnVisibilityState,
        rowSelection: rowSelectionState,
        ...state,
      },
      enableSorting: sorting !== false,
      enableRowSelection: selectable === true,
      onSortingChange: handleSortingChange,
      onPaginationChange: handlePaginationChange,
      onGlobalFilterChange: handleGlobalFilterChange,
      onColumnVisibilityChange: handleColumnVisibilityChange,
      onRowSelectionChange: handleRowSelectionChange,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel:
        pagination !== false ? getPaginationRowModel() : undefined,
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      ...tableOptions,
    });

    const isFilteringEnabled = filtering !== false;
    const isColumnVisibilityEnabled = columnVisibility !== false;
    const shouldShowToolbar =
      showToolbar ??
      (isFilteringEnabled ||
        isColumnVisibilityEnabled ||
        Boolean(toolbar) ||
        Boolean(children));

    const isPaginationEnabled = pagination !== false;
    const shouldShowPagination = isPaginationEnabled && !error;

    const visibleColumnsCount = Math.max(
      table.getVisibleLeafColumns().length,
      1
    );

    return (
      <div
        ref={ref}
        className={cn('w-full space-y-4', className)}
        {...props}
      >
        {shouldShowToolbar && (
          <DataTableToolbar
            table={table}
            searchPlaceholder={searchPlaceholder}
            showSearch={isFilteringEnabled}
            showColumnVisibility={isColumnVisibilityEnabled}
            toolbar={toolbar}
          >
            {children}
          </DataTableToolbar>
        )}

        <div className="rounded-md border border-alcspower-border">
          <Table responsive={responsive}>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: loadingRowCount }).map((_, rowIndex) => (
                  <TableRow key={`skeleton-row-${rowIndex}`}>
                    {Array.from({ length: visibleColumnsCount }).map(
                      (_, colIndex) => (
                        <TableCell
                          key={`skeleton-cell-${rowIndex}-${colIndex}`}
                        >
                          <Skeleton className="h-6 w-full" />
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={visibleColumnsCount}
                    className="h-64 p-4 text-center"
                  >
                    {React.isValidElement(error) ? (
                      error
                    ) : typeof error === 'string' ? (
                      <ErrorState title="Error" description={error} />
                    ) : (
                      <ErrorState
                        title="Error al cargar datos"
                        description="Ocurrió un error inesperado al procesar la información."
                      />
                    )}
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={visibleColumnsCount}
                    className="h-64 p-4 text-center"
                  >
                    {React.isValidElement(emptyState) ? (
                      emptyState
                    ) : typeof emptyState === 'string' ? (
                      <EmptyState title={emptyState} />
                    ) : (
                      <EmptyState
                        title="No hay resultados"
                        description="No se encontraron registros disponibles."
                      />
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {shouldShowPagination && (
          <DataTablePagination table={table} showSelectedCount={selectable} />
        )}
      </div>
    );
  }
) as (<TData, TValue = unknown>(
  props: DataTableProps<TData, TValue> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement) & { displayName?: string };

DataTable.displayName = 'DataTable';

