import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  ConfirmDialog,
} from './AlertDialog';
import { Button } from '../../forms/button';

describe('AlertDialog Component', () => {
  it('abre el diálogo modal y asigna el rol semántico alertdialog', async () => {
    const user = userEvent.setup();
    render(
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Eliminar Archivo</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el registro.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /eliminar archivo/i }));

    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText(/¿está absolutamente seguro\?/i)).toBeInTheDocument();
  });

  it('cierra el diálogo al hacer clic en Cancelar', async () => {
    const user = userEvent.setup();
    render(
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmación</AlertDialogTitle>
            <AlertDialogDescription>Detalle de la acción</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Aceptar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('ejecuta la acción al hacer clic en Confirmar', async () => {
    const user = userEvent.setup();
    const handleAction = vi.fn();

    render(
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar baja</AlertDialogTitle>
            <AlertDialogDescription>¿Desea continuar?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Descartar</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction}>Proceder</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    await user.click(screen.getByRole('button', { name: /proceder/i }));
    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alerta Accesible</AlertDialogTitle>
            <AlertDialogDescription>
              Descripción accesible para lectores de pantalla.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('ConfirmDialog Composite Component', () => {
  it('renderiza título, descripción y botones personalizados', () => {
    render(
      <ConfirmDialog
        open={true}
        title="Revocar Permisos"
        description="El usuario perderá acceso inmediato a los módulos arancelarios."
        confirmLabel="Sí, revocar"
        cancelLabel="Volver"
        variant="destructive"
      />
    );

    expect(screen.getByText('Revocar Permisos')).toBeInTheDocument();
    expect(screen.getByText(/el usuario perderá acceso inmediato/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sí, revocar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /volver/i })).toBeInTheDocument();
  });

  it('llama a onConfirm y maneja promesa asíncrona', async () => {
    const user = userEvent.setup();
    let resolvePromise: () => void;
    const asyncAction = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolvePromise = resolve;
        })
    );

    render(
      <ConfirmDialog
        open={true}
        title="Operación Crítica"
        description="Espere a que termine la sincronización."
        onConfirm={asyncAction}
      />
    );

    const confirmBtn = screen.getByRole('button', { name: /confirmar/i });
    // Resolver la promesa dentro de act
    await user.click(confirmBtn);
    expect(asyncAction).toHaveBeenCalledTimes(1);
    expect(confirmBtn).toBeDisabled();

    await React.act(async () => {
      resolvePromise!();
    });
  });
});
