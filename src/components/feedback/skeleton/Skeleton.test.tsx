import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Skeleton } from './Skeleton';

describe('Skeleton Component', () => {
  it('renderiza por defecto con efecto shine y aria-hidden', () => {
    const { container } = render(<Skeleton className="h-6 w-32" />);
    const el = container.firstElementChild as HTMLElement;

    expect(el).toHaveClass('skeleton');
    expect(el).toHaveClass('relative');
    expect(el).toHaveClass('overflow-hidden');
    expect(el).toHaveClass('h-6');
    expect(el).toHaveClass('w-32');
    expect(el).toHaveAttribute('aria-hidden', 'true');
  });

  it('soporta animación pulse clásica', () => {
    const { container } = render(<Skeleton animation="pulse" className="h-6 w-32" />);
    const el = container.firstElementChild as HTMLElement;

    expect(el).toHaveClass('animate-pulse');
    expect(el).not.toHaveClass('skeleton');
  });

  it('permite desactivar la animación (sin shine)', () => {
    const { container } = render(<Skeleton animation="none" className="h-6 w-32" />);
    const el = container.firstElementChild as HTMLElement;

    expect(el).toHaveClass('no-shine');
    expect(el).not.toHaveClass('animate-pulse');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <div>
        <Skeleton className="h-4 w-48 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
