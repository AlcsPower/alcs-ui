import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
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
});
