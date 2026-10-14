import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { axe } from 'vitest-axe';
import { CopyButton } from './CopyButton';

describe('CopyButton Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza con accesibilidad y aria-label por defecto', () => {
    render(<CopyButton value="2026-REQ-001" />);
    const button = screen.getByRole('button', { name: /copiar/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-live', 'polite');
  });

  it('copia el texto en el portapapeles y activa el estado de éxito', async () => {
    const user = userEvent.setup();
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      configurable: true,
      writable: true,
    });

    const onCopyMock = vi.fn();
    render(<CopyButton value="001-120590-0004X" onCopy={onCopyMock} timeout={500} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(writeTextMock).toHaveBeenCalledWith('001-120590-0004X');
    expect(onCopyMock).toHaveBeenCalledWith('001-120590-0004X');

    // Cambia el aria-label a ¡Copiado!
    expect(button).toHaveAttribute('aria-label', '¡Copiado!');

    // Vuelve al estado inicial tras el timeout
    await waitFor(
      () => {
        expect(button).toHaveAttribute('aria-label', 'Copiar');
      },
      { timeout: 1000 }
    );
  });

  it('no ejecuta copia si disabled está activo', async () => {
    const user = userEvent.setup();
    const writeTextMock = vi.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      configurable: true,
      writable: true,
    });

    render(<CopyButton value="test" disabled />);
    const button = screen.getByRole('button');
    await user.click(button);

    expect(writeTextMock).not.toHaveBeenCalled();
  });

  it('captura errores del portapapeles con la prop onError', async () => {
    const user = userEvent.setup();
    const error = new Error('Clipboard denied');
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockRejectedValue(error) },
      configurable: true,
      writable: true,
    });

    const onErrorMock = vi.fn();
    render(<CopyButton value="test" onError={onErrorMock} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(onErrorMock).toHaveBeenCalledWith(error);
  });

  it('soporta variantes filled e inline correctamente', () => {
    const { rerender } = render(<CopyButton value="test-filled" variant="filled" />);
    let button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    rerender(<CopyButton value="test-inline" variant="inline" />);
    button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renderiza label y respeta labelPlacement', () => {
    const { rerender } = render(<CopyButton value="test-label" label="Copiar código" labelPlacement="right" />);
    expect(screen.getByText('Copiar código')).toBeInTheDocument();

    rerender(<CopyButton value="test-label" label="Copiar clave" labelPlacement="left" />);
    expect(screen.getByText('Copiar clave')).toBeInTheDocument();
  });

  it('soporta diferentes tamaños sm, md, lg', () => {
    const { rerender } = render(<CopyButton value="test-size" size="sm" />);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<CopyButton value="test-size" size="md" />);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<CopyButton value="test-size" size="lg" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('no presenta violaciones de accesibilidad (axe-core)', async () => {
    const { container } = render(
      <div>
        <label htmlFor="copy-doc">Número de Registro</label>
        <CopyButton id="copy-doc" value="DOC-998877" variant="filled" label="Copiar Código" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
