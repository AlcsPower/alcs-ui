import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { TagsInput } from './TagsInput';

describe('TagsInput Component', () => {
  it('renderiza con placeholder por defecto cuando no hay etiquetas', () => {
    render(<TagsInput placeholder="Escribe etiquetas..." />);
    expect(screen.getByPlaceholderText(/escribe etiquetas\.\.\./i)).toBeInTheDocument();
  });

  it('renderiza etiquetas iniciales vía defaultValue', () => {
    render(<TagsInput defaultValue={['React', 'TypeScript', 'Tailwind']} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Tailwind')).toBeInTheDocument();
  });

  it('agrega una etiqueta al presionar Enter', () => {
    const handleChange = vi.fn();
    render(<TagsInput onChange={handleChange} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Frontend' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledWith(['Frontend']);
    expect(input).toHaveValue('');
  });

  it('agrega una etiqueta al presionar coma (,)', () => {
    const handleChange = vi.fn();
    render(<TagsInput onChange={handleChange} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Backend' } });
    fireEvent.keyDown(input, { key: ',' });

    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledWith(['Backend']);
  });

  it('elimina una etiqueta al hacer clic en su botón de eliminar', () => {
    const handleChange = vi.fn();
    render(
      <TagsInput defaultValue={['Angular', 'Vue']} onChange={handleChange} />
    );

    const deleteVueBtn = screen.getByRole('button', { name: /eliminar vue/i });
    fireEvent.click(deleteVueBtn);

    expect(screen.queryByText('Vue')).not.toBeInTheDocument();
    expect(screen.getByText('Angular')).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledWith(['Angular']);
  });

  it('elimina la última etiqueta con Backspace cuando el input está vacío', () => {
    const handleChange = vi.fn();
    render(
      <TagsInput defaultValue={['Node', 'Express']} onChange={handleChange} />
    );
    const input = screen.getByRole('textbox');

    fireEvent.keyDown(input, { key: 'Backspace' });

    expect(screen.queryByText('Express')).not.toBeInTheDocument();
    expect(screen.getByText('Node')).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledWith(['Node']);
  });

  it('bloquea etiquetas duplicadas por defecto', () => {
    const handleChange = vi.fn();
    render(
      <TagsInput defaultValue={['React']} onChange={handleChange} />
    );
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getAllByText(/react/i)).toHaveLength(1);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('respeta el límite de maxTags', () => {
    const handleChange = vi.fn();
    render(
      <TagsInput defaultValue={['Tag1', 'Tag2']} maxTags={2} onChange={handleChange} />
    );

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByText('2/2')).toBeInTheDocument();
  });

  it('limpia todas las etiquetas con el botón de limpiar', () => {
    const handleChange = vi.fn();
    render(
      <TagsInput
        defaultValue={['Uno', 'Dos', 'Tres']}
        clearable
        onChange={handleChange}
      />
    );

    const clearBtn = screen.getByRole('button', { name: /limpiar todas las etiquetas/i });
    fireEvent.click(clearBtn);

    expect(screen.queryByText('Uno')).not.toBeInTheDocument();
    expect(screen.queryByText('Dos')).not.toBeInTheDocument();
    expect(screen.queryByText('Tres')).not.toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('procesa texto pegado delimitado por comas', () => {
    const handleChange = vi.fn();
    render(<TagsInput onChange={handleChange} />);
    const input = screen.getByRole('textbox');

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => 'CSS, HTML, JavaScript',
      },
    });

    expect(screen.getByText('CSS')).toBeInTheDocument();
    expect(screen.getByText('HTML')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledWith(['CSS', 'HTML', 'JavaScript']);
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <div>
        <label htmlFor="user-skills">Habilidades técnicas</label>
        <TagsInput
          id="user-skills"
          defaultValue={['Diseño UI', 'Accesibilidad']}
        />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
