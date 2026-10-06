import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from './Drawer';

describe('Drawer Component', () => {
  it('opens bottom drawer on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <DrawerTrigger asChild>
          <button type="button">Abrir Drawer</button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Acciones Rápidas</DrawerTitle>
            <DrawerDescription>Seleccione una opción para continuar</DrawerDescription>
          </DrawerHeader>
          <p>Opciones de menú</p>
          <DrawerFooter>
            <DrawerClose asChild>
              <button type="button">Cancelar</button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );

    const trigger = screen.getByRole('button', { name: 'Abrir Drawer' });
    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Acciones Rápidas')).toBeInTheDocument();
    expect(screen.getByText('Opciones de menú')).toBeInTheDocument();
  });

  it('has no accessibility violations (axe) when open', async () => {
    const { container } = render(
      <Drawer defaultOpen>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Panel Inferior Accesible</DrawerTitle>
            <DrawerDescription>Cumplimiento de estándares a11y</DrawerDescription>
          </DrawerHeader>
          <div>Contenido del drawer accesible</div>
        </DrawerContent>
      </Drawer>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
