import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from './Pagination';

describe('Pagination Component', () => {
  it('renderiza un elemento nav con role="navigation" y aria-label="Paginación"', () => {
    render(<Pagination />);
    const nav = screen.getByRole('navigation', { name: /paginación/i });
    expect(nav).toBeInTheDocument();
    expect(nav.tagName.toLowerCase()).toBe('nav');
    expect(nav).toHaveAttribute('aria-label', 'Paginación');
  });

  it('permite sobrescribir className en Pagination', () => {
    const { container } = render(<Pagination className="custom-pagination" />);
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('custom-pagination');
  });

  it('PaginationLink renderiza como un elemento button con type="button"', () => {
    render(<PaginationLink>1</PaginationLink>);
    const button = screen.getByRole('button', { name: '1' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('isActive aplica aria-current="page" y estilos primarios (bg-alcspower-primary)', () => {
    render(<PaginationLink isActive>1</PaginationLink>);
    const button = screen.getByRole('button', { name: '1' });
    expect(button).toHaveAttribute('aria-current', 'page');
    expect(button).toHaveClass('bg-alcspower-primary');
    expect(button).toHaveClass('text-alcspower-primary-foreground');
    expect(button).toHaveClass('border-alcspower-primary');
  });

  it('el enlace no activo tiene estilos por defecto y no tiene aria-current', () => {
    render(<PaginationLink isActive={false}>2</PaginationLink>);
    const button = screen.getByRole('button', { name: '2' });
    expect(button).not.toHaveAttribute('aria-current');
    expect(button).toHaveClass('bg-alcspower-surface');
    expect(button).toHaveClass('text-alcspower-foreground');
    expect(button).toHaveClass('border-alcspower-border');
  });

  it('PaginationPrevious renderiza con icono ChevronLeft y texto "Anterior"', () => {
    render(<PaginationPrevious />);
    const button = screen.getByRole('button', { name: /anterior/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Ir a la página anterior');
    expect(screen.getByText('Anterior')).toBeInTheDocument();
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('PaginationPrevious permite personalizar el texto mediante children', () => {
    render(<PaginationPrevious>Prev</PaginationPrevious>);
    const button = screen.getByRole('button', { name: 'Ir a la página anterior' });
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Prev')).toBeInTheDocument();
  });

  it('PaginationNext renderiza con icono ChevronRight y texto "Siguiente"', () => {
    render(<PaginationNext />);
    const button = screen.getByRole('button', { name: 'Ir a la página siguiente' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Ir a la página siguiente');
    expect(screen.getByText('Siguiente')).toBeInTheDocument();
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('PaginationNext permite personalizar el texto mediante children', () => {
    render(<PaginationNext>Next</PaginationNext>);
    const button = screen.getByRole('button', { name: 'Ir a la página siguiente' });
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('PaginationEllipsis renderiza con texto accesible "Más páginas" y oculta solo el icono decorativo', () => {
    render(<PaginationEllipsis data-testid="ellipsis" />);
    const ellipsis = screen.getByTestId('ellipsis');
    expect(ellipsis).not.toHaveAttribute('aria-hidden');
    expect(screen.getByText('Más páginas')).toBeInTheDocument();
    expect(screen.getByText('Más páginas')).toHaveClass('sr-only');
    expect(ellipsis.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('el botón deshabilitado tiene el atributo disabled y clases de opacidad', () => {
    render(<PaginationLink disabled>1</PaginationLink>);
    const button = screen.getByRole('button', { name: '1' });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
    expect(button).toHaveClass('disabled:pointer-events-none');
  });

  it('permite sobrescribir className en PaginationLink', () => {
    render(<PaginationLink className="custom-link">1</PaginationLink>);
    const button = screen.getByRole('button', { name: '1' });
    expect(button).toHaveClass('custom-link');
  });

  it('aplica las clases correctas según las variantes de tamaño (sm, md)', () => {
    const { rerender } = render(<PaginationLink size="sm">1</PaginationLink>);
    let button = screen.getByRole('button', { name: '1' });
    expect(button).toHaveClass('h-8');
    expect(button).toHaveClass('text-xs');

    rerender(<PaginationLink size="md">1</PaginationLink>);
    button = screen.getByRole('button', { name: '1' });
    expect(button).toHaveClass('h-9');
    expect(button).toHaveClass('text-sm');
  });

  it('PaginationContent y PaginationItem renderizan correctamente', () => {
    render(
      <PaginationContent data-testid="list">
        <PaginationItem data-testid="item">Contenido</PaginationItem>
      </PaginationContent>
    );
    const list = screen.getByTestId('list');
    const item = screen.getByTestId('item');
    expect(list.tagName.toLowerCase()).toBe('ul');
    expect(item.tagName.toLowerCase()).toBe('li');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
