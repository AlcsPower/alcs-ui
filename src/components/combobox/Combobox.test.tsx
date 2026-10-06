import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Combobox } from './Combobox';

const mockOptions = [
  { value: 'mific-central', label: 'MIFIC Central', group: 'Managua' },
  { value: 'delegacion-leon', label: 'Delegación León', group: 'Occidente' },
  { value: 'delegacion-esteli', label: 'Delegación Estelí', group: 'Norte' },
];

describe('Combobox Component', () => {
  it('muestra el placeholder cuando no hay selección en modo simple', () => {
    render(
      <Combobox
        options={mockOptions}
        placeholder="Seleccione delegación..."
      />
    );

    expect(screen.getByText('Seleccione delegación...')).toBeInTheDocument();
  });

  it('muestra la etiqueta de la opción seleccionada', () => {
    render(
      <Combobox
        options={mockOptions}
        value="delegacion-leon"
      />
    );

    expect(screen.getByText('Delegación León')).toBeInTheDocument();
  });

  it('permite limpiar la selección en modo simple', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Combobox
        options={mockOptions}
        value="delegacion-leon"
        onChange={handleChange}
        clearable={true}
      />
    );

    const clearButton = screen.getByRole('button', { name: /limpiar selección/i });
    await user.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith(undefined);
  });

  it('muestra chips en modo múltiple y permite remover uno', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Combobox
        multiple={true}
        options={mockOptions}
        value={['mific-central', 'delegacion-esteli']}
        onChange={handleChange}
      />
    );

    expect(screen.getByText('MIFIC Central')).toBeInTheDocument();
    expect(screen.getByText('Delegación Estelí')).toBeInTheDocument();

    const removeBtn = screen.getByRole('button', { name: /eliminar mific central/i });
    await user.click(removeBtn);

    expect(handleChange).toHaveBeenCalledWith(['delegacion-esteli']);
  });

  it('permite limpiar todas las opciones en modo múltiple', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Combobox
        multiple={true}
        options={mockOptions}
        value={['mific-central', 'delegacion-leon']}
        onChange={handleChange}
        clearable={true}
      />
    );

    const clearAllButton = screen.getByRole('button', { name: /limpiar todas las opciones/i });
    await user.click(clearAllButton);

    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('soporta estado de error y variantes de tamaño', () => {
    const { container, rerender } = render(
      <Combobox
        options={mockOptions}
        hasError={true}
        size="sm"
        placeholder="Selección..."
      />
    );

    expect(container.firstChild).toHaveClass('border-alcspower-destructive');

    rerender(
      <Combobox
        options={mockOptions}
        size="lg"
        placeholder="Selección..."
      />
    );

    expect(container.firstChild).toHaveClass('h-12');
  });

  it('funciona en modo no controlado con defaultValue en selección simple', () => {
    render(
      <Combobox
        options={mockOptions}
        defaultValue="delegacion-esteli"
      />
    );

    expect(screen.getByText('Delegación Estelí')).toBeInTheDocument();
  });

  it('funciona en modo no controlado con defaultValue en selección múltiple', () => {
    render(
      <Combobox
        multiple={true}
        options={mockOptions}
        defaultValue={['mific-central', 'delegacion-leon']}
      />
    );

    expect(screen.getByText('MIFIC Central')).toBeInTheDocument();
    expect(screen.getByText('Delegación León')).toBeInTheDocument();
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <div>
        <label htmlFor="test-combo">Sede</label>
        <Combobox id="test-combo" options={mockOptions} value="mific-central" />
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
