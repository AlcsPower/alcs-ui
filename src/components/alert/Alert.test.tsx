import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Alert, AlertTitle, AlertDescription } from './Alert';

describe('Alert Component', () => {
  it('renderiza con rol alert y variantes', () => {
    render(
      <Alert variant="warning">
        <AlertTitle>Atención</AlertTitle>
        <AlertDescription>El sistema entrará en mantenimiento programado.</AlertDescription>
      </Alert>
    );

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(screen.getByText(/atención/i)).toBeInTheDocument();
    expect(screen.getByText(/el sistema entrará en mantenimiento programado\./i)).toBeInTheDocument();
  });

  it('soporta ref de tipo HTMLHeadingElement en AlertTitle y HTMLDivElement en AlertDescription (BUG-02, BUG-03)', () => {
    const titleRef = React.createRef<HTMLHeadingElement>();
    const descRef = React.createRef<HTMLDivElement>();

    render(
      <Alert>
        <AlertTitle ref={titleRef}>Título con Ref</AlertTitle>
        <AlertDescription ref={descRef}>Descripción con Ref</AlertDescription>
      </Alert>
    );

    expect(titleRef.current).toBeInstanceOf(HTMLHeadingElement);
    expect(titleRef.current?.tagName).toBe('H5');
    expect(descRef.current).toBeInstanceOf(HTMLDivElement);
    expect(descRef.current?.tagName).toBe('DIV');
  });

  it('gestiona variantes no contempladas con fallback seguro sin lanzar excepción (RESILIENCE)', () => {
    expect(() => {
      render(
        <Alert variant={'variante-invalida' as any}>
          <AlertTitle>Fallback Seguro</AlertTitle>
        </Alert>
      );
    }).not.toThrow();

    expect(screen.getByText(/fallback seguro/i)).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-alcspower-info-subtle');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <Alert variant="success">
        <AlertTitle>Operación Exitosa</AlertTitle>
        <AlertDescription>El trámite ha sido registrado con éxito.</AlertDescription>
      </Alert>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
