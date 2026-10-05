import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Combobox } from './Combobox';

const mockOptions = [
  { value: 'mific-central', label: 'MIFIC Central' },
  { value: 'delegacion-leon', label: 'Delegación León' },
  { value: 'delegacion-esteli', label: 'Delegación Estelí' },
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
