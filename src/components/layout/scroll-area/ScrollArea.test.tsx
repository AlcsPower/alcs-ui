import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { ScrollArea, ScrollBar, scrollbarVariants } from './ScrollArea';

describe('ScrollArea', () => {
  it('renderiza el contenido correctamente', () => {
    render(
      <ScrollArea className="h-48 w-48">
        <p>Contenido desplazable de prueba</p>
      </ScrollArea>
    );

    expect(screen.getByText('Contenido desplazable de prueba')).toBeInTheDocument();
  });

  it('no presenta violaciones de accesibilidad con axe-core', async () => {
    const { container } = render(
      <ScrollArea className="h-64 w-64" aria-label="Lista de transacciones">
        <div className="p-4 space-y-4">
          <h4>Transacciones Recientes</h4>
          <p>Fila 1</p>
          <p>Fila 2</p>
          <p>Fila 3</p>
        </div>
      </ScrollArea>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('aplica clases personalizadas y viewportClassName', () => {
    const { container } = render(
      <ScrollArea
        className="custom-scroll-root"
        viewportClassName="custom-viewport-box"
      >
        <span>Elemento de prueba</span>
      </ScrollArea>
    );

    const root = container.querySelector('.custom-scroll-root');
    expect(root).toBeInTheDocument();

    const viewport = container.querySelector('.custom-viewport-box');
    expect(viewport).toBeInTheDocument();
  });

  it('permite asociar ref al Viewport interno', () => {
    const viewportRef = React.createRef<HTMLDivElement>();
    render(
      <ScrollArea viewportRef={viewportRef}>
        <span>Texto</span>
      </ScrollArea>
    );

    expect(viewportRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it('soporta orientación horizontal y both', () => {
    const { rerender, container } = render(
      <ScrollArea orientation="horizontal" className="w-64">
        <div className="w-[800px]">Contenido Ancho</div>
      </ScrollArea>
    );

    expect(container.firstChild).toBeInTheDocument();

    rerender(
      <ScrollArea orientation="both" className="w-64 h-64">
        <div className="w-[800px] h-[800px]">Contenido Bidireccional</div>
      </ScrollArea>
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('genera clases correctas según la escala de tamaño en scrollbarVariants', () => {
    const smVertical = scrollbarVariants({ orientation: 'vertical', size: 'sm' });
    expect(smVertical).toContain('w-1.5');

    const lgVertical = scrollbarVariants({ orientation: 'vertical', size: 'lg' });
    expect(lgVertical).toContain('w-3.5');

    const mdHorizontal = scrollbarVariants({ orientation: 'horizontal', size: 'md' });
    expect(mdHorizontal).toContain('h-2.5');
  });

  it('soporta renderizado compuesto explícito con ScrollBar', () => {
    render(
      <ScrollArea orientation="vertical">
        <div>Contenido modular</div>
        <ScrollBar orientation="vertical" size="sm" thumbClassName="custom-thumb" />
      </ScrollArea>
    );

    expect(screen.getByText('Contenido modular')).toBeInTheDocument();
  });
});
