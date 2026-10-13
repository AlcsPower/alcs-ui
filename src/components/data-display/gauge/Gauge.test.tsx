import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Gauge } from './Gauge';

describe('Gauge Component', () => {
  it('renderiza con rol meter y atributos WAI-ARIA correspondientes', () => {
    render(<Gauge value={75} min={0} max={100} label="Cumplimiento SLA" />);

    const meter = screen.getByRole('meter');
    expect(meter).toBeInTheDocument();
    expect(meter).toHaveAttribute('aria-valuenow', '75');
    expect(meter).toHaveAttribute('aria-valuemin', '0');
    expect(meter).toHaveAttribute('aria-valuemax', '100');
    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('Cumplimiento SLA')).toBeInTheDocument();
  });

  it('limita (clamps) valores que exceden los límites inferior o superior', () => {
    const { rerender } = render(<Gauge value={150} min={0} max={100} />);
    let meter = screen.getByRole('meter');
    expect(meter).toHaveAttribute('aria-valuenow', '100');

    rerender(<Gauge value={-25} min={0} max={100} />);
    meter = screen.getByRole('meter');
    expect(meter).toHaveAttribute('aria-valuenow', '0');
  });

  it('soporta las variantes semicircular, arco y círculo completo', () => {
    const { container: scContainer } = render(<Gauge value={50} variant="semicircle" />);
    expect(scContainer.querySelector('path')).toBeInTheDocument();

    const { container: arcContainer } = render(<Gauge value={50} variant="arc" />);
    expect(arcContainer.querySelector('path')).toBeInTheDocument();

    const { container: circleContainer } = render(<Gauge value={50} variant="circle" />);
    expect(circleContainer.querySelectorAll('circle').length).toBeGreaterThanOrEqual(1);
  });

  it('aplica umbrales semánticos automáticamente en modo color="auto"', () => {
    // Destructive (< 50)
    const { container: lowContainer } = render(
      <Gauge value={30} color="auto" thresholds={{ warning: 50, success: 80 }} />
    );
    const lowPath = lowContainer.querySelectorAll('path')[1];
    expect(lowPath).toHaveAttribute('stroke', 'var(--alcspower-destructive)');

    // Warning (50..79)
    const { container: midContainer } = render(
      <Gauge value={65} color="auto" thresholds={{ warning: 50, success: 80 }} />
    );
    const midPath = midContainer.querySelectorAll('path')[1];
    expect(midPath).toHaveAttribute('stroke', 'var(--alcspower-warning)');

    // Success (>= 80)
    const { container: highContainer } = render(
      <Gauge value={95} color="auto" thresholds={{ warning: 50, success: 80 }} />
    );
    const highPath = highContainer.querySelectorAll('path')[1];
    expect(highPath).toHaveAttribute('stroke', 'var(--alcspower-success)');
  });

  it('renderiza aguja mecánica cuando showNeedle={true}', () => {
    const { container } = render(<Gauge value={60} showNeedle variant="semicircle" />);
    expect(container.querySelector('polygon')).toBeInTheDocument();
  });

  it('renderiza etiquetas de extremos cuando showMinMax={true}', () => {
    render(<Gauge value={60} min={10} max={90} showMinMax />);
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();
  });

  it('no presenta violaciones de accesibilidad (axe-core)', async () => {
    const { container } = render(
      <Gauge
        value={85}
        label="Nivel de Servicio"
        sublabel="Meta: 80%"
        showMinMax
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
