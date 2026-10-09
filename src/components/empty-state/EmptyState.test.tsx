import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { EmptyState } from './EmptyState';
import { Button } from '../button';

describe('EmptyState Component', () => {
  it('renderiza título, descripción y acción', () => {
    render(
      <EmptyState
        title="Sin registros"
        description="No se encontraron solicitudes registradas para este usuario."
        action={<Button size="sm">Nueva Solicitud</Button>}
      />
    );

    expect(screen.getByText(/sin registros/i)).toBeInTheDocument();
    expect(
      screen.getByText(/no se encontraron solicitudes registradas para este usuario\./i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /nueva solicitud/i })).toBeInTheDocument();
  });

  it('soporta tamaños, colores semánticos y acciones secundarias', () => {
    const { container } = render(
      <EmptyState
        title="Sin resultados"
        description="Ajuste los filtros de búsqueda."
        color="warning"
        size="compact"
        variant="inside-card"
        action={<Button size="sm">Reintentar</Button>}
        secondaryAction={<Button size="sm" variant="outline">Limpiar filtros</Button>}
      />
    );

    expect(container.querySelector('.empty-state.inside-card')).toBeInTheDocument();
    expect(container.querySelector('.empty-icon-wrapper.warning.small')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reintentar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /limpiar filtros/i })).toBeInTheDocument();
  });

  it('permite personalizar el headingLevel', () => {
    render(<EmptyState title="Título H2" headingLevel="h2" />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Título H2');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <EmptyState
        title="Bandeja Vacía"
        description="Todos los trámites han sido completados."
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
