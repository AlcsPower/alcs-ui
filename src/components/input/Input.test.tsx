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

  it('aplica containerClassName en el wrapper exterior (API-02)', () => {
    const { container } = render(
      <Input
        placeholder="Buscar..."
        className="text-center"
        containerClassName="max-w-xs shadow-md"
      />
    );

    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass('max-w-xs');
    expect(wrapper).toHaveClass('shadow-md');
    expect(wrapper).toHaveClass('relative');
    expect(wrapper).toHaveClass('flex');

    const input = screen.getByPlaceholderText(/buscar\.\.\./i);
    expect(input).toHaveClass('text-center');
  });

  it('aplica las clases de tamaño correspondientes (sm, md, lg)', () => {
    const { rerender } = render(<Input size="sm" placeholder="Small" />);
    expect(screen.getByPlaceholderText(/small/i)).toHaveClass('h-8', 'text-xs');

    rerender(<Input size="md" placeholder="Medium" />);
    expect(screen.getByPlaceholderText(/medium/i)).toHaveClass('h-10', 'text-sm');

    rerender(<Input size="lg" placeholder="Large" />);
    expect(screen.getByPlaceholderText(/large/i)).toHaveClass('h-12', 'text-base');
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
