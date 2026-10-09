import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Switch } from './Switch';

describe('Switch Component', () => {
  it('alterna estado activado/desactivado', async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Notificaciones por correo" />);

    const sw = screen.getByRole('switch', { name: /notificaciones por correo/i });
    expect(sw).not.toBeChecked();

    await user.click(sw);
    expect(sw).toBeChecked();

    await user.click(sw);
    expect(sw).not.toBeChecked();
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <label>
        <Switch /> Activar modo oscuro
      </label>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
