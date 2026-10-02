import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Label } from '../label';
import { Search, Key } from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: 'Formularios/Input',
  component: Input,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Número de expediente (ej. EXP-2026-001)'
  }
};

export const ConEtiqueta: Story = {
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="expediente" required>
        Número de Expediente
      </Label>
      <Input id="expediente" placeholder="EXP-2026-001" />
    </div>
  )
};

export const ConError: Story = {
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="ruc" required>
        RUC del Contribuyente
      </Label>
      <Input id="ruc" hasError defaultValue="J03100000000" />
      <span className="text-xs text-mific-danger">El número RUC ingresado no es válido.</span>
    </div>
  )
};

export const ConIconoIzquierdo: Story = {
  render: () => (
    <div className="w-80">
      <Input leftElement={<Search className="h-4 w-4" />} placeholder="Buscar por nombre o trámite..." />
    </div>
  )
};

export const ConIconoDerecho: Story = {
  render: () => (
    <div className="w-80">
      <Input type="password" rightElement={<Key className="h-4 w-4" />} placeholder="Contraseña..." />
    </div>
  )
};

export const Deshabilitado: Story = {
  args: {
    disabled: true,
    defaultValue: 'Campo de solo lectura institucional'
  }
};
