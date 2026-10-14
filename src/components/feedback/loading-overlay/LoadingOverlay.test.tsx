import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { LoadingOverlay } from './LoadingOverlay';

describe('LoadingOverlay Component', () => {
  it('renderiza cuando visible={true} por defecto', () => {
    const { container } = render(<LoadingOverlay />);
    expect(container.firstElementChild).toBeInTheDocument();
    expect(screen.getByText('Cargando...', { selector: 'p' })).toBeInTheDocument();
  });

  it('retorna null cuando visible={false}', () => {
    const { container } = render(<LoadingOverlay visible={false} />);
    expect(container.firstElementChild).toBeNull();
    expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
  });

  it('muestra el texto de label correctamente', () => {
    render(<LoadingOverlay label="Guardando cambios..." />);
    expect(screen.getByText('Guardando cambios...', { selector: 'p' })).toBeInTheDocument();
  });

  it('pasa la propiedad spinnerSize al Spinner correctamente', () => {
    const { container: containerSm } = render(<LoadingOverlay spinnerSize="sm" />);
    const svgSm = containerSm.querySelector('svg');
    expect(svgSm).toHaveClass('h-4');
    expect(svgSm).toHaveClass('w-4');

    const { container: containerLg } = render(<LoadingOverlay spinnerSize="lg" />);
    const svgLg = containerLg.querySelector('svg');
    expect(svgLg).toHaveClass('h-6');
    expect(svgLg).toHaveClass('w-6');
  });

  it('tiene role="status" y aria-busy="true"', () => {
    const { container } = render(<LoadingOverlay label="Sincronizando..." />);
    const overlay = container.firstElementChild;
    expect(overlay).toHaveAttribute('role', 'status');
    expect(overlay).toHaveAttribute('aria-busy', 'true');
    expect(overlay).toHaveAttribute('aria-label', 'Sincronizando...');
  });

  it('permite el reenvío de ref (ref forwarding)', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<LoadingOverlay ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute('role', 'status');
  });

  it('combina clases CSS personalizadas mediante cn()', () => {
    const { container } = render(<LoadingOverlay className="custom-overlay-class" />);
    const overlay = container.firstElementChild;
    expect(overlay).toHaveClass('custom-overlay-class');
    expect(overlay).toHaveClass('absolute');
    expect(overlay).toHaveClass('z-20');
  });

  it('permite cambiar la variante del Spinner (spinnerVariant)', () => {
    const { container: ringContainer } = render(
      <LoadingOverlay spinnerVariant="ring" />
    );
    expect(ringContainer.querySelector('.spinner-ring')).toBeInTheDocument();

    const { container: dotsContainer } = render(
      <LoadingOverlay spinnerVariant="dots" />
    );
    expect(dotsContainer.querySelector('.spinner-dots')).toBeInTheDocument();
  });

  it('permite cambiar el color del Spinner (spinnerColor)', () => {
    const { container } = render(
      <LoadingOverlay spinnerColor="success" />
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('text-emerald-600');
  });

  it('renderiza un spinner personalizado cuando se pasa la prop spinner', () => {
    render(
      <LoadingOverlay
        spinner={<span data-testid="custom-spinner">Custom Spinner</span>}
      />
    );
    expect(screen.getByTestId('custom-spinner')).toBeInTheDocument();
  });

  it('aplica las clases de desenfoque de fondo según blur', () => {
    const { container: blurNone } = render(<LoadingOverlay blur="none" />);
    expect(blurNone.firstElementChild).not.toHaveClass('backdrop-blur-[2px]');

    const { container: blurMd } = render(<LoadingOverlay blur="md" />);
    expect(blurMd.firstElementChild).toHaveClass('backdrop-blur-sm');
  });

  it('renderiza barra de progreso y descripción secundaria', () => {
    const { container } = render(
      <LoadingOverlay
        label="Sincronizando"
        description="3 de 12 registros"
        progress={25}
      />
    );
    expect(screen.getByText('Sincronizando')).toBeInTheDocument();
    expect(screen.getByText('3 de 12 registros')).toBeInTheDocument();
    const progressBar = container.querySelector('[role="progressbar"]');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '25');
  });

  it('no presenta violaciones de accesibilidad cuando se coloca en un contenedor con contenido (axe)', async () => {
    const { container } = render(
      <div className="relative p-6" role="region" aria-label="Panel de estado corporativo">
        <h3>Información general</h3>
        <p>Cuerpo del contenedor con contenido informativo.</p>
        <LoadingOverlay
          label="Actualizando contenido..."
          description="3 de 12 registros"
          progress={45}
          spinnerVariant="ring"
          spinnerColor="primary"
        />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});


