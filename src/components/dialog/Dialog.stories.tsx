import type { Meta, StoryObj } from '@storybook/react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from './Dialog';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';

const meta: Meta = {
  title: 'Overlays/Dialog',
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Crear Licencia de Exportación</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Licencia de Exportación</DialogTitle>
          <DialogDescription>
            Complete los campos obligatorios para registrar la solicitud en el AlcsPower.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-1.5">
            <Label htmlFor="empresa" required>Nombre de la Empresa</Label>
            <Input id="empresa" placeholder="Ej. Exportaciones de Nicaragua S.A." />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="destino" required>País de Destino</Label>
            <Input id="destino" placeholder="Ej. Costa Rica" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button variant="primary">Continuar Solicitud</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};
