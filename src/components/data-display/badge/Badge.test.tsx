import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Badge } from './Badge';

describe('Badge Component', () => {
  it('renderiza con variante corporativa', () => {
    render(<Badge variant="success">Aprobado</Badge>);
    expect(screen.getByText(/aprobado/i)).toBeInTheDocument();
  });

  it('admite variant="primary" como alias idéntico de variant="default" (CONSISTENCY)', () => {
    const { container: c1 } = render(<Badge variant="primary">Activo</Badge>);
    const { container: c2 } = render(<Badge variant="default">Activo</Badge>);

    const badgePrimary = c1.querySelector('div');
    const badgeDefault = c2.querySelector('div');

    expect(badgePrimary?.className).toBe(badgeDefault?.className);
    expect(badgePrimary?.className).toContain('bg-alcspower-primary');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(<Badge variant="default">Pendiente</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
