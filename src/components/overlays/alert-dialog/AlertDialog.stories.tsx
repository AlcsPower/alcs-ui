import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
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

const meta: Meta<typeof AlertDialog> = {
  title: 'Overlays/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Destructivo: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Eliminar Registro</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Desea eliminar definitivamente el registro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción es irreversible y removerá todos los documentos adjuntos de los servidores corporativos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Conservar</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Eliminar definitivamente</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const CompositeConfirmDialog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        trigger={<Button variant="destructive">Eliminar Cuenta</Button>}
        variant="destructive"
        title="Eliminar cuenta corporativa"
        description="Todos los privilegios de firma electrónica y accesos corporativos serán revocados de inmediato."
        confirmLabel="Confirmar eliminación"
        cancelLabel="Cancelar"
        onConfirm={async () => {
          await new Promise((r) => setTimeout(r, 1000));
        }}
      />
    );
  },
};
