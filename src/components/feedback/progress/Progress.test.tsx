import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Progress } from './Progress';

describe('Progress Component', () => {
  it('renders the progress bar and has role="progressbar"', () => {
    render(<Progress value={50} aria-label="Progreso" />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
  });

  it('sets aria-valuenow correctly', () => {
    render(<Progress value={75} aria-label="Progreso de subida" />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '75');
  });

  it('sets aria-valuemin=0 and aria-valuemax=100', () => {
    render(<Progress value={40} aria-label="Progreso" />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
  });

  it('clamps value between 0-100 when below 0', () => {
    render(<Progress value={-20} aria-label="Progreso negativo" />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '0');
  });

  it('clamps value between 0-100 when above 100', () => {
    render(<Progress value={150} aria-label="Progreso excedido" />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '100');
  });

  it('shows label when showLabel is true', () => {
    render(<Progress value={65} showLabel aria-label="Progreso con etiqueta" />);
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('does NOT show label by default', () => {
    render(<Progress value={65} aria-label="Progreso sin etiqueta" />);
    expect(screen.queryByText('65%')).not.toBeInTheDocument();
  });

  it('custom formatLabel works', () => {
    render(
      <Progress
        value={60}
        showLabel
        formatLabel={(val) => `${val / 10}/10`}
        aria-label="Progreso pasos"
      />
    );
    expect(screen.getByText('6/10')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { container: defaultContainer } = render(
      <Progress value={50} variant="default" aria-label="Default" />
    );
    const defaultIndicator = defaultContainer.querySelector('[role="progressbar"] > div');
    expect(defaultIndicator).toHaveClass('bg-alcspower-primary');

    const { container: successContainer } = render(
      <Progress value={50} variant="success" aria-label="Success" />
    );
    const successIndicator = successContainer.querySelector('[role="progressbar"] > div');
    expect(successIndicator).toHaveClass('bg-alcspower-success');

    const { container: warningContainer } = render(
      <Progress value={50} variant="warning" aria-label="Warning" />
    );
    const warningIndicator = warningContainer.querySelector('[role="progressbar"] > div');
    expect(warningIndicator).toHaveClass('bg-alcspower-warning');

    const { container: destructiveContainer } = render(
      <Progress value={50} variant="destructive" aria-label="Destructive" />
    );
    const destructiveIndicator = destructiveContainer.querySelector('[role="progressbar"] > div');
    expect(destructiveIndicator).toHaveClass('bg-alcspower-destructive');

    const { container: infoContainer } = render(
      <Progress value={50} variant="info" aria-label="Info" />
    );
    const infoIndicator = infoContainer.querySelector('[role="progressbar"] > div');
    expect(infoIndicator).toHaveClass('bg-alcspower-info');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(
      <Progress value={50} size="sm" aria-label="Pequeño" />
    );
    let progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveClass('h-1.5');

    rerender(<Progress value={50} size="md" aria-label="Mediano" />);
    progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveClass('h-2.5');

    rerender(<Progress value={50} size="lg" aria-label="Grande" />);
    progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveClass('h-4');
  });

  it('handles indeterminate state: when value is undefined, aria-valuenow is NOT present', () => {
    render(<Progress aria-label="Cargando indefinido" />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).not.toHaveAttribute('aria-valuenow');
    expect(progressbar).toHaveAttribute('data-state', 'indeterminate');

    render(
      <Progress showLabel aria-label="Indeterminado con label" />
    );
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it('applies className override to root progress element', () => {
    render(
      <Progress
        value={50}
        className="custom-test-class"
        aria-label="Clase personalizada"
      />
    );
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveClass('custom-test-class');
  });

  it('forwards ref correctly to the root progress element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Progress ref={ref} value={50} aria-label="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute('role', 'progressbar');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <Progress value={60} showLabel aria-label="Progreso general de la solicitud" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('asigna aria-label="Progreso" por defecto si no se pasa aria-label ni aria-labelledby', () => {
    render(<Progress value={40} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-label', 'Progreso');
  });

  it('conecta aria-labelledby con la etiqueta visible cuando showLabel es true', () => {
    render(<Progress value={80} showLabel />);
    const progressbar = screen.getByRole('progressbar');
    const labelSpan = screen.getByText('80%');
    expect(labelSpan).toHaveAttribute('id');
    expect(progressbar).toHaveAttribute('aria-labelledby', labelSpan.getAttribute('id'));
  });

  it('no presenta violaciones de accesibilidad (axe) cuando se consume sin aria-label manual', async () => {
    const { container } = render(<Progress value={30} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('aplica la clase progress-shiny por defecto cuando hay un valor numérico', () => {
    const { container } = render(<Progress value={50} />);
    const indicator = container.querySelector('[role="progressbar"] > div');
    expect(indicator).toHaveClass('progress-shiny');
  });

  it('no aplica progress-shiny si shiny={false}', () => {
    const { container } = render(<Progress value={50} shiny={false} />);
    const indicator = container.querySelector('[role="progressbar"] > div');
    expect(indicator).not.toHaveClass('progress-shiny');
  });

  it('en estado indeterminado no aplica progress-shiny y aplica animate-progress-indeterminate', () => {
    const { container } = render(<Progress shiny={true} />);
    const indicator = container.querySelector('[role="progressbar"] > div');
    expect(indicator).toHaveClass('animate-progress-indeterminate');
    expect(indicator).not.toHaveClass('progress-shiny');
  });
});
