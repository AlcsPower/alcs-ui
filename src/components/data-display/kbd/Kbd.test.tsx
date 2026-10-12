import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Kbd, KbdGroup, KBD_SYMBOLS } from './index';

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
