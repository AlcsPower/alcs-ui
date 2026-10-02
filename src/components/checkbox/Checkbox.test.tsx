import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Checkbox } from './Checkbox';

describe('Checkbox Component', () => {
  it('permite alternar estado al hacer clic', async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Aceptar términos" />);

    const checkbox = screen.getByRole('checkbox', { name: /aceptar términos/i });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('soporta estado indeterminate controlado y no controlado (API-01)', () => {
    const { container: c1 } = render(<Checkbox checked="indeterminate" aria-label="Controlado" />);
    const cbControlled = screen.getByRole('checkbox', { name: /controlado/i });
    expect(cbControlled).toHaveAttribute('data-state', 'indeterminate');
    expect(cbControlled).toHaveAttribute('aria-checked', 'mixed');
    expect(c1.querySelector('svg')).toBeInTheDocument();

    const { container: c2 } = render(<Checkbox defaultChecked="indeterminate" aria-label="No controlado" />);
    const cbUncontrolled = screen.getByRole('checkbox', { name: /no controlado/i });
    expect(cbUncontrolled).toHaveAttribute('data-state', 'indeterminate');
    expect(cbUncontrolled).toHaveAttribute('aria-checked', 'mixed');
    expect(c2.querySelector('svg')).toBeInTheDocument();
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <label>
        <Checkbox /> Acepto términos y condiciones
      </label>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
