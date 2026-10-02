import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Badge } from './Badge';

describe('Badge Component', () => {
  it('renderiza con variante institucional', () => {
    render(<Badge variant="success">Aprobado</Badge>);
    expect(screen.getByText(/aprobado/i)).toBeInTheDocument();
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(<Badge variant="default">Pendiente</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
