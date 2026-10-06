import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from './Sheet';

describe('Sheet Component', () => {
  it('renders trigger and opens sheet on click', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <SheetTrigger asChild>
          <button type="button">Abrir Panel</button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Título del Panel</SheetTitle>
            <SheetDescription>Descripción del panel lateral.</SheetDescription>
          </SheetHeader>
          <div>Contenido del panel</div>
          <SheetFooter>
            <SheetClose asChild>
              <button type="button">Cerrar</button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    const trigger = screen.getByRole('button', { name: 'Abrir Panel' });
    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Título del Panel')).toBeInTheDocument();
    expect(screen.getByText('Contenido del panel')).toBeInTheDocument();
  });

  it('renders correctly with left and bottom sides', async () => {
    const { rerender } = render(
      <Sheet defaultOpen>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Panel Izquierdo</SheetTitle>
            <SheetDescription>Detalles del menú lateral</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Panel Izquierdo')).toBeInTheDocument();

    rerender(
      <Sheet defaultOpen>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Panel Inferior</SheetTitle>
            <SheetDescription>Detalles inferiores</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    expect(screen.getByText('Panel Inferior')).toBeInTheDocument();
  });

  it('has no accessibility violations (axe) when open', async () => {
    const { container } = render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Panel Accesible</SheetTitle>
            <SheetDescription>Verificación de estándares WCAG</SheetDescription>
          </SheetHeader>
          <p>Texto interior del panel accesible</p>
        </SheetContent>
      </Sheet>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
