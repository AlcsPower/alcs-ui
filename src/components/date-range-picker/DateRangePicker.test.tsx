import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { DateRangePicker } from './DateRangePicker';

describe('DateRangePicker Component', () => {
  it('muestra el placeholder cuando no hay rango seleccionado', () => {
    render(<DateRangePicker placeholder="Seleccione período..." />);
    expect(screen.getByText('Seleccione período...')).toBeInTheDocument();
  });

  it('formatea y muestra el rango seleccionado', () => {
    const range = {
      from: new Date(2026, 9, 1),
      to: new Date(2026, 9, 15),
    };
    render(<DateRangePicker value={range} dateFormat="dd/MM/yyyy" />);
    expect(screen.getByText('01/10/2026 - 15/10/2026')).toBeInTheDocument();
  });

  it('permite limpiar el rango seleccionado', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const range = {
      from: new Date(2026, 9, 1),
      to: new Date(2026, 9, 15),
    };

    render(
      <DateRangePicker
        value={range}
        onChange={handleChange}
        clearable={true}
      />
    );

    const clearButton = screen.getByRole('button', { name: /limpiar rango de fechas/i });
    await user.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith(undefined);
  });

  it('soporta los tamaños sm, md y lg', () => {
    const { container: smContainer } = render(<DateRangePicker size="sm" />);
    expect(smContainer.firstChild).toHaveClass('h-9');

    const { container: mdContainer } = render(<DateRangePicker size="md" />);
    expect(mdContainer.firstChild).toHaveClass('h-[42px]');

    const { container: lgContainer } = render(<DateRangePicker size="lg" />);
    expect(lgContainer.firstChild).toHaveClass('h-12');
  });

  it('aplica estilos para estado hasError', () => {
    const { container } = render(<DateRangePicker hasError />);
    expect(container.firstChild).toHaveClass('border-alcspower-destructive');
  });

  it('deshabilita el botón de abrir selector cuando disabled={true}', () => {
    render(<DateRangePicker disabled />);
    const openBtn = screen.getByRole('button', { name: /abrir selector de rango/i });
    expect(openBtn).toBeDisabled();
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const range = {
      from: new Date(2026, 9, 1),
      to: new Date(2026, 9, 15),
    };
    const { container } = render(
      <div>
        <label htmlFor="test-drp">Período Fiscal</label>
        <DateRangePicker id="test-drp" value={range} />
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
