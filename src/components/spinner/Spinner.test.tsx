import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Spinner } from './Spinner';

describe('Spinner Component', () => {
  it('renderiza con rol status y texto accesible para lectores de pantalla', () => {
    render(<Spinner label="Cargando información institucional..." />);

    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByText(/cargando información institucional\.\.\./i)).toBeInTheDocument();
  });

  it('aplica las clases correspondientes según el tamaño solicitado', () => {
    const { container: cSm } = render(<Spinner size="sm" />);
    expect(cSm.querySelector('svg')).toHaveClass('h-4');

    const { container: cXl } = render(<Spinner size="xl" />);
    expect(cXl.querySelector('svg')).toHaveClass('h-8');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(<Spinner />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
