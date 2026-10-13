import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Sparkline } from './Sparkline';

const sampleData = [12, 19, 15, 27, 34, 30, 45, 52];

describe('Sparkline Component', () => {
  it('renderiza correctamente el elemento SVG con rol img y aria-label', () => {
    render(<Sparkline data={sampleData} ariaLabel="Tendencia de exportaciones" />);

    const svg = screen.getByRole('img', { name: 'Tendencia de exportaciones' });
    expect(svg).toBeInTheDocument();
    expect(svg.tagName.toLowerCase()).toBe('svg');
  });

  it('renderiza trazado de área y gradiente cuando type="area"', () => {
    const { container } = render(<Sparkline data={sampleData} type="area" />);

    // Debe contener el linearGradient y el path de área
    expect(container.querySelector('linearGradient')).toBeInTheDocument();
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(2); // Trazo de área y trazo de línea
  });

  it('renderiza solo la línea continua cuando type="line"', () => {
    const { container } = render(<Sparkline data={sampleData} type="line" />);

    const paths = container.querySelectorAll('path');
    expect(paths.length).toBe(1); // Solo la línea
  });

  it('renderiza rectángulos SVG en modo barras cuando type="bar"', () => {
    const { container } = render(<Sparkline data={sampleData} type="bar" />);

    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBe(sampleData.length);
  });

  it('soporta datos vacíos con línea punteada de respaldo sin fallar', () => {
    render(<Sparkline data={[]} />);

    const emptySvg = screen.getByRole('img', { name: 'Micrográfico sin datos' });
    expect(emptySvg).toBeInTheDocument();
  });

  it('calcula variante "auto" como éxito en tendencia alcista y destructivo en bajista', () => {
    const upData = [10, 20, 30];
    const downData = [30, 20, 10];

    const { container: upContainer } = render(<Sparkline data={upData} variant="auto" type="line" />);
    const upPath = upContainer.querySelector('path');
    expect(upPath).toHaveAttribute('stroke', 'var(--alcspower-success)');

    const { container: downContainer } = render(<Sparkline data={downData} variant="auto" type="line" />);
    const downPath = downContainer.querySelector('path');
    expect(downPath).toHaveAttribute('stroke', 'var(--alcspower-destructive)');
  });

  it('muestra tooltip flotante e indicador en modo interactivo al mover el ratón', () => {
    const { container } = render(
      <Sparkline
        data={[
          { value: 100, label: 'Enero' },
          { value: 250, label: 'Febrero' },
        ]}
        interactive
      />
    );

    const svg = screen.getByRole('img');
    fireEvent.mouseMove(svg, { clientX: 60 });

    // El tooltip debe contener el valor formateado
    expect(container.textContent).toMatch(/100|250/);
  });

  it('no presenta violaciones de accesibilidad (axe-core)', async () => {
    const { container } = render(
      <Sparkline
        data={sampleData}
        ariaLabel="Evolución de trámites aprobados"
        interactive
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
