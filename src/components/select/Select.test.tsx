import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from './Select';

describe('Select Component', () => {
  it('renderiza el trigger con placeholder inicial', () => {
    render(
      <Select>
        <SelectTrigger aria-label="Departamento">
          <SelectValue placeholder="Seleccione un departamento" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="managua">Managua</SelectItem>
          <SelectItem value="leon">León</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByRole('combobox', { name: /departamento/i })).toBeInTheDocument();
    expect(screen.getByText(/seleccione un departamento/i)).toBeInTheDocument();
  });

  it('aplica estilos de error cuando hasError es true en SelectTrigger', () => {
    render(
      <Select>
        <SelectTrigger hasError aria-label="Departamento Requerido">
          <SelectValue placeholder="Seleccione..." />
        </SelectTrigger>
      </Select>
    );

    const trigger = screen.getByRole('combobox', { name: /departamento requerido/i });
    expect(trigger).toHaveClass('border-alcspower-destructive');
  });

  it('no presenta violaciones de accesibilidad en reposo (axe)', async () => {
    const { container } = render(
      <Select>
        <SelectTrigger aria-label="Opciones">
          <SelectValue placeholder="Seleccione una opción" />
        </SelectTrigger>
      </Select>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
