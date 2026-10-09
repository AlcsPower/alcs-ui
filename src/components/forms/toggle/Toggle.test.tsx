import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Toggle } from './Toggle';

describe('Toggle Component', () => {
  it('alterna el estado presionado (aria-pressed) al hacer clic', async () => {
    const user = userEvent.setup();
    const handlePressedChange = vi.fn();

    render(
      <Toggle onPressedChange={handlePressedChange} aria-label="Negrita">
        B
      </Toggle>
    );

    const toggle = screen.getByRole('button', { name: 'Negrita' });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');

    await user.click(toggle);
    expect(handlePressedChange).toHaveBeenCalledWith(true);
  });

  it('soporta variante outline y tamaños sm, md, lg', () => {
    const { container: smContainer, rerender } = render(
      <Toggle variant="outline" size="sm" aria-label="Pequeño">
        S
      </Toggle>
    );

    expect(smContainer.firstChild).toHaveClass('border', 'h-8');

    rerender(
      <Toggle size="lg" aria-label="Grande">
        L
      </Toggle>
    );

    expect(smContainer.firstChild).toHaveClass('h-12');
  });

  it('respeta la propiedad disabled impidiendo clics', async () => {
    const user = userEvent.setup();
    const handlePressedChange = vi.fn();

    render(
      <Toggle disabled onPressedChange={handlePressedChange} aria-label="Inactivo">
        Off
      </Toggle>
    );

    const toggle = screen.getByRole('button', { name: 'Inactivo' });
    expect(toggle).toBeDisabled();

    await user.click(toggle);
    expect(handlePressedChange).not.toHaveBeenCalled();
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <Toggle defaultPressed aria-label="Subrayado">
        U
      </Toggle>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
