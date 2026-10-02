import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Alert, AlertTitle, AlertDescription } from './Alert';

describe('Alert Component', () => {
  it('renderiza con rol alert y variantes', () => {
    render(
      <Alert variant="warning">
        <AlertTitle>Atención</AlertTitle>
        <AlertDescription>El sistema entrará en mantenimiento programado.</AlertDescription>
      </Alert>
    );

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(screen.getByText(/atención/i)).toBeInTheDocument();
    expect(screen.getByText(/el sistema entrará en mantenimiento programado\./i)).toBeInTheDocument();
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <Alert variant="success">
        <AlertTitle>Operación Exitosa</AlertTitle>
        <AlertDescription>El trámite ha sido registrado con éxito.</AlertDescription>
      </Alert>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
