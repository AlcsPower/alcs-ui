import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

describe('ToggleGroup Component', () => {
  it('permite selección simple (type="single")', async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    render(
      <ToggleGroup type="single" defaultValue="centro" onValueChange={handleValueChange}>
        <ToggleGroupItem value="izquierda" aria-label="Alinear a la izquierda">
          Izq
        </ToggleGroupItem>
        <ToggleGroupItem value="centro" aria-label="Centrar">
          Centro
        </ToggleGroupItem>
        <ToggleGroupItem value="derecha" aria-label="Alinear a la derecha">
          Der
        </ToggleGroupItem>
      </ToggleGroup>
    );

    const izq = screen.getByRole('radio', { name: 'Alinear a la izquierda' });
    const centro = screen.getByRole('radio', { name: 'Centrar' });

    expect(centro).toBeChecked();
    expect(izq).not.toBeChecked();

    await user.click(izq);
    expect(handleValueChange).toHaveBeenCalledWith('izquierda');
  });

  it('permite selección múltiple (type="multiple")', async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    render(
      <ToggleGroup type="multiple" defaultValue={['b']} onValueChange={handleValueChange}>
        <ToggleGroupItem value="b" aria-label="Negrita">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="i" aria-label="Cursiva">
          I
        </ToggleGroupItem>
        <ToggleGroupItem value="u" aria-label="Subrayado">
          U
        </ToggleGroupItem>
      </ToggleGroup>
    );

    const negrita = screen.getByRole('button', { name: 'Negrita' });
    const cursiva = screen.getByRole('button', { name: 'Cursiva' });

    expect(negrita).toHaveAttribute('aria-pressed', 'true');
    expect(cursiva).toHaveAttribute('aria-pressed', 'false');

    await user.click(cursiva);
    expect(handleValueChange).toHaveBeenCalledWith(['b', 'i']);
  });

  it('propaga variantes y tamaños a los ítems hijos', () => {
    render(
      <ToggleGroup type="single" variant="outline" size="sm">
        <ToggleGroupItem value="1" aria-label="Uno">
          1
        </ToggleGroupItem>
      </ToggleGroup>
    );

    const item = screen.getByText('1');
    expect(item).toHaveClass('border', 'h-8');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <ToggleGroup type="single" defaultValue="1" aria-label="Vista">
        <ToggleGroupItem value="1" aria-label="Cuadrícula">
          G
        </ToggleGroupItem>
        <ToggleGroupItem value="2" aria-label="Lista">
          L
        </ToggleGroupItem>
      </ToggleGroup>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
