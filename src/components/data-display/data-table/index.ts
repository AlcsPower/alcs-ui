import type { ColumnDef } from '@tanstack/react-table';

export * from './DataTable';
export * from './DataTableColumnHeader';
export * from './DataTablePagination';
export * from './DataTableToolbar';

// Re-exportación de utilidades y tipos de tabla (TanStack Table v8 pre-empaquetado)
export { createColumnHelper } from '@tanstack/react-table';

/**
 * Definición de columna tipada para DataTable con genérico abierto `TValue = any`.
 * Permite que colecciones heterogéneas producidas por `createColumnHelper`
 * sean asignables directamente a `AlcsColumnDef<TData>[]` sin requerir conversiones de tipo manuales.
 */
export type AlcsColumnDef<TData, TValue = any> = ColumnDef<TData, TValue>;

export type {
  ColumnDef,
  SortingState,
  RowSelectionState,
  VisibilityState,
  Column,
  Row,
  CellContext,
  HeaderContext,
  PaginationState,
  ColumnFiltersState,
  TableState,
  // Alias semánticos y seguros para evitar colisión con el componente <Table>
  Table as TableInstance,
  Table as AlcsTable,
  SortingState as AlcsSortingState,
  RowSelectionState as AlcsRowSelectionState,
  VisibilityState as AlcsVisibilityState,
  Column as AlcsColumn,
  Row as AlcsRow,
  CellContext as AlcsCellContext,
  HeaderContext as AlcsHeaderContext,
} from '@tanstack/react-table';
