import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Input } from './Input';

describe('Input Component', () => {
  it('renderiza con placeholder', () => {
    render(<Input placeholder="Ingrese su cédula" />);
    expect(screen.getByPlaceholderText(/ingrese su cédula/i)).toBeInTheDocument();
  });

  it('permite escribir texto', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Nombre" />);
    const input = screen.getByPlaceholderText(/nombre/i);

    await user.type(input, 'Carlos');
    expect(input).toHaveValue('Carlos');
  });

  it('marca aria-invalid cuando hasError es true', () => {
    render(<Input hasError placeholder="Email" />);
    const input = screen.getByPlaceholderText(/email/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <label htmlFor="test-input">
        Cédula
        <Input id="test-input" placeholder="001-000000-0000A" />
      </label>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
