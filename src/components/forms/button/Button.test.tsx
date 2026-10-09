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

  it('soporta asChild en combinación con isLoading sin lanzar excepción y previniendo clics (BUG-01, H-02)', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button asChild isLoading loadingText="Cargando enlace..." onClick={handleClick}>
        <a href="/portal">Ir al Portal</a>
      </Button>
    );

    const link = screen.getByRole('link', { name: /cargando enlace\.\.\./i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('aria-busy', 'true');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveClass('pointer-events-none');
    expect(link.querySelector('svg')).toBeInTheDocument();

    await user.click(link);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('soporta variant="destructive" con paridad respecto a "danger"', () => {
    const { container: c1 } = render(<Button variant="destructive">Eliminar</Button>);
    const { container: c2 } = render(<Button variant="danger">Eliminar</Button>);

    const btnDestructive = c1.querySelector('button');
    const btnDanger = c2.querySelector('button');
    expect(btnDestructive?.className).toBe(btnDanger?.className);
    expect(btnDestructive?.className).toContain('bg-alcspower-destructive');
  });

  it('soporta tamaños de icono dedicados (icon, icon-sm, icon-lg)', () => {
    const { container: c1 } = render(<Button size="icon" aria-label="Icono normal">X</Button>);
    const { container: c2 } = render(<Button size="icon-sm" aria-label="Icono pequeño">X</Button>);
    const { container: c3 } = render(<Button size="icon-lg" aria-label="Icono grande">X</Button>);

    expect(c1.querySelector('button')?.className).toContain('h-10 w-10');
    expect(c2.querySelector('button')?.className).toContain('h-8 w-8');
    expect(c3.querySelector('button')?.className).toContain('h-12 w-12');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(<Button variant="primary">Botón Accesible</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
