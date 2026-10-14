import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Combobox } from './Combobox';

const mockOptions = [
  { value: 'hq-central', label: 'Sede Central', group: 'Centro' },
  { value: 'branch-west', label: 'Sucursal Oeste', group: 'Occidente' },
  { value: 'branch-north', label: 'Sucursal Norte', group: 'Norte' },
];

describe('Combobox Component', () => {
  it('muestra el placeholder cuando no hay selección en modo simple', () => {
    render(
      <Combobox
        options={mockOptions}
        placeholder="Seleccione sucursal..."
      />
    );

    expect(screen.getByText('Seleccione sucursal...')).toBeInTheDocument();
  });

  it('muestra la etiqueta de la opción seleccionada', () => {
    render(
      <Combobox
        options={mockOptions}
        value="branch-west"
      />
    );

    expect(screen.getByText('Sucursal Oeste')).toBeInTheDocument();
  });

  it('permite limpiar la selección en modo simple', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Combobox
        options={mockOptions}
        value="branch-west"
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
        value={['hq-central', 'branch-north']}
        onChange={handleChange}
      />
    );

    expect(screen.getByText('Sede Central')).toBeInTheDocument();
    expect(screen.getByText('Sucursal Norte')).toBeInTheDocument();

    const removeBtn = screen.getByRole('button', { name: /eliminar sede central/i });
    await user.click(removeBtn);

    expect(handleChange).toHaveBeenCalledWith(['branch-north']);
  });

  it('permite limpiar todas las opciones en modo múltiple', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Combobox
        multiple={true}
        options={mockOptions}
        value={['hq-central', 'branch-west']}
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
        defaultValue="branch-north"
      />
    );

    expect(screen.getByText('Sucursal Norte')).toBeInTheDocument();
  });

  it('funciona en modo no controlado con defaultValue en selección múltiple', () => {
    render(
      <Combobox
        multiple={true}
        options={mockOptions}
        defaultValue={['hq-central', 'branch-west']}
      />
    );

    expect(screen.getByText('Sede Central')).toBeInTheDocument();
    expect(screen.getByText('Sucursal Oeste')).toBeInTheDocument();
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <div>
        <label htmlFor="test-combo">Sede</label>
        <Combobox id="test-combo" options={mockOptions} value="hq-central" />
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
