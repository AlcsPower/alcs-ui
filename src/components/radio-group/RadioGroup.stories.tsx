import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from './RadioGroup';
import { Label } from '../label';

const meta: Meta<typeof RadioGroup> = {
  title: 'Formularios/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="opcion-1" className="w-[300px]">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="opcion-1" id="rg-1" />
        <Label htmlFor="rg-1" className="cursor-pointer">Notificaciones por Correo</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="opcion-2" id="rg-2" />
        <Label htmlFor="rg-2" className="cursor-pointer">Notificaciones por SMS</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="opcion-3" id="rg-3" />
        <Label htmlFor="rg-3" className="cursor-pointer">Sin Notificaciones</Label>
      </div>
    </RadioGroup>
  ),
};

export const Deshabilitado: Story = {
  render: () => (
    <RadioGroup defaultValue="opcion-1" className="w-[300px]">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="opcion-1" id="rg-dis-1" />
        <Label htmlFor="rg-dis-1">Disponible</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="opcion-2" id="rg-dis-2" disabled />
        <Label htmlFor="rg-dis-2" className="opacity-50">No disponible (Deshabilitado)</Label>
      </div>
    </RadioGroup>
  ),
};

export const ConError: Story = {
  render: () => (
    <RadioGroup hasError defaultValue="" className="w-[300px]">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="e1" id="rg-err-1" hasError />
        <Label htmlFor="rg-err-1">Opción A</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="e2" id="rg-err-2" hasError />
        <Label htmlFor="rg-err-2">Opción B</Label>
      </div>
    </RadioGroup>
  ),
};
