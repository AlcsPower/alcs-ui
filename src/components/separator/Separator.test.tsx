import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Separator, SeparatorWithText } from './Separator';

describe('Separator Component', () => {
  it('renderiza con orientación horizontal por defecto', () => {
    const { container } = render(<Separator />);
    const sep = container.firstElementChild as HTMLElement;
    expect(sep).toHaveClass('h-[1px]');
    expect(sep).toHaveClass('w-full');
    expect(sep).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('renderiza con orientación vertical', () => {
    const { container } = render(<Separator orientation="vertical" />);
    const sep = container.firstElementChild as HTMLElement;
    expect(sep).toHaveClass('h-full');
    expect(sep).toHaveClass('w-[1px]');
    expect(sep).toHaveAttribute('data-orientation', 'vertical');
  });

  it('soporta variantes visuales (soft, thick, dashed, dotted, gradient)', () => {
    const { container: soft } = render(<Separator variant="soft" />);
    expect(soft.firstElementChild).toHaveClass('bg-slate-100');

    const { container: thick } = render(<Separator variant="thick" />);
    expect(thick.firstElementChild).toHaveClass('h-[2px]');

    const { container: dashed } = render(<Separator variant="dashed" />);
    expect(dashed.firstElementChild).toHaveClass('separator-dashed-horizontal');

    const { container: dotted } = render(<Separator variant="dotted" />);
    expect(dotted.firstElementChild).toHaveClass('separator-dotted-horizontal');

    const { container: gradient } = render(<Separator variant="gradient" />);
    expect(gradient.firstElementChild).toHaveClass('bg-gradient-to-r');
  });

  it('soporta colores semánticos de marca (primary, success, warning, error)', () => {
    const { container: primary } = render(<Separator color="primary" />);
    expect(primary.firstElementChild).toHaveClass('bg-alcspower-primary');

    const { container: success } = render(<Separator color="success" />);
    expect(success.firstElementChild).toHaveClass('bg-emerald-500');

    const { container: warning } = render(<Separator color="warning" />);
    expect(warning.firstElementChild).toHaveClass('bg-amber-500');

    const { container: error } = render(<Separator color="error" />);
    expect(error.firstElementChild).toHaveClass('bg-red-500');
  });

  it('soporta margen inset', () => {
    const { container: horizontalInset } = render(<Separator inset />);
    expect(horizontalInset.firstElementChild).toHaveClass('mx-6');

    const { container: verticalInset } = render(<Separator orientation="vertical" inset />);
    expect(verticalInset.firstElementChild).toHaveClass('my-3');
  });

  it('renderiza separador con texto / etiqueta central horizontal', () => {
    render(<Separator label="O" />);
    expect(screen.getByText('O')).toBeInTheDocument();
  });

  it('renderiza separador vertical con texto', () => {
    render(<Separator orientation="vertical" label="Sección 1" />);
    expect(screen.getByText('Sección 1')).toBeInTheDocument();
  });

  it('soporta el componente SeparatorWithText', () => {
    render(<SeparatorWithText>Nuevo Mensaje</SeparatorWithText>);
    expect(screen.getByText('Nuevo Mensaje')).toBeInTheDocument();
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <div>
        <p>Texto Superior</p>
        <Separator />
        <p>Texto Medio</p>
        <Separator label="Sección" />
        <div className="flex h-10 items-center">
          <span>Opción 1</span>
          <Separator orientation="vertical" />
          <span>Opción 2</span>
        </div>
        <p>Texto Inferior</p>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
