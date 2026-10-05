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

  it('no presenta violaciones de accesibilidad cuando se coloca en un contenedor con contenido (axe)', async () => {
    const { container } = render(
      <div className="relative p-6" role="region" aria-label="Panel de estado institucional">
        <h3>Información general</h3>
        <p>Cuerpo del contenedor con contenido informativo.</p>
        <LoadingOverlay label="Actualizando contenido..." />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
