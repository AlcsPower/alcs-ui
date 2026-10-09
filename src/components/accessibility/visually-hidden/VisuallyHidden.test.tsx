import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { VisuallyHidden } from './VisuallyHidden';

describe('VisuallyHidden Component', () => {
  it('renderiza como un span con clase sr-only por defecto', () => {
    render(<VisuallyHidden>Texto oculto</VisuallyHidden>);
    const element = screen.getByText('Texto oculto');
    expect(element.tagName).toBe('SPAN');
    expect(element).toHaveClass('sr-only');
  });

  it('permite delegación asChild en otro elemento', () => {
    render(
      <VisuallyHidden asChild>
        <p>Párrafo oculto</p>
      </VisuallyHidden>
    );
    const element = screen.getByText('Párrafo oculto');
    expect(element.tagName).toBe('P');
    expect(element).toHaveClass('sr-only');
  });

  it('combina clases CSS personalizadas', () => {
    render(
      <VisuallyHidden className="custom-test">
        Contenido
      </VisuallyHidden>
    );
    const element = screen.getByText('Contenido');
    expect(element).toHaveClass('sr-only');
    expect(element).toHaveClass('custom-test');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <button type="button">
        <VisuallyHidden>Cerrar ventana</VisuallyHidden>
        <span aria-hidden="true">✕</span>
      </button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
