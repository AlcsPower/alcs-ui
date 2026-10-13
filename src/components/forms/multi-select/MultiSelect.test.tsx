import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { MultiSelect, type MultiSelectOption } from './MultiSelect';

const mockOptions: MultiSelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular', disabled: true },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js', group: 'Frameworks' },
  { value: 'astro', label: 'Astro', group: 'Frameworks' },
];

describe('MultiSelect Component', () => {
  it('renderiza con placeholder por defecto cuando no hay selección', () => {
    render(<MultiSelect options={mockOptions} placeholder="Seleccionar tecnologías..." />);

    expect(screen.getByText('Seleccionar tecnologías...')).toBeInTheDocument();
  });

  it('renderiza chips de opciones seleccionadas inicialmente', () => {
    render(
      <MultiSelect
        options={mockOptions}
        defaultValue={['react', 'svelte']}
      />
    );

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Svelte')).toBeInTheDocument();
  });

  it('abre el menú popover y muestra las opciones al hacer clic en el trigger', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={mockOptions} />);

    const trigger = screen.getByRole('button', { name: /selecciona opciones.../i });
    await user.click(trigger);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /react/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /vue/i })).toBeInTheDocument();
  });

  it('permite seleccionar y deseleccionar opciones mediante clic', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<MultiSelect options={mockOptions} onChange={handleChange} />);

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    const reactOption = screen.getByRole('option', { name: /react/i });
    await user.click(reactOption);

    expect(handleChange).toHaveBeenCalledWith(['react']);
  });

  it('no permite seleccionar opciones deshabilitadas', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<MultiSelect options={mockOptions} onChange={handleChange} />);

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    const angularOption = screen.getByRole('option', { name: /angular/i });
    expect(angularOption).toHaveAttribute('aria-disabled', 'true');

    await user.click(angularOption);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('soporta seleccionar y deseleccionar todos mediante el botón en cabecera', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<MultiSelect options={mockOptions} onChange={handleChange} showSelectAll />);

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    const selectAllBtn = screen.getByRole('button', { name: /seleccionar todos/i });
    await user.click(selectAllBtn);

    // Debe seleccionar todas las opciones NO deshabilitadas (react, vue, svelte, nextjs, astro = 5)
    expect(handleChange).toHaveBeenCalledWith(
      expect.arrayContaining(['react', 'vue', 'svelte', 'nextjs', 'astro'])
    );
  });

  it('filtra opciones en tiempo real al escribir en el buscador', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={mockOptions} />);

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    const searchInput = screen.getByPlaceholderText(/buscar opciones.../i);
    await user.type(searchInput, 'svel');

    expect(screen.getByRole('option', { name: /svelte/i })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /react/i })).not.toBeInTheDocument();
  });

  it('elimina un chip individual al hacer clic en su botón de eliminar', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <MultiSelect
        options={mockOptions}
        defaultValue={['react', 'vue']}
        onChange={handleChange}
      />
    );

    const removeReactBtn = screen.getByRole('button', { name: /eliminar react/i });
    await user.click(removeReactBtn);

    expect(handleChange).toHaveBeenCalledWith(['vue']);
  });

  it('limpia toda la selección con el botón limpiar del trigger', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <MultiSelect
        options={mockOptions}
        defaultValue={['react', 'vue']}
        onChange={handleChange}
        clearable
      />
    );

    const clearAllBtn = screen.getByRole('button', { name: /limpiar selección/i });
    await user.click(clearAllBtn);

    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('soporta displayMode summary mostrando conteo en lugar de chips', () => {
    render(
      <MultiSelect
        options={mockOptions}
        defaultValue={['react', 'vue', 'svelte']}
        displayMode="summary"
      />
    );

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText(/opciones seleccionadas/i)).toBeInTheDocument();
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });

  it('en modo hybrid colapsa el exceso de chips con +N más', () => {
    render(
      <MultiSelect
        options={mockOptions}
        defaultValue={['react', 'vue', 'svelte', 'astro']}
        displayMode="hybrid"
        maxCount={2}
      />
    );

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vue.js')).toBeInTheDocument();
    expect(screen.queryByText('Svelte')).not.toBeInTheDocument();
    expect(screen.getByText('+2 más')).toBeInTheDocument();
  });

  it('no presenta violaciones de accesibilidad (axe-core)', async () => {
    const { container } = render(
      <MultiSelect
        options={mockOptions}
        defaultValue={['react']}
        id="frameworks-select"
        aria-label="Seleccionar tecnologías"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
