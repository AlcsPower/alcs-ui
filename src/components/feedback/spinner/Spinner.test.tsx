import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Spinner } from './Spinner';

describe('Spinner Component', () => {
  it('renderiza con rol status y texto accesible para lectores de pantalla', () => {
    render(<Spinner label="Cargando información corporativa..." />);

    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByText(/cargando información corporativa\.\.\./i)).toBeInTheDocument();
  });

  it('aplica las clases correspondientes según el tamaño solicitado', () => {
    const { container: cSm } = render(<Spinner size="sm" />);
    expect(cSm.querySelector('svg')).toHaveClass('h-4');

    const { container: cXl } = render(<Spinner size="xl" />);
    expect(cXl.querySelector('svg')).toHaveClass('h-8');
  });

  it('soporta las nuevas variantes y colores semánticos', () => {
    const { container: cRing } = render(<Spinner variant="ring" color="primary" />);
    expect(cRing.querySelector('.spinner-ring')).toBeInTheDocument();
    expect(cRing.querySelector('.spinner-ring')).toHaveClass('text-alcspower-primary');

    const { container: cDots } = render(<Spinner variant="dots" color="success" />);
    expect(cDots.querySelector('.spinner-dots')).toBeInTheDocument();
    expect(cDots.querySelectorAll('.dot').length).toBe(3);

    const { container: cBars } = render(<Spinner variant="bars" />);
    expect(cBars.querySelector('.spinner-bars')).toBeInTheDocument();
    expect(cBars.querySelectorAll('.bar').length).toBe(4);
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(<Spinner />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
