import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Textarea } from './Textarea';

describe('Textarea Component', () => {
  it('permite escribir texto en el área', async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Observaciones" />);
    const textarea = screen.getByPlaceholderText(/observaciones/i);

    await user.type(textarea, 'Documentación completa recibida.');
    expect(textarea).toHaveValue('Documentación completa recibida.');
  });

  it('marca aria-invalid y aplica borde destructivo cuando hasError es true', () => {
    render(<Textarea hasError placeholder="Justificación" />);
    const textarea = screen.getByPlaceholderText(/justificación/i);

    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveClass('border-alcspower-destructive');
  });

  it('aplica las clases de tamaño correspondientes (sm, md, lg)', () => {
    const { rerender } = render(<Textarea size="sm" placeholder="Texto sm" />);
    expect(screen.getByPlaceholderText(/texto sm/i)).toHaveClass('min-h-[64px]', 'text-xs');

    rerender(<Textarea size="md" placeholder="Texto md" />);
    expect(screen.getByPlaceholderText(/texto md/i)).toHaveClass('min-h-[80px]', 'text-sm');

    rerender(<Textarea size="lg" placeholder="Texto lg" />);
    expect(screen.getByPlaceholderText(/texto lg/i)).toHaveClass('min-h-[110px]', 'text-base');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <label htmlFor="motivo-field">
        Motivo
        <Textarea id="motivo-field" placeholder="Escriba el motivo aquí" />
      </label>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
