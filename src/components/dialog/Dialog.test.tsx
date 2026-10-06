import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose
} from './Dialog';
import { Button } from '../button';

describe('Dialog Component', () => {
  it('abre y cierra el diálogo modal mediante trigger y botón de cerrar', async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Abrir Modal</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmación de Solicitud</DialogTitle>
            <DialogDescription>¿Desea enviar este formulario al AlcsPower?</DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );

    // Inicialmente no está abierto
    expect(screen.queryByText(/confirmación de solicitud/i)).not.toBeInTheDocument();

    // Clic en trigger
    await user.click(screen.getByRole('button', { name: /abrir modal/i }));
    expect(screen.getByText(/confirmación de solicitud/i)).toBeInTheDocument();
    expect(screen.getByText(/¿desea enviar este formulario al alcspower\?/i)).toBeInTheDocument();

    // Clic en cancelar
    await user.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(screen.queryByText(/confirmación de solicitud/i)).not.toBeInTheDocument();
  });

  it('admite ref en DialogHeader y DialogFooter con React.forwardRef (CONSISTENCY)', () => {
    const headerRef = React.createRef<HTMLDivElement>();
    const footerRef = React.createRef<HTMLDivElement>();

    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogHeader ref={headerRef}>
            <DialogTitle>Encabezado</DialogTitle>
          </DialogHeader>
          <DialogFooter ref={footerRef}>
            <Button>Aceptar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    expect(headerRef.current).toBeInstanceOf(HTMLDivElement);
    expect(footerRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it('no presenta violaciones de accesibilidad cuando está abierto', async () => {
    const { container } = render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Título Accesible</DialogTitle>
            <DialogDescription>Descripción accesible para lectores de pantalla</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('se cierra al presionar Escape en el teclado', async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Abrir</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Modal con Escape</DialogTitle>
          <DialogDescription>Contenido</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByRole('button', { name: /abrir/i }));
    expect(screen.getByText('Modal con Escape')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByText('Modal con Escape')).not.toBeInTheDocument();
  });
});
