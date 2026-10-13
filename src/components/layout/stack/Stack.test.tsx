import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import { Stack } from './Stack';

describe('Stack Component', () => {
  it('renderiza elementos hijos correctamente', () => {
    render(
      <Stack data-testid="stack">
        <div>Elemento 1</div>
        <div>Elemento 2</div>
      </Stack>
    );
    expect(screen.getByTestId('stack')).toBeInTheDocument();
    expect(screen.getByText('Elemento 1')).toBeInTheDocument();
    expect(screen.getByText('Elemento 2')).toBeInTheDocument();
  });

  it('aplica flex-col por defecto', () => {
    render(<Stack data-testid="stack">Test</Stack>);
    expect(screen.getByTestId('stack')).toHaveClass('flex-col');
    expect(screen.getByTestId('stack')).toHaveClass('gap-4');
  });

  it('soporta dirección horizontal y espaciados', () => {
    render(
      <Stack direction="horizontal" spacing="lg" align="center" justify="between" data-testid="stack-h">
        <span>A</span>
        <span>B</span>
      </Stack>
    );
    const el = screen.getByTestId('stack-h');
    expect(el).toHaveClass('flex-row');
    expect(el).toHaveClass('gap-6');
    expect(el).toHaveClass('items-center');
    expect(el).toHaveClass('justify-between');
  });

  it('intercala divisores entre los hijos directos cuando se especifica la prop divider', () => {
    render(
      <Stack divider={<hr data-testid="divider" />}>
        <div>Uno</div>
        <div>Dos</div>
        <div>Tres</div>
      </Stack>
    );
    const dividers = screen.getAllByTestId('divider');
    expect(dividers).toHaveLength(2);
  });

  it('soporta elemento polimórfico a través de as', () => {
    render(
      <Stack as="ul" data-testid="stack-ul">
        <li>Item 1</li>
      </Stack>
    );
    expect(screen.getByTestId('stack-ul').tagName).toBe('UL');
  });

  it('no presenta violaciones de accesibilidad (axe-core)', async () => {
    const { container } = render(
      <Stack as="nav" aria-label="Navegación de prueba">
        <a href="#1">Enlace 1</a>
        <a href="#2">Enlace 2</a>
      </Stack>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
