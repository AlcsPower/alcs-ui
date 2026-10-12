import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { PasswordInput, defaultPasswordStrengthCalculator } from './PasswordInput';

describe('PasswordInput Component', () => {
  it('renderiza como campo de tipo password por defecto', () => {
    render(<PasswordInput placeholder="Contraseña" />);
    const input = screen.getByPlaceholderText(/contraseña/i);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('alterna la visibilidad al hacer clic en el botón de toggle', () => {
    render(<PasswordInput placeholder="Contraseña" />);
    const input = screen.getByPlaceholderText(/contraseña/i);
    const toggleBtn = screen.getByRole('button', { name: /mostrar contraseña/i });

    expect(input).toHaveAttribute('type', 'password');

    fireEvent.click(toggleBtn);
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: /ocultar contraseña/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /ocultar contraseña/i }));
    expect(input).toHaveAttribute('type', 'password');
  });

  it('respeta la prop visible y onVisibilityChange controlada', () => {
    const handleVisibilityChange = vi.fn();
    const { rerender } = render(
      <PasswordInput
        placeholder="Contraseña"
        visible={false}
        onVisibilityChange={handleVisibilityChange}
      />
    );

    const input = screen.getByPlaceholderText(/contraseña/i);
    const toggleBtn = screen.getByRole('button', { name: /mostrar contraseña/i });

    fireEvent.click(toggleBtn);
    expect(handleVisibilityChange).toHaveBeenCalledWith(true);

    rerender(
      <PasswordInput
        placeholder="Contraseña"
        visible={true}
        onVisibilityChange={handleVisibilityChange}
      />
    );
    expect(input).toHaveAttribute('type', 'text');
  });

  it('deshabilita el botón con disabled={true}', () => {
    render(<PasswordInput placeholder="Contraseña" disabled />);
    const toggleBtn = screen.getByRole('button', { name: /mostrar contraseña/i });
    expect(toggleBtn).toBeDisabled();
  });

  it('calcula la fortaleza adecuadamente y muestra el meter cuando se activa', () => {
    render(
      <PasswordInput
        placeholder="Contraseña"
        showStrengthIndicator
        defaultValue="Admin123!"
      />
    );

    const meter = screen.getByRole('meter', { name: /fortaleza de la contraseña/i });
    expect(meter).toBeInTheDocument();
    expect(meter).toHaveAttribute('aria-valuenow', '4');
    expect(screen.getByText(/seguridad: muy robusta/i)).toBeInTheDocument();
  });

  it('no muestra el meter cuando el campo está vacío aunque showStrengthIndicator sea true', () => {
    render(<PasswordInput placeholder="Contraseña" showStrengthIndicator defaultValue="" />);
    expect(screen.queryByRole('meter')).not.toBeInTheDocument();
  });

  it('evaluador defaultPasswordStrengthCalculator funciona según las reglas', () => {
    expect(defaultPasswordStrengthCalculator('').score).toBe(0);
    expect(defaultPasswordStrengthCalculator('abc').score).toBe(1);
    expect(defaultPasswordStrengthCalculator('Abcdef12').score).toBe(3);
    expect(defaultPasswordStrengthCalculator('Abcdef12!').score).toBe(4);
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <label htmlFor="pwd-test">
        Clave de Acceso
        <PasswordInput id="pwd-test" placeholder="Contraseña" />
      </label>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
