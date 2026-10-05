import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Calendar } from './Calendar';

describe('Calendar Component', () => {
  it('renderiza correctamente el mes y los días', () => {
    const testDate = new Date(2026, 4, 15); // Mayo 2026
    render(<Calendar defaultMonth={testDate} />);

    expect(screen.getByText(/mayo 2026/i)).toBeInTheDocument();
  });

  it('permite seleccionar una fecha en modo single', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    const testDate = new Date(2026, 4, 15);

    render(
      <Calendar
        mode="single"
        defaultMonth={testDate}
        selected={testDate}
        onSelect={handleSelect}
      />
    );

    // Buscar botón con el día 20
    const day20 = screen.getAllByRole('button', { name: /20/i })[0];
    await user.click(day20);

    expect(handleSelect).toHaveBeenCalled();
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const testDate = new Date(2026, 4, 15);
    const { container } = render(
      <Calendar
        mode="single"
        defaultMonth={testDate}
        selected={testDate}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
