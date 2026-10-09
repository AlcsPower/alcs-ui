import type { Meta, StoryObj } from '@storybook/react';
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
import { Button } from '../../forms/button';
import { Input } from '../../forms/input';
import { Field, FieldLabel } from '../../forms/field';

const meta: Meta<typeof Sheet> = {
  title: 'Overlay/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="primary">Abrir Panel Derecho</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Editar Perfil Institucional</SheetTitle>
          <SheetDescription>
            Modifique los datos de contacto y roles asignados en el sistema ministerial.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <Field required>
            <FieldLabel>Nombre Completo</FieldLabel>
            <Input defaultValue="Lic. Carlos Mendoza" />
          </Field>
          <Field required>
            <FieldLabel>Cargo / Dependencia</FieldLabel>
            <Input defaultValue="Dirección de Comercio Exterior" />
          </Field>
          <Field>
            <FieldLabel>Correo Electrónico</FieldLabel>
            <Input type="email" defaultValue="cmendoza@mific.gob.ni" />
          </Field>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancelar</Button>
          </SheetClose>
          <Button variant="primary">Guardar Cambios</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const LateralSides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['left', 'right', 'top', 'bottom'] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">Lado: {side}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Panel deslizante desde {side}</SheetTitle>
              <SheetDescription>
                Visualización de animación direccional adaptada al viewport.
              </SheetDescription>
            </SheetHeader>
            <div className="py-6">
              <p className="text-sm text-alcspower-text-secondary">
                Contenido dinámico desplegado desde la orientación {side}.
              </p>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="primary">Aceptar y Cerrar</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};
