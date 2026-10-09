import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { RadioGroup, RadioGroupItem } from './RadioGroup';
import { Label } from '../label';

describe('RadioGroup Component', () => {
  it('renderiza opciones de radio y permite seleccionar una opción al hacer clic', async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    render(
      <RadioGroup defaultValue="opcion-1" onValueChange={handleValueChange}>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="opcion-1" id="r1" />
          <Label htmlFor="r1">Opción 1</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="opcion-2" id="r2" />
          <Label htmlFor="r2">Opción 2</Label>
        </div>
      </RadioGroup>
    );

    const r1 = screen.getByRole('radio', { name: 'Opción 1' });
    const r2 = screen.getByRole('radio', { name: 'Opción 2' });

    expect(r1).toBeChecked();
    expect(r2).not.toBeChecked();

    await user.click(r2);
    expect(handleValueChange).toHaveBeenCalledWith('opcion-2');
  });

  it('soporta navegación por teclado mediante flechas', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup defaultValue="a">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="a" id="ra" />
          <Label htmlFor="ra">A</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="b" id="rb" />
          <Label htmlFor="rb">B</Label>
        </div>
      </RadioGroup>
    );

    const ra = screen.getByRole('radio', { name: 'A' });
    ra.focus();
    expect(ra).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    const rb = screen.getByRole('radio', { name: 'B' });
    expect(rb).toHaveFocus();
  });

  it('respeta la propiedad disabled individual y grupal', async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    render(
      <RadioGroup onValueChange={handleValueChange}>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="activo" id="r-act" />
          <Label htmlFor="r-act">Activo</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="inactivo" id="r-inact" disabled />
          <Label htmlFor="r-inact">Inactivo</Label>
        </div>
      </RadioGroup>
    );

    const inactivo = screen.getByRole('radio', { name: 'Inactivo' });
    expect(inactivo).toBeDisabled();

    await user.click(inactivo);
    expect(handleValueChange).not.toHaveBeenCalled();
  });

  it('aplica estado aria-invalid cuando hasError es true', () => {
    render(
      <RadioGroup hasError defaultValue="err">
        <RadioGroupItem value="err" id="r-err" hasError />
        <Label htmlFor="r-err">Con Error</Label>
      </RadioGroup>
    );

    const group = screen.getByRole('radiogroup');
    const item = screen.getByRole('radio', { name: 'Con Error' });

    expect(group).toHaveAttribute('aria-invalid', 'true');
    expect(item).toHaveAttribute('aria-invalid', 'true');
    expect(item).toHaveClass('border-alcspower-destructive');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <RadioGroup defaultValue="1" aria-label="Selección de método de pago">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="1" id="m1" />
          <Label htmlFor="m1">Transferencia</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="2" id="m2" />
          <Label htmlFor="m2">Tarjeta</Label>
        </div>
      </RadioGroup>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
