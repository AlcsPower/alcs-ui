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
