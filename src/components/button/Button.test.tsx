import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Button } from './Button';

describe('Button Component', () => {
  it('renderiza correctamente con texto', () => {
    render(<Button>Guardar Trámite</Button>);
    expect(screen.getByRole('button', { name: /guardar trámite/i })).toBeInTheDocument();
  });

  it('ejecuta onClick al hacer clic', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Enviar</Button>);

    await user.click(screen.getByRole('button', { name: /enviar/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('no ejecuta onClick cuando está disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button disabled onClick={handleClick}>Deshabilitado</Button>);

    const btn = screen.getByRole('button', { name: /deshabilitado/i });
    expect(btn).toBeDisabled();
    await user.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('muestra estado de carga con aria-busy y desactiva el botón', () => {
    render(<Button isLoading loadingText="Procesando...">Enviar</Button>);
    const btn = screen.getByRole('button', { name: /procesando\.\.\./i });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
  });

  it('soporta asChild para renderizar como enlace <a>', () => {
    render(
      <Button asChild>
        <a href="/portal">Ir al Portal</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: /ir al portal/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/portal');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(<Button variant="primary">Botón Accesible</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
