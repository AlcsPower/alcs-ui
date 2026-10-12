import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { NumberInput } from './NumberInput';

describe('NumberInput Component', () => {
  it('renderiza con rol spinbutton y valor inicial no controlado', () => {
    render(<NumberInput defaultValue={10} aria-label="Cantidad" />);

    const spinbutton = screen.getByRole('spinbutton', { name: /cantidad/i });
    expect(spinbutton).toBeInTheDocument();
    expect(spinbutton).toHaveValue('10');
    expect(spinbutton).toHaveAttribute('aria-valuenow', '10');
  });

  it('soporta modo controlado con prop value', () => {
    const { rerender } = render(
      <NumberInput value={25} aria-label="Porcentaje" onChange={vi.fn()} />
    );

    const spinbutton = screen.getByRole('spinbutton', { name: /porcentaje/i });
    expect(spinbutton).toHaveValue('25');

    rerender(<NumberInput value={30} aria-label="Porcentaje" onChange={vi.fn()} />);
    expect(spinbutton).toHaveValue('30');
  });

  it('incrementa y decrementa valor al hacer clic en los botones stepper', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <NumberInput
        defaultValue={5}
        step={1}
        onChange={handleChange}
        aria-label="Contador"
      />
    );

    const incrementBtn = screen.getByRole('button', { name: /incrementar valor/i });
    const decrementBtn = screen.getByRole('button', { name: /decrementar valor/i });

    await user.click(incrementBtn);
    expect(handleChange).toHaveBeenCalledWith(6);

    await user.click(decrementBtn);
    expect(handleChange).toHaveBeenCalledWith(5);
  });

  it('respeta límites min y max deshabilitando los botones correspondientes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <NumberInput
        defaultValue={10}
        min={10}
        max={12}
        step={1}
        onChange={handleChange}
        aria-label="Límite"
      />
    );

    const decrementBtn = screen.getByRole('button', { name: /decrementar valor/i });
    const incrementBtn = screen.getByRole('button', { name: /incrementar valor/i });

    expect(decrementBtn).toBeDisabled();
    expect(incrementBtn).not.toBeDisabled();

    await user.click(incrementBtn); // 11
    expect(decrementBtn).not.toBeDisabled();
    expect(incrementBtn).not.toBeDisabled();

    await user.click(incrementBtn); // 12
    expect(incrementBtn).toBeDisabled();
  });

  it('soporta navegación y atajos de teclado (ArrowUp, ArrowDown, Shift, Home, End)', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <NumberInput
        defaultValue={50}
        min={0}
        max={100}
        step={1}
        stepMultiplier={10}
        onChange={handleChange}
        aria-label="Arancel"
      />
    );

    const spinbutton = screen.getByRole('spinbutton', { name: /arancel/i });
    await user.click(spinbutton);

    // Flecha Arriba (+1)
    await user.keyboard('{ArrowUp}');
    expect(handleChange).toHaveBeenCalledWith(51);

    // Flecha Abajo (-1)
    await user.keyboard('{ArrowDown}');
    expect(handleChange).toHaveBeenCalledWith(50);

    // Shift + Flecha Arriba (+10)
    await user.keyboard('{Shift>}{ArrowUp}{/Shift}');
    expect(handleChange).toHaveBeenCalledWith(60);

    // Tecla End (salta a max)
    await user.keyboard('{End}');
    expect(handleChange).toHaveBeenCalledWith(100);

    // Tecla Home (salta a min)
    await user.keyboard('{Home}');
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('maneja precisión decimal correctamente sin errores de coma flotante', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <NumberInput
        defaultValue={1.5}
        step={0.25}
        precision={2}
        onChange={handleChange}
        aria-label="Precio"
      />
    );

    const incrementBtn = screen.getByRole('button', { name: /incrementar valor/i });
    await user.click(incrementBtn);

    expect(handleChange).toHaveBeenCalledWith(1.75);
    const spinbutton = screen.getByRole('spinbutton', { name: /precio/i });
    expect(spinbutton).toHaveValue('1.75');
  });

  it('ajusta automáticamente valores fuera de rango al perder el foco (clampValueOnBlur)', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <NumberInput
        defaultValue={5}
        min={1}
        max={10}
        clampValueOnBlur={true}
        onChange={handleChange}
        aria-label="Rango"
      />
    );

    const spinbutton = screen.getByRole('spinbutton', { name: /rango/i });
    await user.clear(spinbutton);
    await user.type(spinbutton, '99');
    await user.tab(); // Blur

    expect(handleChange).toHaveBeenLastCalledWith(10);
    expect(spinbutton).toHaveValue('10');
  });

  it('renderiza prefijo y sufijo correctamente', () => {
    render(
      <NumberInput
        defaultValue={150}
        prefix="C$"
        suffix="NIO"
        aria-label="Moneda"
      />
    );

    expect(screen.getByText('C$')).toBeInTheDocument();
    expect(screen.getByText('NIO')).toBeInTheDocument();
  });

  it('soporta prop currency configurando automáticamente prefijo, sufijo y precisión', () => {
    // NIO (Córdoba nicaragüense)
    const { unmount } = render(
      <NumberInput defaultValue={500} currency="NIO" aria-label="NIO" />
    );
    expect(screen.getByText('C$')).toBeInTheDocument();
    expect(screen.getByText('NIO')).toBeInTheDocument();
    unmount();

    // EUR (Euro)
    render(<NumberInput defaultValue={75} currency="EUR" aria-label="EUR" />);
    expect(screen.getByText('€')).toBeInTheDocument();
    expect(screen.getByText('EUR')).toBeInTheDocument();

    // JPY (Yen japonés - precisión 0 enteros)
    render(<NumberInput defaultValue={1200} currency="JPY" aria-label="JPY" />);
    expect(screen.getByText('¥')).toBeInTheDocument();
    expect(screen.getByText('JPY')).toBeInTheDocument();
    const spin = screen.getByRole('spinbutton', { name: /jpy/i });
    expect(spin).toHaveValue('1200');

    // showCurrencyCode={false} oculta el sufijo ISO
    render(<NumberInput defaultValue={100} currency="USD" showCurrencyCode={false} aria-label="USD" />);
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.queryByText('USD')).not.toBeInTheDocument();
  });

  it('soporta disposición split (botones separados - / +)', () => {
    render(
      <NumberInput
        defaultValue={3}
        stepperPosition="split"
        aria-label="Cantidad Split"
      />
    );

    const decrementBtn = screen.getByRole('button', { name: /decrementar valor/i });
    const incrementBtn = screen.getByRole('button', { name: /incrementar valor/i });

    expect(decrementBtn).toBeInTheDocument();
    expect(incrementBtn).toBeInTheDocument();
  });

  it('deshabilita el control y botones cuando disabled es true', () => {
    render(
      <NumberInput
        defaultValue={10}
        disabled={true}
        aria-label="Deshabilitado"
      />
    );

    const spinbutton = screen.getByRole('spinbutton', { name: /deshabilitado/i });
    expect(spinbutton).toBeDisabled();

    const incrementBtn = screen.getByRole('button', { name: /incrementar valor/i });
    const decrementBtn = screen.getByRole('button', { name: /decrementar valor/i });

    expect(incrementBtn).toBeDisabled();
    expect(decrementBtn).toBeDisabled();
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <label>
        Cantidad de artículos
        <NumberInput defaultValue={5} min={0} max={100} />
      </label>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
