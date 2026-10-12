import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Kbd, KbdGroup, KBD_SYMBOLS, KbdProvider } from './index';

describe('Kbd Component', () => {
  it('renderiza la etiqueta semántica <kbd>', () => {
    render(<Kbd>Ctrl</Kbd>);
    const kbd = screen.getByText('Ctrl');
    expect(kbd.tagName.toLowerCase()).toBe('kbd');
    expect(kbd).toBeInTheDocument();
  });

  it('soporta cambio de elemento con la prop as="span"', () => {
    render(<Kbd as="span">⌘</Kbd>);
    const kbd = screen.getByText('⌘');
    expect(kbd.tagName.toLowerCase()).toBe('span');
  });

  it('renderiza KbdGroup con separadores opcionales', () => {
    render(
      <KbdGroup separator="+">
        <Kbd>{KBD_SYMBOLS.cmd}</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    );

    expect(screen.getByRole('group', { name: /combinación de atajos de teclado/i })).toBeInTheDocument();
    expect(screen.getByText('⌘')).toBeInTheDocument();
    expect(screen.getByText('K')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
  });

  it('soporta multi-plataforma: macOS renderiza SVG de Command y Windows renderiza Ctrl', () => {
    const { rerender, container } = render(
      <Kbd platform="macos" keyName="modifier" />
    );
    // macOS modifier es Command (SVG)
    expect(container.querySelector('svg')).toBeInTheDocument();

    // Windows modifier es Ctrl
    rerender(<Kbd platform="windows" keyName="modifier" />);
    expect(screen.getByText('Ctrl')).toBeInTheDocument();

    // Linux modifier es Ctrl
    rerender(<Kbd platform="linux" keyName="modifier" />);
    expect(screen.getByText('Ctrl')).toBeInTheDocument();
  });

  it('soporta KbdProvider para propagar plataforma a un árbol de atajos', () => {
    render(
      <KbdProvider platform="windows">
        <KbdGroup separator="+">
          <Kbd keyName="modifier" />
          <Kbd>S</Kbd>
        </KbdGroup>
      </KbdProvider>
    );

    expect(screen.getByText('Ctrl')).toBeInTheDocument();
    expect(screen.getByText('S')).toBeInTheDocument();
  });

  it('soporta estado presionado (pressed) con clases físicas 3D correspondientes', () => {
    const { container } = render(<Kbd pressed>K</Kbd>);
    const kbd = container.querySelector('kbd');
    expect(kbd).toHaveClass('translate-y-[1px]');
  });

  it('soporta variantes visuales modernas (outline, filled, primary, minimal)', () => {
    const { container: c1 } = render(<Kbd variant="filled">K</Kbd>);
    expect(c1.querySelector('kbd')).toHaveClass('bg-slate-800');

    const { container: c2 } = render(<Kbd variant="primary">K</Kbd>);
    expect(c2.querySelector('kbd')).toHaveClass('from-alcspower-primary');

    const { container: c3 } = render(<Kbd variant="minimal">K</Kbd>);
    expect(c3.querySelector('kbd')).toHaveClass('bg-transparent');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <KbdGroup separator="+">
        <Kbd size="md" variant="outline">
          Ctrl
        </Kbd>
        <Kbd size="md" variant="outline">
          Shift
        </Kbd>
        <Kbd size="md" variant="outline">
          P
        </Kbd>
      </KbdGroup>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
