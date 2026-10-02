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
