import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { SearchInput } from './SearchInput';

describe('SearchInput Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renderiza con placeholder por defecto', () => {
    render(<SearchInput />);
    expect(screen.getByPlaceholderText(/buscar\.\.\./i)).toBeInTheDocument();
  });

  it('permite escribir texto y dispara onChange', () => {
    const handleChange = vi.fn();
    render(<SearchInput placeholder="Buscar usuarios" onChange={handleChange} />);
    const input = screen.getByPlaceholderText(/buscar usuarios/i);

    fireEvent.change(input, { target: { value: 'Maria' } });
    expect(input).toHaveValue('Maria');
    expect(handleChange).toHaveBeenCalled();
  });

  it('dispara onSearch con debounce', () => {
    const handleSearch = vi.fn();
    render(<SearchInput debounceMs={300} onSearch={handleSearch} />);
    const input = screen.getByPlaceholderText(/buscar\.\.\./i);

    fireEvent.change(input, { target: { value: 'Alcides' } });
    expect(handleSearch).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(handleSearch).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(handleSearch).toHaveBeenCalledWith('Alcides');
  });

  it('muestra y opera el botón de limpiar cuando hay texto', () => {
    const handleClear = vi.fn();
    const handleSearch = vi.fn();
    render(
      <SearchInput
        defaultValue="Texto inicial"
        clearable
        onClear={handleClear}
        onSearch={handleSearch}
      />
    );

    const clearButton = screen.getByRole('button', { name: /limpiar búsqueda/i });
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalled();
    expect(handleSearch).toHaveBeenCalledWith('');
    expect(screen.getByPlaceholderText(/buscar\.\.\./i)).toHaveValue('');
  });

  it('muestra spinner de carga y oculta botón de limpiar cuando isLoading es true', () => {
    render(<SearchInput defaultValue="Buscando..." isLoading />);
    expect(screen.queryByRole('button', { name: /limpiar búsqueda/i })).not.toBeInTheDocument();
  });

  it('muestra el atajo de teclado en Kbd cuando no hay valor ingresado', () => {
    render(<SearchInput shortcut="⌘K" />);
    expect(screen.getByText('⌘K')).toBeInTheDocument();
  });

  it('enfoca el input cuando se presiona la tecla de atajo con enableShortcutListener', () => {
    render(<SearchInput shortcut="/" enableShortcutListener />);
    const input = screen.getByPlaceholderText(/buscar\.\.\./i);

    fireEvent.keyDown(window, { key: '/' });
    expect(document.activeElement).toBe(input);
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    vi.useRealTimers();
    const { container } = render(
      <label htmlFor="search-id">
        Buscador general
        <SearchInput id="search-id" placeholder="Buscar..." />
      </label>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
