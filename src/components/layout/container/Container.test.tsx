import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import { Container } from './Container';

describe('Container Component', () => {
  it('renderiza correctamente el contenido hijo', () => {
    render(<Container data-testid="container">Contenido institucional</Container>);
    expect(screen.getByTestId('container')).toBeInTheDocument();
    expect(screen.getByText('Contenido institucional')).toBeInTheDocument();
  });

  it('aplica clases por defecto (centrado y padding)', () => {
    render(<Container data-testid="container">Test</Container>);
    const el = screen.getByTestId('container');
    expect(el).toHaveClass('mx-auto');
    expect(el).toHaveClass('w-full');
  });

  it('soporta variantes de ancho máximo y padding', () => {
    render(
      <Container maxWidth="sm" padding="none" centered={false} data-testid="container-sm">
        Compacto
      </Container>
    );
    const el = screen.getByTestId('container-sm');
    expect(el).toHaveClass('max-w-(--breakpoint-sm)');
    expect(el).toHaveClass('px-0');
    expect(el).toHaveClass('mx-0');
  });

  it('soporta elemento polimórfico a través de la prop as', () => {
    render(
      <Container as="main" data-testid="container-main">
        Sección principal
      </Container>
    );
    const el = screen.getByTestId('container-main');
    expect(el.tagName).toBe('MAIN');
  });

  it('no presenta violaciones de accesibilidad (axe-core)', async () => {
    const { container } = render(
      <Container as="section" aria-label="Sección de prueba">
        <h2>Título de sección</h2>
        <p>Párrafo de contenido accesible.</p>
      </Container>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
