import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { DatePicker } from './DatePicker';

describe('DatePicker Component', () => {
  it('muestra el placeholder cuando no hay fecha seleccionada', () => {
    render(<DatePicker placeholder="Seleccione fecha de trámite..." />);
    expect(screen.getByText('Seleccione fecha de trámite...')).toBeInTheDocument();
  });

  it('formatea y muestra la fecha seleccionada', () => {
    const testDate = new Date(2026, 9, 5); // 05/10/2026
    render(<DatePicker value={testDate} dateFormat="dd/MM/yyyy" />);
    expect(screen.getByText('05/10/2026')).toBeInTheDocument();
  });

  it('permite limpiar la fecha con el botón de limpiar', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const testDate = new Date(2026, 9, 5);

    render(
      <DatePicker
        value={testDate}
        onChange={handleChange}
        clearable={true}
      />
    );

    const clearButton = screen.getByRole('button', { name: /limpiar fecha/i });
    await user.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith(undefined);
  });

  it('soporta los tamaños sm, md y lg', () => {
    const { container: smContainer } = render(<DatePicker size="sm" />);
    expect(smContainer.firstChild).toHaveClass('h-9');

    const { container: mdContainer } = render(<DatePicker size="md" />);
    expect(mdContainer.firstChild).toHaveClass('h-[42px]');

    const { container: lgContainer } = render(<DatePicker size="lg" />);
    expect(lgContainer.firstChild).toHaveClass('h-12');
  });

  it('aplica estilos para estados hasError y hasSuccess', () => {
    const { container: errContainer } = render(<DatePicker hasError />);
    expect(errContainer.firstChild).toHaveClass('border-alcspower-destructive');

    const { container: okContainer } = render(<DatePicker hasSuccess />);
    expect(okContainer.firstChild).toHaveClass('border-emerald-500');
  });

  it('deshabilita el botón de abrir calendario cuando disabled={true}', () => {
    render(<DatePicker disabled />);
    const openBtn = screen.getByRole('button', { name: /abrir calendario/i });
    expect(openBtn).toBeDisabled();
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const testDate = new Date(2026, 9, 5);
    const { container } = render(
      <div>
        <label htmlFor="test-dp">Fecha</label>
        <DatePicker id="test-dp" value={testDate} />
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
