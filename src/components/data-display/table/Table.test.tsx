import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption
} from './Table';

describe('Table Component', () => {
  it('renders a basic table with thead, tbody, tr, th, td', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Juan Pérez</TableCell>
            <TableCell>juan@example.com</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('juan@example.com')).toBeInTheDocument();
  });

  it('TableCaption renders as <caption>', () => {
    render(
      <Table>
        <TableCaption>Lista de usuarios</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Dato</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const caption = screen.getByText('Lista de usuarios');
    expect(caption.tagName.toLowerCase()).toBe('caption');
  });

  it('TableFooter renders as <tfoot>', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Dato</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter data-testid="table-footer">
          <TableRow>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    const footer = screen.getByTestId('table-footer');
    expect(footer.tagName.toLowerCase()).toBe('tfoot');
  });

  it('Responsive prop wraps in a scroll container div', () => {
    render(
      <Table responsive data-testid="responsive-table">
        <TableBody>
          <TableRow>
            <TableCell>Contenido</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const table = screen.getByTestId('responsive-table');
    const wrapper = table.parentElement;
    expect(wrapper).toHaveClass('relative w-full overflow-auto');
    expect(wrapper?.tagName.toLowerCase()).toBe('div');
  });

  it('does NOT wrap in scroll container when responsive is not set', () => {
    const { container } = render(
      <Table data-testid="non-responsive-table">
        <TableBody>
          <TableRow>
            <TableCell>Contenido</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const table = screen.getByTestId('non-responsive-table');
    expect(table.parentElement).toBe(container);
  });

  it("data-[state=selected] style is applied on TableRow (test by setting data-state='selected')", () => {
    render(
      <Table>
        <TableBody>
          <TableRow data-state="selected" data-testid="selected-row">
            <TableCell>Fila seleccionada</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const row = screen.getByTestId('selected-row');
    expect(row).toHaveAttribute('data-state', 'selected');
    expect(row).toHaveClass('data-[state=selected]:bg-alcspower-surface-muted');
  });

  it('className override works on Table, TableRow, TableHead, TableCell', () => {
    render(
      <Table className="custom-table" data-testid="custom-table">
        <TableHeader>
          <TableRow className="custom-row" data-testid="custom-row">
            <TableHead className="custom-head" data-testid="custom-head">
              Columna
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="custom-cell" data-testid="custom-cell">
              Celda
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByTestId('custom-table')).toHaveClass('custom-table');
    expect(screen.getByTestId('custom-row')).toHaveClass('custom-row');
    expect(screen.getByTestId('custom-head')).toHaveClass('custom-head');
    expect(screen.getByTestId('custom-cell')).toHaveClass('custom-cell');
  });

  it('All subcomponents render correct HTML elements (table, thead, tbody, tfoot, tr, th, td, caption)', () => {
    render(
      <Table data-testid="table">
        <TableCaption data-testid="caption">Resumen de ventas</TableCaption>
        <TableHeader data-testid="header">
          <TableRow data-testid="head-row">
            <TableHead data-testid="head">Artículo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody data-testid="body">
          <TableRow data-testid="body-row">
            <TableCell data-testid="cell">Laptop</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter data-testid="footer">
          <TableRow data-testid="footer-row">
            <TableCell data-testid="footer-cell">Total</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    expect(screen.getByTestId('table').tagName.toLowerCase()).toBe('table');
    expect(screen.getByTestId('caption').tagName.toLowerCase()).toBe('caption');
    expect(screen.getByTestId('header').tagName.toLowerCase()).toBe('thead');
    expect(screen.getByTestId('head-row').tagName.toLowerCase()).toBe('tr');
    expect(screen.getByTestId('head').tagName.toLowerCase()).toBe('th');
    expect(screen.getByTestId('body').tagName.toLowerCase()).toBe('tbody');
    expect(screen.getByTestId('body-row').tagName.toLowerCase()).toBe('tr');
    expect(screen.getByTestId('cell').tagName.toLowerCase()).toBe('td');
    expect(screen.getByTestId('footer').tagName.toLowerCase()).toBe('tfoot');
    expect(screen.getByTestId('footer-row').tagName.toLowerCase()).toBe('tr');
    expect(screen.getByTestId('footer-cell').tagName.toLowerCase()).toBe('td');
  });

  it('forwards ref correctly to HTMLTableElement', () => {
    const tableRef = React.createRef<HTMLTableElement>();
    render(
      <Table ref={tableRef}>
        <TableBody>
          <TableRow>
            <TableCell>Ref Test</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(tableRef.current).toBeInstanceOf(HTMLTableElement);
  });

  it('forwards ref in responsive mode correctly to HTMLTableElement', () => {
    const tableRef = React.createRef<HTMLTableElement>();
    render(
      <Table ref={tableRef} responsive>
        <TableBody>
          <TableRow>
            <TableCell>Ref Test Responsive</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(tableRef.current).toBeInstanceOf(HTMLTableElement);
  });

  it('axe accessibility: 0 violations', async () => {
    const { container } = render(
      <Table aria-label="Tabla de usuarios">
        <TableCaption>Lista de usuarios registrados en el sistema</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Nombre</TableHead>
            <TableHead scope="col">Correo corporativo</TableHead>
            <TableHead scope="col">Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Ana Martínez</TableCell>
            <TableCell>ana.martinez@empresa.com</TableCell>
            <TableCell>Activo</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Carlos Gómez</TableCell>
            <TableCell>carlos.gomez@empresa.com</TableCell>
            <TableCell>Pendiente</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total de registros</TableCell>
            <TableCell>2</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
