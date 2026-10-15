export * from './DataTable';
export * from './DataTableColumnHeader';
export * from './DataTablePagination';
export * from './DataTableToolbar';

// Re-exportación de utilidades y tipos de tabla (TanStack Table v8 pre-empaquetado)
export { createColumnHelper } from '@tanstack/react-table';

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
  ColumnDef as AlcsColumnDef,
  SortingState as AlcsSortingState,
  RowSelectionState as AlcsRowSelectionState,
  VisibilityState as AlcsVisibilityState,
  Column as AlcsColumn,
  Row as AlcsRow,
  CellContext as AlcsCellContext,
  HeaderContext as AlcsHeaderContext,
} from '@tanstack/react-table';
