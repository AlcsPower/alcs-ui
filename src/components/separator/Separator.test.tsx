import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Separator } from './Separator';

describe('Separator Component', () => {
  it('renderiza con orientación horizontal por defecto', () => {
    const { container } = render(<Separator />);
    const sep = container.firstElementChild as HTMLElement;
    expect(sep).toHaveClass('h-[1px]');
    expect(sep).toHaveClass('w-full');
    expect(sep).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('renderiza con orientación vertical', () => {
    const { container } = render(<Separator orientation="vertical" />);
    const sep = container.firstElementChild as HTMLElement;
    expect(sep).toHaveClass('h-full');
    expect(sep).toHaveClass('w-[1px]');
    expect(sep).toHaveAttribute('data-orientation', 'vertical');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <div>
        <p>Texto Superior</p>
        <Separator />
        <p>Texto Inferior</p>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
