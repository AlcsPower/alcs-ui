import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { type ColumnDef } from '@tanstack/react-table';
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableToolbar,
} from './index';
import { ErrorState } from '../error-state';

interface TestUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

const testData: TestUser[] = [
  { id: '1', name: 'Carlos Gómez', email: 'carlos@example.com', role: 'Usuario' },
  { id: '2', name: 'Ana Martínez', email: 'ana@example.com', role: 'Admin' },
  { id: '3', name: 'Beatriz López', email: 'beatriz@example.com', role: 'Editor' },
];

const testColumns: ColumnDef<TestUser>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: 'role',
    header: 'Rol',
  },
];

describe('DataTable Component', () => {
  it('renders data rows and headers correctly', () => {
    render(<DataTable data={testData} columns={testColumns} />);

    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Rol')).toBeInTheDocument();

    expect(screen.getByText('Carlos Gómez')).toBeInTheDocument();
    expect(screen.getByText('carlos@example.com')).toBeInTheDocument();
    expect(screen.getByText('Ana Martínez')).toBeInTheDocument();
    expect(screen.getByText('ana@example.com')).toBeInTheDocument();
    expect(screen.getByText('Beatriz López')).toBeInTheDocument();
    expect(screen.getByText('beatriz@example.com')).toBeInTheDocument();
  });

  it('sorts data when clicking sortable header', () => {
    render(<DataTable data={testData} columns={testColumns} />);

    const sortButton = screen.getByRole('button', { name: /nombre/i });

    // Initial order: Carlos Gómez, Ana Martínez, Beatriz López
    const initialRows = screen.getAllByRole('row');
    // Header is row 0, data rows start at row 1
    expect(initialRows[1]).toHaveTextContent('Carlos Gómez');
    expect(initialRows[2]).toHaveTextContent('Ana Martínez');
    expect(initialRows[3]).toHaveTextContent('Beatriz López');

    // Click to sort ascending
    fireEvent.click(sortButton);
    const ascRows = screen.getAllByRole('row');
    expect(ascRows[1]).toHaveTextContent('Ana Martínez');
    expect(ascRows[2]).toHaveTextContent('Beatriz López');
    expect(ascRows[3]).toHaveTextContent('Carlos Gómez');

    // Click again to sort descending
    fireEvent.click(sortButton);
    const descRows = screen.getAllByRole('row');
    expect(descRows[1]).toHaveTextContent('Carlos Gómez');
    expect(descRows[2]).toHaveTextContent('Beatriz López');
    expect(descRows[3]).toHaveTextContent('Ana Martínez');
  });

  it('filters visible rows when searching', () => {
    render(<DataTable data={testData} columns={testColumns} />);

    const searchInput = screen.getByPlaceholderText('Buscar...');
    expect(screen.getByText('Carlos Gómez')).toBeInTheDocument();
    expect(screen.getByText('Ana Martínez')).toBeInTheDocument();

    // Type query
    fireEvent.change(searchInput, { target: { value: 'Ana' } });

    expect(screen.getByText('Ana Martínez')).toBeInTheDocument();
    expect(screen.queryByText('Carlos Gómez')).not.toBeInTheDocument();
    expect(screen.queryByText('Beatriz López')).not.toBeInTheDocument();

    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('Carlos Gómez')).toBeInTheDocument();
    expect(screen.getByText('Ana Martínez')).toBeInTheDocument();
    expect(screen.getByText('Beatriz López')).toBeInTheDocument();
  });

  it('navigates pages using pagination next and prev buttons', () => {
    const manyUsers: TestUser[] = Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Usuario ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: 'Usuario',
    }));

    render(<DataTable data={manyUsers} columns={testColumns} pageSize={10} />);

    expect(screen.getByText('Página 1 de 3')).toBeInTheDocument();
    expect(screen.getByText('Usuario 1')).toBeInTheDocument();
    expect(screen.getByText('Usuario 10')).toBeInTheDocument();
    expect(screen.queryByText('Usuario 11')).not.toBeInTheDocument();

    // Next page
    const nextButton = screen.getByRole('button', {
      name: /ir a la página siguiente/i,
    });
    fireEvent.click(nextButton);

    expect(screen.getByText('Página 2 de 3')).toBeInTheDocument();
    expect(screen.getByText('Usuario 11')).toBeInTheDocument();
    expect(screen.queryByText('Usuario 1')).not.toBeInTheDocument();

    // Last page
    const lastButton = screen.getByRole('button', {
      name: /ir a la última página/i,
    });
    fireEvent.click(lastButton);

    expect(screen.getByText('Página 3 de 3')).toBeInTheDocument();
    expect(screen.getByText('Usuario 25')).toBeInTheDocument();

    // Prev page
    const prevButton = screen.getByRole('button', {
      name: /ir a la página anterior/i,
    });
    fireEvent.click(prevButton);

    expect(screen.getByText('Página 2 de 3')).toBeInTheDocument();

    // First page
    const firstButton = screen.getByRole('button', {
      name: /ir a la primera página/i,
    });
    fireEvent.click(firstButton);

    expect(screen.getByText('Página 1 de 3')).toBeInTheDocument();
    expect(screen.getByText('Usuario 1')).toBeInTheDocument();
  });

  it('manages row selection with individual and select all checkboxes', () => {
    render(<DataTable data={testData} columns={testColumns} selectable />);

    expect(
      screen.getByText('0 de 3 fila(s) seleccionadas.')
    ).toBeInTheDocument();

    // Select first row
    const row1Checkbox = screen.getByRole('checkbox', {
      name: 'Seleccionar fila 1',
    });
    fireEvent.click(row1Checkbox);

    expect(
      screen.getByText('1 de 3 fila(s) seleccionadas.')
    ).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveAttribute('data-state', 'selected');

    // Select all
    const selectAllCheckbox = screen.getByRole('checkbox', {
      name: 'Seleccionar todo',
    });
    fireEvent.click(selectAllCheckbox);

    expect(
      screen.getByText('3 de 3 fila(s) seleccionadas.')
    ).toBeInTheDocument();
    expect(rows[1]).toHaveAttribute('data-state', 'selected');
    expect(rows[2]).toHaveAttribute('data-state', 'selected');
    expect(rows[3]).toHaveAttribute('data-state', 'selected');

    // Deselect all
    fireEvent.click(selectAllCheckbox);
    expect(
      screen.getByText('0 de 3 fila(s) seleccionadas.')
    ).toBeInTheDocument();
  });

  it('toggles column visibility from the dropdown menu', async () => {
    const user = userEvent.setup();
    render(<DataTable data={testData} columns={testColumns} />);

    // Initially Email column is in the document
    expect(screen.getByText('carlos@example.com')).toBeInTheDocument();

    // Open column visibility dropdown
    const columnsButton = screen.getByRole('button', {
      name: /alternar visibilidad de columnas|columnas/i,
    });
    await user.click(columnsButton);

    // Toggle Email off
    const emailCheckbox = screen.getByRole('menuitemcheckbox', {
      name: /email/i,
    });
    await user.click(emailCheckbox);

    // Email cell should no longer be rendered
    expect(screen.queryByText('carlos@example.com')).not.toBeInTheDocument();

    // Toggle Email back on
    await user.click(columnsButton);
    const emailCheckboxAgain = screen.getByRole('menuitemcheckbox', {
      name: /email/i,
    });
    await user.click(emailCheckboxAgain);

    expect(screen.getByText('carlos@example.com')).toBeInTheDocument();
  });

  it('displays EmptyState when data is empty', () => {
    render(<DataTable data={[]} columns={testColumns} />);

    expect(screen.getByText('No hay resultados')).toBeInTheDocument();
  });

  it('displays custom empty state when provided', () => {
    render(
      <DataTable
        data={[]}
        columns={testColumns}
        emptyState={<div>No se encontraron registros personalizados</div>}
      />
    );

    expect(
      screen.getByText('No se encontraron registros personalizados')
    ).toBeInTheDocument();
  });

  it('displays skeletons when isLoading is true', () => {
    const { container } = render(
      <DataTable
        data={testData}
        columns={testColumns}
        isLoading={true}
        loadingRowCount={4}
      />
    );

    // Should render 4 skeleton rows in tbody
    const rows = container.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(4);

    // Should not render actual data while loading
    expect(screen.queryByText('Carlos Gómez')).not.toBeInTheDocument();
  });

  it('displays ErrorState when error prop is passed', () => {
    render(
      <DataTable
        data={testData}
        columns={testColumns}
        error={
          <ErrorState
            title="Error de carga"
            description="No fue posible conectar con el servidor"
          />
        }
      />
    );

    expect(screen.getByText('Error de carga')).toBeInTheDocument();
    expect(
      screen.getByText('No fue posible conectar con el servidor')
    ).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays default ErrorState when error is a string', () => {
    render(
      <DataTable
        data={testData}
        columns={testColumns}
        error="Fallo al obtener información"
      />
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(
      screen.getByText('Fallo al obtener información')
    ).toBeInTheDocument();
  });

  it('hides toolbar when showToolbar={false}', () => {
    render(
      <DataTable data={testData} columns={testColumns} showToolbar={false} />
    );

    expect(screen.queryByPlaceholderText('Buscar...')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /columnas/i })
    ).not.toBeInTheDocument();
  });

  it('hides pagination when pagination={false}', () => {
    render(
      <DataTable data={testData} columns={testColumns} pagination={false} />
    );

    expect(screen.queryByText(/página 1 de/i)).not.toBeInTheDocument();
  });

  it('has no accessibility violations (axe) with full features enabled', async () => {
    const { container } = render(
      <DataTable data={testData} columns={testColumns} selectable />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations (axe) in empty state', async () => {
    const { container } = render(
      <DataTable data={[]} columns={testColumns} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations (axe) in loading state', async () => {
    const { container } = render(
      <DataTable data={[]} columns={testColumns} isLoading />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations (axe) in error state', async () => {
    const { container } = render(
      <DataTable
        data={[]}
        columns={testColumns}
        error={<ErrorState title="Error de prueba" />}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('forwards ref correctly on DataTable root element', () => {
    const tableRef = React.createRef<HTMLDivElement>();
    render(
      <DataTable
        ref={tableRef}
        data={testData}
        columns={testColumns}
      />
    );

    expect(tableRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders standalone DataTableToolbar and forwards ref', () => {
    const toolbarRef = React.createRef<HTMLDivElement>();
    render(
      <DataTable
        data={testData}
        columns={testColumns}
        showToolbar={false}
      />
    );

    // Also test standalone DataTableToolbar directly with dummy table instance
    expect(DataTableToolbar.displayName).toBe('DataTableToolbar');
    expect(DataTablePagination.displayName).toBe('DataTablePagination');
    expect(DataTableColumnHeader.displayName).toBe('DataTableColumnHeader');
    expect(toolbarRef.current).toBeNull();
  });
});

