import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Slider } from './Slider';

describe('Slider Component', () => {
  it('renderiza el control deslizante con role="slider"', () => {
    render(<Slider defaultValue={[50]} max={100} min={0} step={1} aria-label="Volumen" />);
    const slider = screen.getByRole('slider', { name: 'Volumen' });

    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('aria-valuenow', '50');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
  });

  it('permite cambiar el valor mediante navegación por teclado (ArrowRight / ArrowLeft)', async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    render(
      <Slider
        defaultValue={[30]}
        max={100}
        min={0}
        step={5}
        onValueChange={handleValueChange}
        aria-label="Porcentaje"
      />
    );

    const slider = screen.getByRole('slider', { name: 'Porcentaje' });
    slider.focus();
    expect(slider).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(handleValueChange).toHaveBeenCalledWith([35]);

    await user.keyboard('{ArrowLeft}');
    expect(handleValueChange).toHaveBeenCalledWith([30]);
  });

  it('soporta múltiples tiradores para rangos (rango min-max)', () => {
    render(
      <Slider defaultValue={[20, 80]} max={100} min={0} step={1} aria-label="Rango de precios" />
    );

    const thumbs = screen.getAllByRole('slider');
    expect(thumbs).toHaveLength(2);
    expect(thumbs[0]).toHaveAttribute('aria-valuenow', '20');
    expect(thumbs[1]).toHaveAttribute('aria-valuenow', '80');
  });

  it('respeta la propiedad disabled impidiendo la interacción', async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    render(
      <Slider
        defaultValue={[50]}
        disabled
        onValueChange={handleValueChange}
        aria-label="Deshabilitado"
      />
    );

    const slider = screen.getByRole('slider', { name: 'Deshabilitado' });
    expect(slider).toHaveAttribute('data-disabled');

    slider.focus();
    await user.keyboard('{ArrowRight}');
    expect(handleValueChange).not.toHaveBeenCalled();
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <Slider defaultValue={[60]} max={100} min={0} aria-label="Nivel de brillo" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
